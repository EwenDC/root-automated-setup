import { createSlice } from "@reduxjs/toolkit";
import { setupInitialState, toggleComponent } from "./utils";
import { expansionReducers } from "./expansionSlice";
import { Landmark } from "../types";

export const landmarkSlice = createSlice({
  name: "landmark",
  initialState: setupInitialState<Landmark>("landmarks"),
  reducers: {
    toggleLandmark: toggleComponent,
  },
  extraReducers: expansionReducers("landmarks"),
});

export const { toggleLandmark } = landmarkSlice.actions;
export default landmarkSlice.reducer;
