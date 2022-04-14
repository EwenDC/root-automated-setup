import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteExpansionComponents,
  getExpansionConfig,
  selectComponentArray,
  setupInitialState,
  toggleComponent,
} from "./reduxUtils";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "./expansionSlice";
import { RootState } from "../components/store";
import { ComponentState, ExpansionComponent } from "../types";

const addExpansionLandmarks = (
  state: ComponentState<ExpansionComponent>,
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
          image: landmark.image === "" ? undefined : landmark.image,
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

/** Redux Selector for returning a specified Landmark from state */
export const selectLandmark = (state: RootState, code: string) =>
  state.landmark[code];

/** Redux Selector for returning the landmark list as an array, moving the object key to the object field "code" */
export const selectLandmarkArray = selectComponentArray(
  (state) => state.landmark
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
    toggleLandmark: toggleComponent,
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) =>
      addExpansionLandmarks(state, action.payload),
    [disableExpansionAction]: deleteExpansionComponents,
  },
});

export const { toggleLandmark } = landmarkSlice.actions;
export default landmarkSlice.reducer;
