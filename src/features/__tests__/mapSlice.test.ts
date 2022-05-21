import { disableExpansion, enableExpansion, mapReducer, toggleMap } from "..";
import { ComponentState, MapComponent } from "../../types";

const initialState: ComponentState<MapComponent> = {
  testMap: {
    enabled: true,
    expansionCode: "dummyBase",
    printedSuits: true,
    image: "maps/testMap.png",
  },
  testMapLandmark: {
    enabled: true,
    expansionCode: "dummyBase",
    printedSuits: false,
    landmark: "testLandmark",
    image: "maps/testMapLandmark.png",
  },
};

describe("Map Reducer", () => {
  it("Should load initial state from content.json", () => {
    expect(mapReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("Should handle toggle map action", () => {
    let state = initialState;
    state.testMap.enabled = true;

    state = mapReducer(state, toggleMap("testMap"));
    expect(state.testMap.enabled).toEqual(false);

    state = mapReducer(state, toggleMap("testMap"));
    expect(state.testMap.enabled).toEqual(true);
  });

  it("Should handle enable map action", () => {
    let state = initialState;
    state.testMap.enabled = false;

    state = mapReducer(state, toggleMap("testMap", true));
    expect(state.testMap.enabled).toEqual(true);

    state = mapReducer(state, toggleMap("testMap", true));
    expect(state.testMap.enabled).toEqual(true);
  });

  it("Should handle disable map action", () => {
    let state = initialState;
    state.testMap.enabled = true;

    state = mapReducer(state, toggleMap("testMap", false));
    expect(state.testMap.enabled).toEqual(false);

    state = mapReducer(state, toggleMap("testMap", false));
    expect(state.testMap.enabled).toEqual(false);
  });

  it("Should update state when expansions are enabled or disabled", () => {
    let state = initialState;

    state = mapReducer(state, enableExpansion("dummyExpansion"));
    expect(state).toEqual<ComponentState<MapComponent>>({
      ...initialState,
      testMapExpansion: {
        enabled: true,
        expansionCode: "dummyExpansion",
        printedSuits: false,
        image: "maps/testMapExpansion.png",
      },
    });

    state = mapReducer(state, disableExpansion("dummyExpansion"));
    expect(state).toEqual(initialState);
  });

  it("Should not update state when base expansion is disabled", () => {
    let state = initialState;
    state = mapReducer(state, disableExpansion("dummyBase"));
    expect(state).toEqual(initialState);
  });
});
