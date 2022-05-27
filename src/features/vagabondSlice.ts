import { createSlice } from "@reduxjs/toolkit";
import { setupInitialState, toggleComponent } from "./utils";
import { expansionReducers } from "./expansionSlice";
import { Vagabond } from "../types";

export const vagabondSlice = createSlice({
  name: "vagabond",
  initialState: setupInitialState<Vagabond>("vagabonds"),
  reducers: {
    toggleVagabond: toggleComponent,
  },
  extraReducers: expansionReducers("vagabonds"),
});

export const { toggleVagabond } = vagabondSlice.actions;
export default vagabondSlice.reducer;
