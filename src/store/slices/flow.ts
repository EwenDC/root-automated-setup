import type { PayloadAction } from '@reduxjs/toolkit'

import { createSelector, createSlice } from '@reduxjs/toolkit'

import type { CodeObject, Faction, FactionEntry, FlowSlice, WithCode } from '../../types'

import { SetupStep } from '../../types'
import { loadPersistedSetting, savePersistedSetting, takeRandom } from '../utils'
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
  currentPlayerIndex: number
  currentFactionIndex: number | null
  vagabondPool: string[]
  useDraft: boolean
  skippedSteps: boolean[]
  futureSteps: FlowSlice[]
}

const getSlice = (flowState: FlowState): FlowSlice => ({
  step: flowState.currentStep,
  // This prevents changes we make to the faction pool in the draft state being reflected in already generated slices
  factionPool: [...flowState.factionPool],
  lastFactionLocked: flowState.lastFactionLocked,
  vagabondSetUp: flowState.vagabondSetUp,
  playerIndex: flowState.currentPlayerIndex,
  factionIndex: flowState.currentFactionIndex,
})

const applySlice = (state: FlowState, slice: FlowSlice) => {
  state.currentStep = slice.step
  state.factionPool = slice.factionPool
  state.lastFactionLocked = slice.lastFactionLocked
  state.vagabondSetUp = slice.vagabondSetUp
  state.currentPlayerIndex = slice.playerIndex
  state.currentFactionIndex = slice.factionIndex
}

