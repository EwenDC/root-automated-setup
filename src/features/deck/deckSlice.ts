import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../../components/content.json";
import { RootState } from "../../components/store";
import { expansionEnabled, getExpansionConfig } from "../../util";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "../expansion/expansionSlice";

export interface Deck {
  name: string;
  expansionCode: string;
  enabled: boolean;
}

export interface DeckState {
  [code: string]: Deck;
}

const addExpansionDecks = (state: DeckState, expansionCode: string) => {
  const expansion = getExpansionConfig(expansionCode);

  if (expansion != null && "decks" in expansion)
    for (const [deckCode, deck] of Object.entries(expansion.decks)) {
      // Don't add to state if it already exists
      if (state[deckCode] == null) {
        state[deckCode] = {
          name: deck.name,
          expansionCode: expansionCode,
          enabled: true,
        };
      } else {
        console.warn(
          `Deck with duplicate code "${deckCode}" not added to state:`,
          deck
        );
      }
    }
};

let initialState: DeckState = {};
for (const [expansionCode, expansion] of Object.entries(content)) {
  if (expansionEnabled(expansionCode, expansion.base)) {
    addExpansionDecks(initialState, expansionCode);
  }
}

/** Redux Selector for returning the deck list as an array, moving the object key to the object field "code" */
export const selectDeckArray = createSelector(
  (state: RootState) => state.deck,
  (stateSlice) => {
    const array = [];
    for (const [code, object] of Object.entries(stateSlice)) {
      array.push({ ...object, code });
    }
    return array;
  }
);

/** Redux Selector for returning an array of enabled decks */
export const selectEnabledDecks = createSelector(selectDeckArray, (array) =>
  array.filter((value) => value.enabled)
);

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    enableDeck: (state, action: PayloadAction<string>) => {
      // Retreive the deck
      const deck = state[action.payload];
      // Only update the deck state if it exists
      if (deck != null) {
        deck.enabled = true;
      }
    },
    disableDeck: (state, action: PayloadAction<string>) => {
      // Retreive the deck
      const deck = state[action.payload];
      // Only update the deck state if it exists
      if (deck != null) {
        deck.enabled = false;
      }
    },
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) => {
      addExpansionDecks(state, action.payload);
    },
    [disableExpansionAction]: (state, action: PayloadAction<string>) => {
      // Skip processing for the base game, as that cannot be disabled
      if (!getExpansionConfig(action.payload)?.base) {
        // Remove all decks matching the disabled expansion
        for (const [deckCode, deck] of Object.entries(state)) {
          if (deck.expansionCode === action.payload) {
            delete state[deckCode];
          }
        }
      }
    },
  },
});

export const { enableDeck, disableDeck } = deckSlice.actions;
export default deckSlice.reducer;
