import {
  disableExpansion,
  enableExpansion,
  landmarkReducer,
  toggleLandmark,
} from "..";
import { ComponentState, Landmark } from "../../types";

const initialState: ComponentState<Landmark> = {
  testLandmark: {
    enabled: true,
    expansionCode: "dummyBase",
    image: "landmarks/testLandmark.png",
    minPlayers: 0,
  },
  testLandmarkMinPlayers: {
    enabled: true,
    expansionCode: "dummyBase",
    image: "landmarks/testLandmarkMinPlayers.png",
    minPlayers: 3,
  },
};

describe("Landmark Reducer", () => {
  it("Should load initial state from content.json", () => {
    expect(landmarkReducer(undefined, { type: "@@INIT" })).toEqual(
      initialState
    );
  });

  it("Should handle toggle landmark action", () => {
    let state = initialState;
    state.testLandmark.enabled = true;

    state = landmarkReducer(state, toggleLandmark("testLandmark"));
    expect(state.testLandmark.enabled).toEqual(false);

    state = landmarkReducer(state, toggleLandmark("testLandmark"));
    expect(state.testLandmark.enabled).toEqual(true);
  });

  it("Should handle enable landmark action", () => {
    let state = initialState;
    state.testLandmark.enabled = false;

    state = landmarkReducer(state, toggleLandmark("testLandmark", true));
    expect(state.testLandmark.enabled).toEqual(true);

    state = landmarkReducer(state, toggleLandmark("testLandmark", true));
    expect(state.testLandmark.enabled).toEqual(true);
  });

  it("Should handle disable landmark action", () => {
    let state = initialState;
    state.testLandmark.enabled = true;

    state = landmarkReducer(state, toggleLandmark("testLandmark", false));
    expect(state.testLandmark.enabled).toEqual(false);

    state = landmarkReducer(state, toggleLandmark("testLandmark", false));
    expect(state.testLandmark.enabled).toEqual(false);
  });

  it("Should update state when expansions are enabled or disabled", () => {
    let state = initialState;

    state = landmarkReducer(state, enableExpansion("dummyExpansion"));
    expect(state).toEqual<ComponentState<Landmark>>({
      ...initialState,
      testLandmarkExpansion: {
        enabled: true,
        expansionCode: "dummyExpansion",
        image: "landmarks/testLandmarkExpansion.png",
        minPlayers: 0,
      },
    });

    state = landmarkReducer(state, disableExpansion("dummyExpansion"));
    expect(state).toEqual(initialState);
  });

  it("Should not update state when base expansion is disabled", () => {
    let state = initialState;
    state = landmarkReducer(state, disableExpansion("dummyBase"));
    expect(state).toEqual(initialState);
  });
});