export const flowSlice = createSlice({
  name: 'flow',

  initialState: () => {
    const initialState: FlowState = {
      pastSteps: [],
      currentStep: SetupStep.chooseExpansions,
      factionPool: [],
      lastFactionLocked: false,
      vagabondSetUp: false,
      currentPlayerIndex: 0,
      currentFactionIndex: null,
      vagabondPool: [],
      useDraft: loadPersistedSetting<boolean>('useDraft', true),
      // Create an array with as many elements as there are setup steps
      skippedSteps: Array<boolean>(SetupStep.setupEnd + 1).fill(false),
      futureSteps: [],
    }
    // Skip bot & hireling setup steps as required
    if (!loadPersistedSetting<boolean>('includeBotStep', false)) {
      initialState.skippedSteps[SetupStep.setUpBots] = true
    }
    if (!loadPersistedSetting<boolean>('includeHirelings', false)) {
      initialState.skippedSteps[SetupStep.setUpHireling1] = true
      initialState.skippedSteps[SetupStep.setUpHireling2] = true
      initialState.skippedSteps[SetupStep.setUpHireling3] = true
      initialState.skippedSteps[SetupStep.postHirelingSetup] = true
    }
    return initialState
  },

  reducers: {
    incrementStep(state) {
      if (state.currentStep < SetupStep.setupEnd) {
        // Add our current state to the undo queue and clear the redo queue
        state.pastSteps.push(getSlice(state))
        state.futureSteps = []

        // Flag that we set up a vagabond
        if (
          state.currentStep === SetupStep.setUpFaction &&
          !state.vagabondSetUp &&
          state.factionPool[state.currentFactionIndex ?? 0]?.vagabond
        ) {
          state.vagabondSetUp = true
        }

        // Handle special cases for faction setup
        if (
          state.currentStep === SetupStep.setUpFaction &&
          state.useDraft &&
          state.currentPlayerIndex > 0
        ) {
          // If we still have players left over, move on to the next player
          state.currentPlayerIndex--
          // Remove the faction we just set up from the pool
          const [removedFaction] = state.factionPool.splice(state.currentFactionIndex ?? 0, 1)
          state.currentFactionIndex = null
          // Clear the last faction lock if the removed faction was militant
          if (state.lastFactionLocked && removedFaction?.militant) state.lastFactionLocked = false
          // Return to the faction selection step
          state.currentStep = SetupStep.selectFaction
        } else if (
          state.currentStep === SetupStep.setUpFaction &&
          !state.useDraft &&
          state.factionPool.length > 1
        ) {
          // Move on to setting up the next faction in the list
          state.factionPool.shift()
        } else {
          // Go to the next non-skipped step
          let skipStep: boolean | undefined
          do {
            state.currentStep++
            skipStep = state.skippedSteps[state.currentStep]
          } while (skipStep && state.currentStep < SetupStep.setupEnd)
        }
      } else {
        console.warn(
          `Invalid incrementStep action: Current step must be smaller than ${SetupStep.setupEnd}`,
        )
      }
    },

    undoStep(state) {
      // Get the previous step from the undo queue
      const previousStep = state.pastSteps.pop()
      if (previousStep != null) {
        // Make sure that you can't use undo/redo to select a faction during standard setup
        if (!state.useDraft) state.currentFactionIndex = null
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
        if (!state.useDraft) state.currentFactionIndex = null
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
      savePersistedSetting('useDraft', useDraft)
    },

    skipSteps: {
      prepare: (steps: SetupStep | SetupStep[], skip: boolean) => ({
        payload: {
          steps: typeof steps === 'number' ? [steps] : steps,
          skip,
        },
      }),
      reducer(state, { payload }: PayloadAction<{ steps: SetupStep[]; skip: boolean }>) {
        const { steps, skip } = payload
        steps.forEach(step => {
          state.skippedSteps[step] = skip
        })
        state.futureSteps = []
      },
    },

    setVagabondPool(state, { payload: vagabondPool }: PayloadAction<CodeObject[]>) {
      state.vagabondPool = vagabondPool.map(({ code }) => code)
    },

    clearFactionPool(state) {
      state.vagabondPool = []
      state.factionPool = []
      state.lastFactionLocked = false
      state.currentFactionIndex = null
    },

    addToFactionPool(state, { payload: faction }: PayloadAction<WithCode<Faction>>) {
      const factionEntry: FactionEntry = {
        code: faction.code,
        order: faction.standardSetup.order,
        militant: faction.militant ?? false,
      }
      if (faction.dealVagabond) {
        factionEntry.vagabond = state.useDraft ? takeRandom(state.vagabondPool) : true
      }

      state.factionPool.push(factionEntry)

      if (state.useDraft) {
        state.lastFactionLocked = !faction.militant
      } else {
        state.factionPool.sort(({ order: a }, { order: b }) => a - b)
      }
    },

    setCurrentPlayerIndex(state, { payload: currentPlayerIndex }: PayloadAction<number>) {
      if (currentPlayerIndex >= 0) {
        state.currentPlayerIndex = currentPlayerIndex
      } else {
        console.warn(
          `Invalid payload for setCurrentPlayerIndex action: ${currentPlayerIndex} (Payload must be a number larger than or equal to 0)`,
        )
      }
    },

    setCurrentFactionIndex(state, { payload: currentFactionIndex }: PayloadAction<number | null>) {
      if (
        currentFactionIndex == null ||
        (currentFactionIndex >= 0 && currentFactionIndex < state.factionPool.length)
      ) {
        state.currentFactionIndex = currentFactionIndex
        // Don't wipe redo queue during standard setup since it's just visual
        if (state.useDraft) state.futureSteps = []
      } else {
        console.warn(
          `Invalid payload for setCurrentFactionIndex action: ${currentFactionIndex} (Payload must be a number larger than or equal to 0 but smaller than the faction pool length [${state.factionPool.length}])`,
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
        // No-op so we don't wipe redo queue when displaying an error
      })
      .addDefaultCase(state => {
        state.futureSteps = []
      })
  },

  selectors: {
    selectFlowSlice: createSelector(
      (state: FlowState) => state.currentStep,
      (state: FlowState) => state.factionPool,
      (state: FlowState) => state.lastFactionLocked,
      (state: FlowState) => state.vagabondSetUp,
      (state: FlowState) => state.currentPlayerIndex,
      (state: FlowState) => state.currentFactionIndex,
      (
        step,
        factionPool,
        lastFactionLocked,
        vagabondSetUp,
        playerIndex,
        factionIndex,
      ): FlowSlice => ({
        step,
        factionPool,
        lastFactionLocked,
        vagabondSetUp,
        playerIndex,
        factionIndex,
      }),
    ),
  },
})

export const {
  incrementStep,
  undoStep,
  redoStep,
  setUseDraft,
  skipSteps,
  setVagabondPool,
  clearFactionPool,
  addToFactionPool,
  setCurrentPlayerIndex,
  setCurrentFactionIndex,
  resetFlow,
} = flowSlice.actions

export const { selectFlowSlice } = flowSlice.selectors

export default flowSlice.reducer
