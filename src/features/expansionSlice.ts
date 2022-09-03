import {
  ActionReducerMapBuilder,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import content from "../content.json";
import {
  addExpansionComponents,
  expansionEnabled,
  getExpansionConfig,
  persistExpansionEnabled,
} from "./utils";
import { Expansion, ExpansionComponent } from "../types";

const setupInitialExpansionState = () => {
  let initialState: Record<string, Expansion> = {};
  for (const [expansionCode, expansion] of Object.entries(content)) {
    initialState[expansionCode] = {
      base: expansion.base,
      image: expansion.image === "" ? undefined : expansion.image,
      enabled: expansionEnabled(expansionCode, expansion.base),
    };
  }
  return initialState;
};

const setExpansionEnabled = (
  state: Record<string, Expansion>,
  expansionCode: string,
  enabled: boolean
) => {
  // Retreive the expansion (may return undefined if code does not exist)
  const expansion = state[expansionCode];
  // Only update the expansion state if it exists and is not the base game
  if (expansion != null && !expansion.base) {
    expansion.enabled = enabled;
    persistExpansionEnabled(expansionCode, expansion.enabled);
  }
};

export const expansionSlice = createSlice({
  name: "expansion",
  initialState: setupInitialExpansionState,
  reducers: {
    enableExpansion: (state, action: PayloadAction<string>) =>
      setExpansionEnabled(state, action.payload, true),
    disableExpansion: (state, action: PayloadAction<string>) =>
      setExpansionEnabled(state, action.payload, false),
  },
});

export const { enableExpansion, disableExpansion } = expansionSlice.actions;
export default expansionSlice.reducer;

/** Function for adding automatic enable/disable expansion reducers to a redux slice */
export const expansionReducers =
  <T extends ExpansionComponent>(componentKey: string) =>
  (builder: ActionReducerMapBuilder<Record<string, T>>) => {
    builder
      .addCase(enableExpansion, (state, action) =>
        addExpansionComponents<Draft<T>>(state, action.payload, componentKey)
      )
      .addCase(disableExpansion, (state, action) => {
        // Skip processing for the base game, as that cannot be disabled
        if (!getExpansionConfig(action.payload)?.base) {
          // Remove all components matching the disabled expansion
          for (const [componentCode, component] of Object.entries(state)) {
            if (component.expansionCode === action.payload) {
              delete state[componentCode];
            }
          }
        }
      });
  };
