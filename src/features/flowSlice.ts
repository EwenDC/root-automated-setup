import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../components/store";
import {
  SetupStep,
  FlowState,
  FlowSlice,
  WithCode,
  Faction,
  Vagabond,
  FactionEntry,
} from "../types";
import { takeRandom } from "./utils";
import { setErrorMessage } from "./setupSlice";

const initialState: FlowState = {
  pastSteps: [],
  currentStep: SetupStep.chooseExpansions,
  factionPool: [],
  lastFactionLocked: false,
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
  playerIndex: state.currentPlayerIndex,
  factionIndex: state.currentFactionIndex,
});

const applySlice = (state: FlowState, slice: FlowSlice) => {
  state.currentStep = slice.step;
  state.factionPool = slice.factionPool;
  state.lastFactionLocked = slice.lastFactionLocked;
  state.currentPlayerIndex = slice.playerIndex;
  state.currentFactionIndex = slice.factionIndex;
};

/** Returns the faction pool, joining the original faction and vagabond objects into the entries */
export const selectFactionPool = createSelector(
  (state: RootState) => state.flow.factionPool,
  (state: RootState) => state.faction,
  (state: RootState) => state.vagabond,
  (factionPool, factions, vagabonds) =>
    factionPool.map((entry) => ({
      ...factions[entry.code],
      code: entry.code,
      vagabond: entry.vagabond
        ? { ...vagabonds[entry.vagabond], code: entry.vagabond }
        : undefined,
    }))
);

export const flowSlice = createSlice({
  name: "flow",
  initialState: initialState,
  reducers: {
    incrementStep: (state, action: PayloadAction) => {
      if (state.currentStep < SetupStep.setupEnd) {
        // Add our current state to the undo queue and clear the redo queue
        state.pastSteps.push(getSlice(state));
        state.futureSteps = [];

        // Handle special case for faction setup
        if (
          state.currentStep === SetupStep.setUpFaction &&
          state.currentPlayerIndex > 0
        ) {
          // If we still have players left over, move on to the next player
          state.currentPlayerIndex--;
          // Remove the faction we just set up from the pool
          const [removedFaction] = state.factionPool.splice(
            state.currentFactionIndex ?? 0,
            1
          );
          state.currentFactionIndex = null;
          // Clear the last faction lock if the removed faction was militant
          if (state.lastFactionLocked && removedFaction.militant)
            state.lastFactionLocked = false;
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
          `Invalid incrementStep action: Current step must be smaller than ${SetupStep.setupEnd}`,
          action
        );
      }
    },
    undoStep: (state, action: PayloadAction) => {
      // Get the previous step from the undo queue
      const previousStep = state.pastSteps.pop();
      if (previousStep != null) {
        // Add our current state to the redo queue
        state.futureSteps.unshift(getSlice(state));
        // Override current state with state from previous step
        applySlice(state, previousStep);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid undoStep action: pastSteps array returned empty value (${previousStep})`,
          action
        );
      }
    },
    redoStep: (state, action: PayloadAction) => {
      // Get the next step from the redo queue
      const nextStep = state.futureSteps.shift();
      if (nextStep != null) {
        // Add our current state to the undo queue
        state.pastSteps.push(getSlice(state));
        // Override current state with state from next step
        applySlice(state, nextStep);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid redoStep action: futureSteps array returned empty value (${nextStep})`,
          action
        );
      }
    },
    skipSteps: {
      prepare: (steps: SetupStep | SetupStep[], skip: boolean) => ({
        payload: {
          steps: typeof steps === "number" ? [steps] : steps,
          skip: skip,
        },
      }),
      reducer: (
        state,
        action: PayloadAction<{ steps: SetupStep[]; skip: boolean }>
      ) => {
        action.payload.steps.forEach((step) => {
          state.skippedSteps[step] = action.payload.skip;
        });
        state.futureSteps = [];
      },
    },
    clearFactionPool: (state) => {
      state.factionPool = [];
      state.lastFactionLocked = false;
      state.currentFactionIndex = null;
      state.futureSteps = [];
    },
    addToFactionPool: {
      prepare: (
        faction: WithCode<Faction>,
        vagabondPool: WithCode<Vagabond>[]
      ) => ({
        payload: {
          code: faction.code,
          militant: faction.militant,
          vagabond: faction.isVagabond
            ? takeRandom(vagabondPool).code
            : undefined,
        },
      }),
      reducer: (state, action: PayloadAction<FactionEntry>) => {
        // Add to our pool, and set it to locked if insurgent
        state.factionPool.push(action.payload);
        state.lastFactionLocked = !action.payload.militant;
        state.futureSteps = [];
      },
    },
    setCurrentPlayerIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0) {
        state.currentPlayerIndex = action.payload;
        state.futureSteps = [];
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Invalid payload for setCurrentPlayerIndex action: Payload must be a number larger than or equal to 0",
          action
        );
      }
    },
    setCurrentFactionIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.factionPool.length) {
        state.currentFactionIndex = action.payload;
        state.futureSteps = [];
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `Invalid payload for setCurrentFactionIndex action: Payload must be a number larger than or equal to 0 but smaller than the faction pool length (${state.factionPool.length})`,
          action
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
