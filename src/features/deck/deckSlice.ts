import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import content from "../../components/content.json";
import { RootState } from "../../components/store";
import {
  disableExpansionAction,
  enableExpansionAction,
  expansionEnabled,
} from "../expansion/expansionSlice";

export interface Deck {
  code: string;
  name: string;
  expansionCode: string;
  enabled: boolean;
  base: boolean;
}

export interface DeckState {
  decks: Deck[];
}

let initialState: DeckState = { decks: [] };
content.expansions.forEach((expansion) => {
  if (
    expansion.deck != null &&
    expansionEnabled(expansion.code, expansion.base)
  ) {
    initialState.decks.push({
      code: expansion.deck.code,
      name: expansion.deck.name,
      expansionCode: expansion.code,
      enabled: true,
      base: expansion.base,
    });
  }
});

export const selectDecks = (state: RootState) => state.deck.decks;

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    enableDeck: (state, action: PayloadAction<string>) => {
      // Since decks is an array we need to loop over it so we can match the code
      state.decks.forEach((value) => {
        if (value.code === action.payload) {
          value.enabled = true;
        }
      });
    },
    disableDeck: (state, action: PayloadAction<string>) => {
      // Since decks is an array we need to loop over it so we can match the code
      state.decks.forEach((value) => {
        if (value.code === action.payload) {
          value.enabled = false;
        }
      });
    },
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) => {
      // Add the deck (if it exists) from the enabled expansion to the deck list,
      // Unless it's the base game (so we don't duplicate the base deck)
      content.expansions.forEach((expansion) => {
        if (
          expansion.code === action.payload &&
          !expansion.base &&
          expansion.deck != null
        ) {
          state.decks.push({
            code: expansion.deck.code,
            name: expansion.deck.name,
            expansionCode: expansion.code,
            enabled: true,
            base: expansion.base,
          });
        }
      });
    },
    [disableExpansionAction]: (state, action: PayloadAction<string>) => {
      // Remove all decks matching the disabled expansion, unless they're flagged as the base deck
      state.decks = state.decks.filter(
        (value) => value.expansionCode !== action.payload || value.base
      );
    },
  },
});

export const { enableDeck, disableDeck } = deckSlice.actions;
export default deckSlice.reducer;
