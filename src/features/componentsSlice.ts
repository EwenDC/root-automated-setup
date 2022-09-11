import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../content";
import { expansionEnabled, persistExpansionEnabled, typedEntries, typedKeys } from "./utils";
import { ComponentsState, Expansion } from "../types";

const addExpansionComponents = (
  state: ComponentsState,
  expansionCode: string,
  { base, image, ...components }: Expansion
) => {
  for (const [componentType, componentList] of typedEntries(components)) {
    for (const componentCode of typedKeys(componentList!)) {
      state[componentType][componentCode] = {
        enabled: true,
        expansionCode,
      };
    }
  }
};

const setupInitialState = () => {
  let initialState: ComponentsState = {
    expansions: {},
    decks: {},
    factions: {},
    hirelings: {},
    landmarks: {},
    maps: {},
    vagabonds: {},
  };

  for (const [expansionCode, expansion] of typedEntries(content)) {
    const enabled = expansionEnabled(expansionCode, expansion.base);

    initialState.expansions[expansionCode] = {
      base: expansion.base,
      enabled,
    };
    // Add expansion components to state if the expansion is enabled
    if (enabled) addExpansionComponents(initialState, expansionCode, expansion);
  }
  return initialState;
};

const toggleComponent =
  (componentType: keyof ComponentsState) =>
  (state: ComponentsState, { payload: componentCode }: PayloadAction<string>) => {
    state[componentType][componentCode].enabled = !state[componentType][componentCode].enabled;
  };

export const componentsSlice = createSlice({
  name: "components",
  initialState: setupInitialState,
  reducers: {
    toggleExpansion: (state, { payload: expansionCode }: PayloadAction<string>) => {
      const expansion = state.expansions[expansionCode];
      // Do not allow changing the enabled state of base game
      if (expansion && !expansion.base) {
        // Toggle enable state and persist change
        expansion.enabled = !expansion.enabled;
        persistExpansionEnabled(expansionCode, expansion.enabled);

        if (expansion.enabled) {
          // The expansion was just enabled, add it's components to our component list
          addExpansionComponents(state, expansionCode, content[expansionCode]);
        } else {
          // The expansion was just disabled, delete any components that came from it
          const { expansions, ...components } = state;
          for (const [componentType, componentList] of typedEntries(components)) {
            for (const [componentCode, component] of typedEntries(componentList)) {
              if (component.expansionCode === expansionCode) {
                delete state[componentType][componentCode];
              }
            }
          }
        }
      } else if (process.env.NODE_ENV !== "production") {
        if (expansion) {
          console.warn(
            `Invalid payload for toggleExpansion action: ${expansionCode} (Cannot disable expansion flagged as base)`
          );
        } else {
          console.warn(
            `Invalid payload for toggleExpansion action: ${expansionCode} (No expansion exists with provided code)`
          );
        }
      }
    },
    toggleDeck: toggleComponent("decks"),
    toggleFaction: toggleComponent("factions"),
    toggleHireling: toggleComponent("hirelings"),
    toggleLandmark: toggleComponent("landmarks"),
    toggleMap: toggleComponent("maps"),
    toggleVagabond: toggleComponent("vagabonds"),
  },
});

export const {
  toggleExpansion,
  toggleDeck,
  toggleFaction,
  toggleHireling,
  toggleLandmark,
  toggleMap,
  toggleVagabond,
} = componentsSlice.actions;
export default componentsSlice.reducer;
