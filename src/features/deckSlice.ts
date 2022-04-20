import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  selectComponentArray,
  setupInitialState,
  toggleComponent,
} from "./reduxUtils";
import { RootState } from "../components/store";
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
      } else {
        console.warn(
          `While enabling expansion "${expansionCode}", deck with duplicate code "${deckCode}" not added to state:`,
          deck
        );
      }
    }
  }
};

/** Redux Selector for returning a specified Deck from state */
export const selectDeck = (state: RootState, code: string) => state.deck[code];

/** Redux Selector for returning the deck list as an array, moving the object key to the object field "code" */
export const selectDeckArray = selectComponentArray((state) => state.deck);

/** Redux Selector for returning an array of enabled decks */
export const selectEnabledDecks = createSelector(selectDeckArray, (array) =>
  array.filter((value) => value.enabled)
);

export const deckSlice = createSlice({
  name: "deck",
  initialState: setupInitialState(addExpansionDecks),
  reducers: {
    toggleDeck: toggleComponent,
  },
  extraReducers: (builder) => expansionReducers(builder, addExpansionDecks),
});

export const { toggleDeck } = deckSlice.actions;
export default deckSlice.reducer;
