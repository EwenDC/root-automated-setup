import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SetupStep,
  FlowState,
  FlowSlice,
  WithCode,
  Faction,
  FactionEntry,
  SkipStepsPayload,
  CodeObject,
} from "../types";
import { setErrorMessage } from "./setupSlice";
import { takeRandom } from "./utils";

const initialState: FlowState = {
  pastSteps: [],
  currentStep: SetupStep.chooseExpansions,
  factionPool: [],
  lastFactionLocked: false,
  vagabondSetUp: false,
  currentPlayerIndex: 0,
  currentFactionIndex: null,
  // Create an array with as many elements as there are setup steps
  skippedSteps: Array(SetupStep.setupEnd + 1).fill(false),
  futureSteps: [],
};
// Default to skipping bot & hireling setup steps
initialState.skippedSteps[SetupStep.setUpBots] = true;
initialState.skippedSteps[SetupStep.setUpHireling1] = true;
initialState.skippedSteps[SetupStep.setUpHireling2] = true;
initialState.skippedSteps[SetupStep.setUpHireling3] = true;
initialState.skippedSteps[SetupStep.postHirelingSetup] = true;

const getSlice = (state: FlowState): FlowSlice => ({
  step: state.currentStep,
  // This prevents changes we make to the faction pool in the draft state being reflected in already generated slices
  factionPool: [...state.factionPool],
  lastFactionLocked: state.lastFactionLocked,
  vagabondSetUp: state.vagabondSetUp,
  playerIndex: state.currentPlayerIndex,
  factionIndex: state.currentFactionIndex,
});

const applySlice = (state: FlowState, slice: FlowSlice) => {
  state.currentStep = slice.step;
  state.factionPool = slice.factionPool;
  state.lastFactionLocked = slice.lastFactionLocked;
  state.vagabondSetUp = slice.vagabondSetUp;
  state.currentPlayerIndex = slice.playerIndex;
  state.currentFactionIndex = slice.factionIndex;
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    incrementStep: (state) => {
      if (state.currentStep < SetupStep.setupEnd) {
        // Add our current state to the undo queue and clear the redo queue
        state.pastSteps.push(getSlice(state));
        state.futureSteps = [];

        // Flag that we set up a vagabond
        if (
          state.currentStep === SetupStep.setUpFaction &&
          !state.vagabondSetUp &&
          state.factionPool[state.currentFactionIndex ?? 0].vagabond
        )
          state.vagabondSetUp = true;

        // Handle special case for faction setup
        if (state.currentStep === SetupStep.setUpFaction && state.currentPlayerIndex > 0) {
          // If we still have players left over, move on to the next player
          state.currentPlayerIndex--;
          // Remove the faction we just set up from the pool
          const [removedFaction] = state.factionPool.splice(state.currentFactionIndex ?? 0, 1);
          state.currentFactionIndex = null;
          // Clear the last faction lock if the removed faction was militant
          if (state.lastFactionLocked && removedFaction.militant) state.lastFactionLocked = false;
          // Return to the faction selection step
          state.currentStep = SetupStep.selectFaction;
        } else {
          // Go to the next non-skipped step
          let skipStep = false;
          do {
            state.currentStep++;
            skipStep = state.skippedSteps[state.currentStep];
          } while (skipStep && state.currentStep < SetupStep.setupEnd);
        }
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid incrementStep action: Current step must be smaller than ${SetupStep.setupEnd}`
        );
      }
    },
    undoStep: (state) => {
      // Get the previous step from the undo queue
      const previousStep = state.pastSteps.pop();
      if (previousStep != null) {
        // Add our current state to the redo queue
        state.futureSteps.unshift(getSlice(state));
        // Override current state with state from previous step
        applySlice(state, previousStep);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid undoStep action: pastSteps array returned empty value (${previousStep})`
        );
      }
    },
    redoStep: (state) => {
      // Get the next step from the redo queue
      const nextStep = state.futureSteps.shift();
      if (nextStep != null) {
        // Add our current state to the undo queue
        state.pastSteps.push(getSlice(state));
        // Override current state with state from next step
        applySlice(state, nextStep);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid redoStep action: futureSteps array returned empty value (${nextStep})`
        );
      }
    },
    skipSteps: {
      prepare: (steps: SetupStep | SetupStep[], skip: boolean) => ({
        payload: {
          steps: typeof steps === "number" ? [steps] : steps,
          skip,
        },
      }),
      reducer: (state, { payload }: PayloadAction<SkipStepsPayload>) => {
        const { steps, skip } = payload;
        steps.forEach((step) => {
          state.skippedSteps[step] = skip;
        });
        state.futureSteps = [];
      },
    },
    clearFactionPool: (state) => {
      state.factionPool = [];
      state.lastFactionLocked = false;
      state.currentFactionIndex = null;
    },
    addToFactionPool: {
      prepare: (faction: WithCode<Faction>, vagabondPool: CodeObject[]) => ({
        payload: {
          code: faction.code,
          militant: faction.militant,
          vagabond: faction.isVagabond ? takeRandom(vagabondPool).code : undefined,
        },
      }),
      reducer: (state, { payload: factionEntry }: PayloadAction<FactionEntry>) => {
        // Add to our pool, and set it to locked if insurgent
        state.factionPool.push(factionEntry);
        state.lastFactionLocked = !factionEntry.militant;
      },
    },
    setCurrentPlayerIndex: (state, { payload: currentPlayerIndex }: PayloadAction<number>) => {
      if (currentPlayerIndex >= 0) {
        state.currentPlayerIndex = currentPlayerIndex;
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid payload for setCurrentPlayerIndex action: ${currentPlayerIndex} (Payload must be a number larger than or equal to 0)`
        );
      }
    },
    setCurrentFactionIndex: (state, { payload: currentFactionIndex }: PayloadAction<number>) => {
      if (currentFactionIndex >= 0 && currentFactionIndex < state.factionPool.length) {
        state.currentFactionIndex = currentFactionIndex;
        state.futureSteps = [];
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid payload for setCurrentFactionIndex action: ${currentFactionIndex} (Payload must be a number larger than or equal to 0 but smaller than the faction pool length [${state.factionPool.length}])`
        );
      }
    },
    resetFlow: (state) => {
      state.pastSteps = [];
      state.currentStep = SetupStep.chooseExpansions;
      state.futureSteps = [];
    },
  },
  extraReducers: (builder) => {
    // This allows us to always reset the redo queue if the setup state changes
    builder
      // Don't wipe redo queue when the only thing that happened was displaying an error
      .addCase(setErrorMessage, () => {})
      .addDefaultCase((state) => {
        state.futureSteps = [];
      });
  },
});

export const {
  incrementStep,
  undoStep,
  redoStep,
  skipSteps,
  clearFactionPool,
  addToFactionPool,
  setCurrentPlayerIndex,
  setCurrentFactionIndex,
  resetFlow,
} = flowSlice.actions;
export default flowSlice.reducer;
