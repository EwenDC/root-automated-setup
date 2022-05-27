import { createSlice } from "@reduxjs/toolkit";
import { setupInitialState, toggleComponent } from "./utils";
import { expansionReducers } from "./expansionSlice";
import { ExpansionComponent } from "../types";

export const deckSlice = createSlice({
  name: "deck",
  initialState: setupInitialState<ExpansionComponent>("decks"),
  reducers: {
    toggleDeck: toggleComponent,
  },
  extraReducers: expansionReducers("decks"),
});

export const { toggleDeck } = deckSlice.actions;
export default deckSlice.reducer;
