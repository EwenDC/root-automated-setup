import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'
import { createStructuredSelector } from 'reselect'

import type {
  BotCode,
  CaptainCode,
  Faction,
  FactionEntry,
  FlowSlice,
  HirelingCode,
  HirelingEntry,
  LandmarkCode,
  VagabondCode,
  WithCode,
} from '../../types'

import { SETTING_USE_DRAFT } from '../../constants'
import { savePersistedSetting } from '../../functions/persistedSettings'
import { takeRandom } from '../../functions/random'
import { SetupStep } from '../../types'
import { resetState } from '../actions'
import { setErrorMessage } from './setup'

/**
 * An object representing the current flow state, including the current step, past and future steps,
 * and what steps should be skipped.
 */
export interface FlowState {
  botPool: BotCode[]
  factionPool: FactionEntry[]
  hirelingPool: HirelingEntry[]
  currentIndex: number | null
  landmarkPool: LandmarkCode[]
  lastFactionLocked: boolean
  currentPlayerIndex: number | null
  currentStep: SetupStep
  vagabondSetUp: boolean
  pastSteps: FlowSlice[]
  futureSteps: FlowSlice[]
  useDraft: boolean
  selectedBots: BotCode[]
  ruinPlacer: string | null
}

const getSlice = (flowState: FlowState): FlowSlice => ({
  // This prevents changes we make to the faction pool in the draft state being reflected in already generated slices
  botPool: [...flowState.botPool],
  factionPool: [...flowState.factionPool],
  hirelingPool: [...flowState.hirelingPool],
  index: flowState.currentIndex,
  landmarkPool: [...flowState.landmarkPool],
  lastFactionLocked: flowState.lastFactionLocked,
  playerIndex: flowState.currentPlayerIndex,
  step: flowState.currentStep,
  vagabondSetUp: flowState.vagabondSetUp,
  selectedBots: [...flowState.selectedBots],
  useDraft: flowState.useDraft,
  ruinPlacer: flowState.ruinPlacer,
})

const applySlice = (state: FlowState, slice: FlowSlice) => {
  state.factionPool = slice.factionPool
  state.hirelingPool = slice.hirelingPool
  state.currentIndex = slice.index
  state.landmarkPool = slice.landmarkPool
  state.lastFactionLocked = slice.lastFactionLocked
  state.currentPlayerIndex = slice.playerIndex
  state.currentStep = slice.step
  state.vagabondSetUp = slice.vagabondSetUp
  state.selectedBots = slice.selectedBots
  state.botPool = slice.botPool
}

const getInitialState = (): FlowState => ({
  botPool: [],
  factionPool: [],
  hirelingPool: [],
  currentIndex: null,
  landmarkPool: [],
  lastFactionLocked: false,
  currentPlayerIndex: null,
  currentStep: SetupStep.chooseExpansions,
  vagabondSetUp: false,
  pastSteps: [],
  futureSteps: [],
  selectedBots: [],
  useDraft: true,
  ruinPlacer: null,
})

const initialState = getInitialState()

