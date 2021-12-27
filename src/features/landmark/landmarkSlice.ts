import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../../components/content.json";
import { RootState } from "../../components/store";
import { expansionEnabled, getExpansionConfig } from "../../util";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "../expansion/expansionSlice";

export interface Landmark {
  name: string;
  expansionCode: string;
  enabled: boolean;
}
export interface LandmarkState {
  [code: string]: Landmark;
}

const addExpansionLandmarks = (
  state: LandmarkState,
  expansionCode: string,
  expansion = getExpansionConfig(expansionCode)
) => {
  if (expansion != null && "landmarks" in expansion)
    for (const [landmarkCode, landmark] of Object.entries(
      expansion.landmarks
    )) {
      // Don't add to state if it already exists
      if (state[landmarkCode] == null) {
        state[landmarkCode] = {
          name: landmark.name,
          expansionCode: expansionCode,
          enabled: true,
        };
      } else {
        console.warn(
          `While enabling expansion "${expansionCode}", landmark with duplicate code "${landmarkCode}" not added to state:`,
          landmark
        );
      }
    }
};

let initialState: LandmarkState = {};
for (const [expansionCode, expansion] of Object.entries(content)) {
  if (expansionEnabled(expansionCode, expansion.base)) {
    addExpansionLandmarks(initialState, expansionCode, expansion);
  }
}

/** Redux Selector for returning the landmark list as an array, moving the object key to the object field "code" */
export const selectLandmarkArray = createSelector(
  (state: RootState) => state.landmark,
  (stateSlice) => {
    const array = [];
    for (const [code, object] of Object.entries(stateSlice)) {
      array.push({ ...object, code });
    }
    return array;
  }
);

/** Redux Selector for returning an array of enabled landmarks */
export const selectEnabledLandmarks = createSelector(
  selectLandmarkArray,
  (array) => array.filter((value) => value.enabled)
);

export const landmarkSlice = createSlice({
  name: "landmark",
  initialState,
  reducers: {
    enableLandmark: (state, action: PayloadAction<string>) => {
      // Retreive the landmark
      const landmark = state[action.payload];
      // Only update the landmark state if it exists
      if (landmark != null) {
        landmark.enabled = true;
      }
    },
    disableLandmark: (state, action: PayloadAction<string>) => {
      // Retreive the landmark
      const landmark = state[action.payload];
      // Only update the landmark state if it exists
      if (landmark != null) {
        landmark.enabled = false;
      }
    },
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) => {
      addExpansionLandmarks(state, action.payload);
    },
    [disableExpansionAction]: (state, action: PayloadAction<string>) => {
      // Skip processing for the base game, as that cannot be disabled
      if (!getExpansionConfig(action.payload)?.base) {
        // Remove all landmarks matching the disabled expansion
        for (const [hirelingCode, hireling] of Object.entries(state)) {
          if (hireling.expansionCode === action.payload) {
            delete state[hirelingCode];
          }
        }
      }
    },
  },
});

export const { enableLandmark, disableLandmark } = landmarkSlice.actions;
export default landmarkSlice.reducer;
