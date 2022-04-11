import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../components/store";
import { SetupStep, StepState } from "../types";

const initialState: StepState = {
  currentStep: SetupStep.chooseExpansions,
  futureSteps: [],
  skippedSteps: [],
};
// Default to skipping bot setup step
initialState.skippedSteps[SetupStep.setUpBots] = true;

/** Returns the flow information (including current step) from redux state */
export const selectFlowState = (state: RootState) => state.flow;

export const flowSlice = createSlice({
  name: "flow",
  initialState: initialState,
  reducers: {
    setStep: (state, action: PayloadAction<SetupStep>) => {
      state.currentStep = action.payload;
      state.futureSteps = [];
    },
    incrementStep: (state, action: PayloadAction) => {
      if (state.currentStep < SetupStep.setupEnd) {
        let skipStep = false;
        do {
          state.currentStep++;
          skipStep = state.skippedSteps[state.currentStep] ?? false;
        } while (skipStep && state.currentStep < SetupStep.setupEnd);
        state.futureSteps = [];
      } else {
        console.warn(
          `Invalid incrementStep action: Current step must be smaller than ${SetupStep.setupEnd}`,
          action
        );
      }
    },
    undoStep: (state, action: PayloadAction) => {
      if (state.currentStep > SetupStep.chooseExpansions) {
        state.futureSteps.unshift(state.currentStep);
        let skipStep = false;
        do {
          state.currentStep--;
          skipStep = state.skippedSteps[state.currentStep] ?? false;
        } while (skipStep && state.currentStep > SetupStep.chooseExpansions);
      } else {
        console.warn(
          `Invalid undoStep action: Current step must be larger than ${SetupStep.chooseExpansions}`,
          action
        );
      }
    },
    redoStep: (state, action: PayloadAction) => {
      const nextStep = state.futureSteps.shift();
      if (nextStep != null) {
        state.currentStep = nextStep;
      } else {
        console.warn(
          `Invalid redoStep action: Future Steps array returned empty value (${nextStep})`,
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
  },
  extraReducers: (builder) => {
    // This allows us to always reset the redo queue if the setup state changes
    builder.addDefaultCase((state) => {
      state.futureSteps = [];
    });
  },
});

export const { setStep, incrementStep, undoStep, redoStep, skipSteps } =
  flowSlice.actions;
export default flowSlice.reducer;