export const flowSlice = createSlice({
  name: 'flow',
  initialState,

  reducers: {
    setCurrentStep(state, { payload: currentStep }: PayloadAction<SetupStep>) {
      state.currentStep = currentStep
    },

    pushStateToPast(state) {
      // Add our current state to the undo queue and clear the redo queue
      state.pastSteps.push(getSlice(state))
      state.futureSteps = []
    },

    undoStep(state) {
      // Get the previous step from the undo queue
      const previousStep = state.pastSteps.pop()
      if (previousStep != null) {
        // Make sure that you can't use undo/redo to select a faction during standard setup
        if (state.currentStep === SetupStep.selectFaction && !state.useDraft) {
          state.currentIndex = null
        }
        // Add our current state to the redo queue
        state.futureSteps.unshift(getSlice(state))
        // Override current state with state from previous step
        applySlice(state, previousStep)
      } else {
        console.warn(
          `Invalid undoStep action: pastSteps array returned empty value (${previousStep})`,
        )
      }
    },

    redoStep(state) {
      // Get the next step from the redo queue
      const nextStep = state.futureSteps.shift()
      if (nextStep != null) {
        // Make sure that you can't use undo/redo to select a faction during standard setup
        if (state.currentStep === SetupStep.selectFaction && !state.useDraft) {
          state.currentIndex = null
        }
        // Add our current state to the undo queue
        state.pastSteps.push(getSlice(state))
        // Override current state with state from next step
        applySlice(state, nextStep)
      } else {
        console.warn(
          `Invalid redoStep action: futureSteps array returned empty value (${nextStep})`,
        )
      }
    },

    setUseDraft(state, { payload: useDraft }: PayloadAction<boolean>) {
      state.useDraft = useDraft
      state.futureSteps = []
      savePersistedSetting(SETTING_USE_DRAFT, useDraft)
    },

    resetFactionPool(state) {
      state.factionPool = []
      state.lastFactionLocked = false
      state.vagabondSetUp = false
      state.currentIndex = null
    },

    setLandmarkPool(state, { payload: landmarks }: PayloadAction<LandmarkCode[]>) {
      state.landmarkPool = landmarks
    },

    removeCurrentLandmarkFromPool(state) {
      if (state.currentIndex != null) {
        state.landmarkPool.splice(state.currentIndex, 1)
        state.currentIndex = null
      } else {
        console.warn(`Invalid removeCurrentLandmarkFromPool action: currentIndex must not be null`)
      }
    },

    addToSelectedBots: (state, action: PayloadAction<BotCode>) => {
      state.selectedBots.push(action.payload)
    },

    removeFromBotPool(state, action: PayloadAction<{ code: BotCode; baseFactionCode?: string }>) {
      const { code, baseFactionCode } = action.payload

      const index = state.botPool.indexOf(code)
      if (index !== -1) {
        state.botPool.splice(index, 1)
      }

      if (!state.vagabondSetUp && baseFactionCode === 'vagabond') {
        state.vagabondSetUp = true
      }

      if (
        state.ruinPlacer === null &&
        (baseFactionCode === 'warlord' || baseFactionCode == 'vagabond')
      ) {
        state.ruinPlacer = code
      }
    },

    resetSelectedBots(state) {
      state.selectedBots = []
    },

    resetBotPool(state) {
      state.botPool = []
    },

    setBotPool: (state, action: PayloadAction<BotCode[]>) => {
      state.botPool = action.payload
    },

    addToHirelingPool: {
      prepare: (...payload: [code: HirelingCode, demoted: boolean]) => ({ payload }),
      reducer(state, { payload }: PayloadAction<[HirelingCode, boolean]>) {
        const [code, demoted] = payload
        state.hirelingPool.push({ code, demoted })
      },
    },

    resetHirelingPool(state) {
      state.hirelingPool = []
    },

    removeCurrentHirelingFromPool(state) {
      if (state.currentIndex != null) {
        state.hirelingPool.splice(state.currentIndex, 1)
        state.currentIndex = null
      } else {
        console.warn(`Invalid removeCurrentHirelingFromPool action: currentIndex must not be null`)
      }
    },

    addToFactionPool: {
      prepare(
        faction: WithCode<Faction>,
        includeBots: boolean,
        vagabondPool?: VagabondCode[],
        captainPool?: CaptainCode[],
      ) {
        const factionEntry: FactionEntry = {
          code: faction.code,
          order: faction.standardSetup.order,
          militant: faction.militant ?? false,
        }
        if (faction.dealVagabond) {
          factionEntry.vagabond = vagabondPool ? takeRandom(vagabondPool) : true
        }
        if (faction.dealCaptains && captainPool) {
          factionEntry.captains = [
            takeRandom(captainPool),
            takeRandom(captainPool),
            takeRandom(captainPool),
            takeRandom(captainPool),
          ]
        }
        return { payload: { factionEntry, includeBots } }
      },
      reducer(
        state,
        {
          payload: { factionEntry, includeBots },
        }: PayloadAction<{ factionEntry: FactionEntry; includeBots: boolean }>,
      ) {
        state.factionPool.push(factionEntry)

        if (state.useDraft) {
          state.lastFactionLocked = !factionEntry.militant && !includeBots
        } else {
          state.factionPool.sort(({ order: a }, { order: b }) => a - b)
        }
      },
    },

    removeCurrentFactionFromPool(state) {
      if (state.currentIndex != null) {
        const [removedFaction] = state.factionPool.splice(state.currentIndex, 1)
        state.currentIndex = null
        // Clear the last faction lock if the removed faction was militant
        if (state.lastFactionLocked && removedFaction?.militant) state.lastFactionLocked = false
        // Flag if we set up a vagabond
        if (!state.vagabondSetUp && removedFaction?.vagabond) state.vagabondSetUp = true
        if (
          (state.ruinPlacer === null && removedFaction?.code.includes('warlord')) ||
          removedFaction?.code.includes('vagabond')
        ) {
          state.ruinPlacer = removedFaction.code
        }
      } 
      else {
        console.warn(`Invalid removeCurrentFactionFromPool action: currentIndex must not be null`)
      }
    },

    setCurrentPlayerIndex(state, { payload: currentPlayerIndex }: PayloadAction<number | null>) {
      if (currentPlayerIndex == null || currentPlayerIndex >= 0) {
        state.currentPlayerIndex = currentPlayerIndex
      } else {
        console.warn(
          `Invalid payload for setCurrentPlayerIndex action: ${currentPlayerIndex} (Payload must be null or a number larger than or equal to 0)`,
        )
      }
    },

    setCurrentIndex(state, { payload: currentIndex }: PayloadAction<number | null>) {
      if (currentIndex == null || currentIndex >= 0) {
        state.currentIndex = currentIndex
        // Don't wipe redo queue when selecting faction during standard setup since it's just visual
        if (state.currentStep !== SetupStep.selectFaction || state.useDraft) state.futureSteps = []
      } else {
        console.warn(
          `Invalid payload for setCurrentIndex action: ${currentIndex} (Payload must be null or a number larger than or equal to 0)`,
        )
      }
    },
  },

  extraReducers(builder) {
    // This allows us to always reset the redo queue if the setup state changes
    builder
      .addCase(setErrorMessage, () => {
        // No-op so we don't wipe the redo queue when displaying an error
      })
      // Clear internal variables when restarting setup
      .addCase(resetState, () => {
        return getInitialState()
      })
      .addDefaultCase(state => {
        state.futureSteps = []
      })
  },

  selectors: {
    selectBotPool: state => state.botPool,
    selectFlowSlice: createStructuredSelector.withTypes<FlowState>()({
      botPool: state => state.botPool,
      useDraft: state => state.useDraft,
      factionPool: state => state.factionPool,
      hirelingPool: state => state.hirelingPool,
      index: state => state.currentIndex,
      landmarkPool: state => state.landmarkPool,
      lastFactionLocked: state => state.lastFactionLocked,
      playerIndex: state => state.currentPlayerIndex,
      step: state => state.currentStep,
      vagabondSetUp: state => state.vagabondSetUp,
      selectedBots: state => state.selectedBots,
      ruinPlacer: state => state.ruinPlacer,
    }),
  },
})

export const {
  addToFactionPool,
  addToHirelingPool,
  pushStateToPast,
  redoStep,
  removeCurrentFactionFromPool,
  removeCurrentHirelingFromPool,
  removeCurrentLandmarkFromPool,
  resetSelectedBots,
  removeFromBotPool,
  addToSelectedBots,
  resetBotPool,
  resetFactionPool,
  resetHirelingPool,
  setBotPool,
  setCurrentIndex,
  setCurrentPlayerIndex,
  setCurrentStep,
  setLandmarkPool,
  setUseDraft,
  undoStep,
} = flowSlice.actions

export const { selectFlowSlice, selectBotPool } = flowSlice.selectors

export default flowSlice.reducer
