import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../components/store";
import {
  Component,
  deleteExpansionComponents,
  disableComponent,
  enableComponent,
  getExpansionConfig,
  setupInitialState,
} from "../../util";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "../expansion/expansionSlice";

export interface Landmark extends Component {
  name: string;
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
  initialState: setupInitialState(addExpansionLandmarks),
  reducers: {
    enableLandmark: enableComponent,
    disableLandmark: disableComponent,
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) =>
      addExpansionLandmarks(state, action.payload),
    [disableExpansionAction]: deleteExpansionComponents,
  },
});

export const { enableLandmark, disableLandmark } = landmarkSlice.actions;
export default landmarkSlice.reducer;
