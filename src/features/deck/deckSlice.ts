import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Component,
  ComponentState,
  deleteExpansionComponents,
  disableComponent,
  enableComponent,
  getExpansionConfig,
  selectComponentArray,
  setupInitialState,
} from "../../util";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "../expansion/expansionSlice";

export interface Deck extends Component {
  name: string;
}

const addExpansionDecks = (
  state: ComponentState<Deck>,
  expansionCode: string,
  expansion = getExpansionConfig(expansionCode)
) => {
  if (expansion != null && "decks" in expansion) {
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
          `While enabling expansion "${expansionCode}", deck with duplicate code "${deckCode}" not added to state:`,
          deck
        );
      }
    }
  }
};

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
    enableDeck: enableComponent,
    disableDeck: disableComponent,
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) =>
      addExpansionDecks(state, action.payload),
    [disableExpansionAction]: deleteExpansionComponents,
  },
});

export const { enableDeck, disableDeck } = deckSlice.actions;
export default deckSlice.reducer;
