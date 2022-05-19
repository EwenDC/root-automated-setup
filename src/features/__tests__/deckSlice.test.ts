import { deckReducer, disableExpansion, enableExpansion, toggleDeck } from "..";
import { ComponentState, ExpansionComponent } from "../../types";

const initialState: ComponentState<ExpansionComponent> = {
  testDeck: {
    enabled: true,
    expansionCode: "dummyBase",
    image: "cards/testDeck.png",
  },
};

describe("Deck Reducer", () => {
  it("Should load initial state from content.json", () => {
    expect(deckReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("Should handle toggle deck action", () => {
    let state = initialState;
    state.testDeck.enabled = true;

    state = deckReducer(state, toggleDeck("testDeck"));
    expect(state.testDeck.enabled).toEqual(false);

    state = deckReducer(state, toggleDeck("testDeck"));
    expect(state.testDeck.enabled).toEqual(true);
  });

  it("Should handle enable deck action", () => {
    let state = initialState;
    state.testDeck.enabled = false;

    state = deckReducer(state, toggleDeck("testDeck", true));
    expect(state.testDeck.enabled).toEqual(true);

    state = deckReducer(state, toggleDeck("testDeck", true));
    expect(state.testDeck.enabled).toEqual(true);
  });

  it("Should handle disable deck action", () => {
    let state = initialState;
    state.testDeck.enabled = true;

    state = deckReducer(state, toggleDeck("testDeck", false));
    expect(state.testDeck.enabled).toEqual(false);

    state = deckReducer(state, toggleDeck("testDeck", false));
    expect(state.testDeck.enabled).toEqual(false);
  });

  it("Should update state when expansions are enabled or disabled", () => {
    let state = initialState;

    state = deckReducer(state, enableExpansion("dummyExpansion"));
    expect(state).toEqual({
      ...initialState,
      testDeckExpansion: {
        enabled: true,
        expansionCode: "dummyExpansion",
        image: "cards/testDeckExpansion.png",
      },
    });

    state = deckReducer(state, disableExpansion("dummyExpansion"));
    expect(state).toEqual(initialState);
  });

  it("Should not update state when base expansion is disabled", () => {
    let state = initialState;
    state = deckReducer(state, disableExpansion("dummyBase"));
    expect(state).toEqual(initialState);
  });
});
