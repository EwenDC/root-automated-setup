import { disableExpansion, enableExpansion, expansionReducer } from "..";
import { ComponentState, Expansion } from "../../types";

const initialState: ComponentState<Expansion> = {
  dummyBase: {
    base: true,
    image: "boxes/dummyBase.png",
    enabled: true,
  },
  dummyExpansion: {
    base: false,
    image: "boxes/dummyExpansion.png",
    enabled: false,
  },
};

const isTrue = "1";
const isFalse = "0";

describe("Expansion Reducer", () => {
  it("Should load initial state from content.json", () => {
    expect(expansionReducer(undefined, { type: "@@INIT" })).toEqual(
      initialState
    );
  });

  it("Should load enabled expansions from localstorage", () => {
    const getItem = jest
      .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
      .mockImplementation(() => isTrue);

    let expectedState = initialState;
    expectedState.dummyExpansion.enabled = true;

    expect(expansionReducer(undefined, { type: "@@INIT" })).toEqual(
      expectedState
    );
    expect(getItem).toBeCalledWith("dummyExpansion");
  });

  it("Should handle enable expansion action", () => {
    const setItem = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      "setItem"
    );
    let state = initialState;
    state.dummyExpansion.enabled = false;

    state = expansionReducer(state, enableExpansion("dummyExpansion"));
    expect(state.dummyExpansion.enabled).toEqual(true);
    expect(setItem).toBeCalledWith("dummyExpansion", isTrue);

    state = expansionReducer(state, enableExpansion("dummyExpansion"));
    expect(state.dummyExpansion.enabled).toEqual(true);
    expect(setItem).toBeCalledWith("dummyExpansion", isTrue);
  });

  it("Should handle disable expansion action", () => {
    const setItem = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      "setItem"
    );
    let state = initialState;
    state.dummyExpansion.enabled = true;

    state = expansionReducer(state, disableExpansion("dummyExpansion"));
    expect(state.dummyExpansion.enabled).toEqual(false);
    expect(setItem).toBeCalledWith("dummyExpansion", isFalse);

    state = expansionReducer(state, disableExpansion("dummyExpansion"));
    expect(state.dummyExpansion.enabled).toEqual(false);
    expect(setItem).toBeCalledWith("dummyExpansion", isFalse);
  });
});
