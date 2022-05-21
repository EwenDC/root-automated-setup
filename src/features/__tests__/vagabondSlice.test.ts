import {
  disableExpansion,
  enableExpansion,
  toggleVagabond,
  vagabondReducer,
} from "..";
import { ComponentState, Vagabond } from "../../types";

const initialState: ComponentState<Vagabond> = {
  testVagabond: {
    enabled: true,
    expansionCode: "dummyBase",
    startingItems: ["boot", "torch", "tea", "sword"],
    image: "meeples/testVagabond.png",
  },
};

describe("Vagabond Reducer", () => {
  it("Should load initial state from content.json", () => {
    expect(vagabondReducer(undefined, { type: "@@INIT" })).toEqual(
      initialState
    );
  });

  it("Should handle toggle vagabond action", () => {
    let state = initialState;
    state.testVagabond.enabled = true;

    state = vagabondReducer(state, toggleVagabond("testVagabond"));
    expect(state.testVagabond.enabled).toEqual(false);

    state = vagabondReducer(state, toggleVagabond("testVagabond"));
    expect(state.testVagabond.enabled).toEqual(true);
  });

  it("Should handle enable vagabond action", () => {
    let state = initialState;
    state.testVagabond.enabled = false;

    state = vagabondReducer(state, toggleVagabond("testVagabond", true));
    expect(state.testVagabond.enabled).toEqual(true);

    state = vagabondReducer(state, toggleVagabond("testVagabond", true));
    expect(state.testVagabond.enabled).toEqual(true);
  });

  it("Should handle disable vagabond action", () => {
    let state = initialState;
    state.testVagabond.enabled = true;

    state = vagabondReducer(state, toggleVagabond("testVagabond", false));
    expect(state.testVagabond.enabled).toEqual(false);

    state = vagabondReducer(state, toggleVagabond("testVagabond", false));
    expect(state.testVagabond.enabled).toEqual(false);
  });

  it("Should update state when expansions are enabled or disabled", () => {
    let state = initialState;

    state = vagabondReducer(state, enableExpansion("dummyExpansion"));
    expect(state).toEqual<ComponentState<Vagabond>>({
      ...initialState,
      testVagabondExpansion: {
        enabled: true,
        expansionCode: "dummyExpansion",
        startingItems: ["boot", "torch", "bag", "hammer"],
        image: "meeples/testVagabondExpansion.png",
      },
    });

    state = vagabondReducer(state, disableExpansion("dummyExpansion"));
    expect(state).toEqual(initialState);
  });

  it("Should not update state when base expansion is disabled", () => {
    let state = initialState;
    state = vagabondReducer(state, disableExpansion("dummyBase"));
    expect(state).toEqual(initialState);
  });
});
