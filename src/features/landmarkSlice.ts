import { createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  setupInitialState,
  toggleComponent,
} from "./utils";
import { expansionReducers } from "./expansionSlice";
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
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `While enabling expansion "${expansionCode}", landmark with duplicate code "${landmarkCode}" not added to state:`,
          landmark
        );
      }
    }
};

export const landmarkSlice = createSlice({
  name: "landmark",
  initialState: () => setupInitialState(addExpansionLandmarks),
  reducers: {
    toggleLandmark: toggleComponent,
  },
  extraReducers: (builder) => expansionReducers(builder, addExpansionLandmarks),
});

export const { toggleLandmark } = landmarkSlice.actions;
export default landmarkSlice.reducer;
