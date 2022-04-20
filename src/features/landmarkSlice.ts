import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  selectComponentArray,
  setupInitialState,
  toggleComponent,
} from "./reduxUtils";
import { expansionReducers } from "./expansionSlice";
import { RootState } from "../components/store";
import { ComponentState, Landmark } from "../types";

const addExpansionLandmarks = (
  state: ComponentState<Landmark>,
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
          ...landmark,
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
  extraReducers: (builder) => expansionReducers(builder, addExpansionLandmarks),
});

export const { toggleLandmark } = landmarkSlice.actions;
export default landmarkSlice.reducer;
