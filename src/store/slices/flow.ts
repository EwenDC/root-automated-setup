import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'
import { createStructuredSelector } from 'reselect'

import type {
  CaptainCode,
  CodeObject,
  Faction,
  FactionEntry,
  FlowSlice,
  VagabondCode,
  WithCode,
} from '../../types'

import { SETTING_USE_DRAFT } from '../../constants'
import { loadPersistedSetting, savePersistedSetting } from '../../functions/persistedSettings'
import { takeRandom } from '../../functions/random'
import { SetupStep } from '../../types'
import { setErrorMessage } from './setup'

/**
 * An object representing the current flow state, including the current step, past and future steps,
 * and what steps should be skipped.
 */
export interface FlowState {
  pastSteps: FlowSlice[]
  currentStep: SetupStep
  factionPool: FactionEntry[]
  lastFactionLocked: boolean
  vagabondSetUp: boolean
  currentPlayerIndex: number | null
  currentIndex: number | null
  vagabondPool: VagabondCode[]
  captainPool: CaptainCode[]
  useDraft: boolean
  futureSteps: FlowSlice[]
}

const getSlice = (flowState: FlowState): FlowSlice => ({
  step: flowState.currentStep,
  // This prevents changes we make to the faction pool in the draft state being reflected in already generated slices
  factionPool: [...flowState.factionPool],
  lastFactionLocked: flowState.lastFactionLocked,
  vagabondSetUp: flowState.vagabondSetUp,
  playerIndex: flowState.currentPlayerIndex,
  index: flowState.currentIndex,
})

const applySlice = (state: FlowState, slice: FlowSlice) => {
  state.currentStep = slice.step
  state.factionPool = slice.factionPool
  state.lastFactionLocked = slice.lastFactionLocked
  state.vagabondSetUp = slice.vagabondSetUp
  state.currentPlayerIndex = slice.playerIndex
  state.currentIndex = slice.index
}

export const flowSlice = createSlice({
  name: 'flow',

  initialState: (): FlowState => ({
    pastSteps: [],
    currentStep: SetupStep.chooseExpansions,
    factionPool: [],
    lastFactionLocked: false,
    vagabondSetUp: false,
    currentPlayerIndex: null,
    currentIndex: null,
    vagabondPool: [],
    captainPool: [],
    useDraft: loadPersistedSetting<boolean>(SETTING_USE_DRAFT, true),
    futureSteps: [],
  }),

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

    setVagabondPool(state, { payload: vagabondPool }: PayloadAction<CodeObject[]>) {
      state.vagabondPool = vagabondPool.map(({ code }) => code)
    },

    setCaptainPool(state, { payload: captainPool }: PayloadAction<CodeObject[]>) {
      state.captainPool = captainPool.map(({ code }) => code)
    },

    resetFactionPool(state) {
      state.factionPool = []
      state.vagabondPool = []
      state.captainPool = []
      state.lastFactionLocked = false
      state.vagabondSetUp = false
      state.currentIndex = null
    },

    addToFactionPool(state, { payload: faction }: PayloadAction<WithCode<Faction>>) {
      const factionEntry: FactionEntry = {
        code: faction.code,
        order: faction.standardSetup.order,
        militant: faction.militant ?? false,
      }
      if (faction.dealVagabond) {
        factionEntry.vagabond = !state.useDraft || takeRandom(state.vagabondPool)
      }
      if (faction.dealCaptains && state.useDraft) {
        factionEntry.captains = [
          takeRandom(state.captainPool),
          takeRandom(state.captainPool),
          takeRandom(state.captainPool),
          takeRandom(state.captainPool),
        ]
      }

      state.factionPool.push(factionEntry)

      if (state.useDraft) {
        state.lastFactionLocked = !faction.militant
      } else {
        state.factionPool.sort(({ order: a }, { order: b }) => a - b)
      }
    },

    removeCurrentFactionFromPool(state) {
      if (state.currentIndex != null) {
        const [removedFaction] = state.factionPool.splice(state.currentIndex, 1)
        state.currentIndex = null
        // Clear the last faction lock if the removed faction was militant
        if (state.lastFactionLocked && removedFaction?.militant) state.lastFactionLocked = false
        // Flag if we set up a vagabond
        if (!state.vagabondSetUp && removedFaction?.vagabond) state.vagabondSetUp = true
      } else {
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
        // Don't wipe redo queue during standard setup since it's just visual
        if (state.useDraft) state.futureSteps = []
      } else {
        console.warn(
          `Invalid payload for setCurrentIndex action: ${currentIndex} (Payload must be null or a number larger than or equal to 0)`,
        )
      }
    },

    resetFlow(state) {
      state.pastSteps = []
      state.currentStep = SetupStep.chooseExpansions
      state.futureSteps = []
    },
  },

  extraReducers(builder) {
    // This allows us to always reset the redo queue if the setup state changes
    builder
      .addCase(setErrorMessage, () => {
        // No-op so we don't wipe the redo queue when displaying an error
      })
      .addDefaultCase(state => {
        state.futureSteps = []
      })
  },

  selectors: {
    selectFlowSlice: createStructuredSelector.withTypes<FlowState>()({
      step: state => state.currentStep,
      factionPool: state => state.factionPool,
      lastFactionLocked: state => state.lastFactionLocked,
      vagabondSetUp: state => state.vagabondSetUp,
      playerIndex: state => state.currentPlayerIndex,
      index: state => state.currentIndex,
    }),
  },
})

export const {
  addToFactionPool,
  pushStateToPast,
  redoStep,
  removeCurrentFactionFromPool,
  resetFactionPool,
  resetFlow,
  setCaptainPool,
  setCurrentStep,
  setUseDraft,
  setVagabondPool,
  setCurrentIndex,
  setCurrentPlayerIndex,
  undoStep,
} = flowSlice.actions

export const { selectFlowSlice } = flowSlice.selectors

export default flowSlice.reducer
