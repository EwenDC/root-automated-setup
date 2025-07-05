import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../content";
import {
  ComponentsState,
  EnableMapLandmarkPayload,
  Expansion,
  LockComponentPayload,
  MapFixedSuitsPayload,
  MapInfo,
} from "../types";
import { loadPersistedSetting, savePersistedSetting, typedEntries } from "./utils";

const COMPONENT_TYPES = [
  "decks",
  "factions",
  "hirelings",
  "landmarks",
  "maps",
  "vagabonds",
] satisfies (keyof Expansion)[];

const FIXED_SUIT_KEY = ".fixedSuits";
const USE_LANDMARK_KEY = ".useLandmark";

const addExpansionComponents = (
  state: ComponentsState,
  expansionCode: string,
  expansionContent: Expansion,
) => {
  for (const componentType of COMPONENT_TYPES) {
    const componentList = expansionContent[componentType];
    if (componentList) {
      for (const [componentCode, componentData] of typedEntries(componentList)) {
        const componentInfo: MapInfo = {
          enabled: loadPersistedSetting<boolean>(`${componentType}.${componentCode}`, true),
          locked: false,
          expansionCode,
        };
        if ("defaultSuits" in componentData)
          componentInfo.fixedSuits = loadPersistedSetting<boolean>(
            `${componentType}.${componentCode}${FIXED_SUIT_KEY}`,
            false,
          );
        if ("landmark" in componentData)
          componentInfo.useLandmark = loadPersistedSetting<boolean>(
            `${componentType}.${componentCode}${USE_LANDMARK_KEY}`,
            true,
          );

        state[componentType][componentCode] = componentInfo;
      }
    }
  }
};

const setupInitialState = () => {
  const initialState: ComponentsState = {
    expansions: {},
    decks: {},
    factions: {},
    hirelings: {},
    landmarks: {},
    maps: {},
    vagabonds: {},
  };

  for (const [expansionCode, expansion] of typedEntries(content)) {
    const enabled =
      expansion.base || loadPersistedSetting<boolean>(`expansions.${expansionCode}`, false);

    initialState.expansions[expansionCode] = {
      enabled,
      locked: expansion.base && "error.baseExpansionRequired",
      image: expansion.image,
    };
    // Add expansion components to state if the expansion is enabled
    if (enabled) addExpansionComponents(initialState, expansionCode, expansion);
  }
  return initialState;
};

const toggleComponent =
  (componentType: keyof ComponentsState) =>
  (state: ComponentsState, { payload: componentCode }: PayloadAction<string>) => {
    const component = state[componentType][componentCode];
    if (component) {
      const newState = !component.enabled;
      component.enabled = newState;
      savePersistedSetting(`${componentType}.${componentCode}`, newState);
    } else {
      console.warn(
        `Invalid payload for toggle${componentType.charAt(0).toUpperCase()}${componentType.slice(1)} action: ${componentCode} (No component exists with provided code)`,
      );
    }
  };

const lockComponent = (componentType: keyof ComponentsState) => ({
  prepare: (componentCode: string, locked: string | false) => ({
    payload: { componentCode, locked },
  }),
  reducer(state: ComponentsState, { payload }: PayloadAction<LockComponentPayload>) {
    const { componentCode, locked } = payload;
    const component = state[componentType][componentCode];
    if (component) {
      component.locked = locked;
      component.enabled = locked
        ? false
        : loadPersistedSetting<boolean>(`${componentType}.${componentCode}`, true);
    } else {
      console.warn(
        `Invalid payload for lock${componentType.charAt(0).toUpperCase()}${componentType.slice(1)} action:`,
        payload,
        "(No component exists with provided code)",
      );
    }
  },
});

export const componentsSlice = createSlice({
  name: "components",
  initialState: setupInitialState,
  reducers: {
    toggleExpansion(state, { payload: expansionCode }: PayloadAction<string>) {
      const expansion = state.expansions[expansionCode];
      // Do not allow changing the enabled state of base game
      if (expansion && !expansion.locked) {
        // Toggle enable state and persist change
        expansion.enabled = !expansion.enabled;
        savePersistedSetting(`expansions.${expansionCode}`, expansion.enabled);

        if (expansion.enabled) {
          // The expansion was just enabled, add it's components to our component list. We know the
          // expansion content will exist because we used `content` to create the expansion state.
          addExpansionComponents(state, expansionCode, content[expansionCode]!);
        } else {
          // The expansion was just disabled, delete any components that came from it
          for (const componentType of COMPONENT_TYPES) {
            const componentList = state[componentType];
            for (const [componentCode, component] of typedEntries(componentList)) {
              if (component.expansionCode === expansionCode) {
                delete state[componentType][componentCode];
              }
            }
          }
        }
      } else if (expansion) {
        console.warn(
          `Invalid payload for toggleExpansion action: ${expansionCode} (Cannot disable expansion flagged as base)`,
        );
      } else {
        console.warn(
          `Invalid payload for toggleExpansion action: ${expansionCode} (No expansion exists with provided code)`,
        );
      }
    },
    toggleDeck: toggleComponent("decks"),
    toggleFaction: toggleComponent("factions"),
    lockFaction: lockComponent("factions"),
    toggleHireling: toggleComponent("hirelings"),
    lockHireling: lockComponent("hirelings"),
    toggleLandmark: toggleComponent("landmarks"),
    lockLandmark: lockComponent("landmarks"),
    toggleMap: toggleComponent("maps"),
    enableMapLandmark: {
      prepare: (mapCode: string, enableLandmark: boolean) => ({
        payload: { mapCode, enableLandmark },
      }),
      reducer(state, { payload }: PayloadAction<EnableMapLandmarkPayload>) {
        const { mapCode, enableLandmark } = payload;
        const map = state.maps[mapCode];
        if (map) {
          map.useLandmark = enableLandmark;
          savePersistedSetting(`maps.${mapCode}${USE_LANDMARK_KEY}`, enableLandmark);
        } else {
          console.warn(
            "Invalid payload for enableMapLandmark action:",
            payload,
            "(No map exists with provided code)",
          );
        }
      },
    },
    mapFixedSuits: {
      prepare: (mapCode: string, fixedSuits: boolean) => ({
        payload: { mapCode, fixedSuits },
      }),
      reducer(state, { payload }: PayloadAction<MapFixedSuitsPayload>) {
        const { mapCode, fixedSuits } = payload;
        const map = state.maps[mapCode];
        if (map) {
          map.fixedSuits = fixedSuits;
          savePersistedSetting(`maps.${mapCode}${FIXED_SUIT_KEY}`, fixedSuits);
        } else {
          console.warn(
            "Invalid payload for mapFixedSuits action:",
            payload,
            "(No map exists with provided code)",
          );
        }
      },
    },
    toggleVagabond: toggleComponent("vagabonds"),
  },
});

export const {
  enableMapLandmark,
  lockFaction,
  lockHireling,
  lockLandmark,
  mapFixedSuits,
  toggleExpansion,
  toggleDeck,
  toggleFaction,
  toggleHireling,
  toggleLandmark,
  toggleMap,
  toggleVagabond,
} = componentsSlice.actions;
export default componentsSlice.reducer;
