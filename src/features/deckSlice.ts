import { createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  setupInitialState,
  toggleComponent,
} from "./utils";
import { ComponentState, ExpansionComponent } from "../types";
import { expansionReducers } from "./expansionSlice";

const addExpansionDecks = (
  state: ComponentState<ExpansionComponent>,
  expansionCode: string,
  expansion = getExpansionConfig(expansionCode)
) => {
  if (expansion != null && "decks" in expansion) {
    for (const [deckCode, deck] of Object.entries(expansion.decks)) {
      // Don't add to state if it already exists
      if (state[deckCode] == null) {
        state[deckCode] = {
          image: deck.image === "" ? undefined : deck.image,
          expansionCode: expansionCode,
          enabled: true,
        };
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `While enabling expansion "${expansionCode}", deck with duplicate code "${deckCode}" not added to state:`,
          deck
        );
      }
    }
  }
};

export const deckSlice = createSlice({
  name: "deck",
  initialState: () => setupInitialState(addExpansionDecks),
  reducers: {
    toggleDeck: toggleComponent,
  },
  extraReducers: (builder) => expansionReducers(builder, addExpansionDecks),
});

export const { toggleDeck } = deckSlice.actions;
export default deckSlice.reducer;
