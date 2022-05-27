import { createSlice } from "@reduxjs/toolkit";
import { setupInitialState, toggleComponent } from "./utils";
import { expansionReducers } from "./expansionSlice";
import { MapComponent } from "../types";

export const mapSlice = createSlice({
  name: "map",
  initialState: setupInitialState<MapComponent>("maps"),
  reducers: {
    toggleMap: toggleComponent,
  },
  extraReducers: expansionReducers("maps"),
});

export const { toggleMap } = mapSlice.actions;
export default mapSlice.reducer;
