import { createSlice } from "@reduxjs/toolkit";
import { setupInitialState, toggleComponent } from "./utils";
import { Hireling } from "../types";
import { expansionReducers } from "./expansionSlice";

export const hirelingSlice = createSlice({
  name: "hireling",
  initialState: setupInitialState<Hireling>("hirelings"),
  reducers: {
    toggleHireling: toggleComponent,
  },
  extraReducers: expansionReducers("hirelings"),
});

export const { toggleHireling } = hirelingSlice.actions;
export default hirelingSlice.reducer;
