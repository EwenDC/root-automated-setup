import {
  disableExpansion,
  enableExpansion,
  hirelingReducer,
  toggleHireling,
} from "..";
import { ComponentState, Hireling } from "../../types";

const initialState: ComponentState<Hireling> = {
  testHireling: {
    enabled: true,
    expansionCode: "dummyBase",
    image: "meeples/testHireling.png",
    factions: ["testFaction"],
    warriors: 12,
    components: 0,
  },
  testHirelingIndependant: {
    enabled: true,
    expansionCode: "dummyBase",
    image: "meeples/testHirelingIndependant.png",
    factions: [],
    warriors: 4,
    components: 1,
    componentName: "component.uprisingDie",
  },
};

describe("Hireling Reducer", () => {
  it("Should load initial state from content.json", () => {
    expect(hirelingReducer(undefined, { type: "@@INIT" })).toEqual(
      initialState
    );
  });

  it("Should handle toggle hireling action", () => {
    let state = initialState;
    state.testHireling.enabled = true;

    state = hirelingReducer(state, toggleHireling("testHireling"));
    expect(state.testHireling.enabled).toEqual(false);

    state = hirelingReducer(state, toggleHireling("testHireling"));
    expect(state.testHireling.enabled).toEqual(true);
  });

  it("Should handle enable hireling action", () => {
    let state = initialState;
    state.testHireling.enabled = false;

    state = hirelingReducer(state, toggleHireling("testHireling", true));
    expect(state.testHireling.enabled).toEqual(true);

    state = hirelingReducer(state, toggleHireling("testHireling", true));
    expect(state.testHireling.enabled).toEqual(true);
  });

  it("Should handle disable hireling action", () => {
    let state = initialState;
    state.testHireling.enabled = true;

    state = hirelingReducer(state, toggleHireling("testHireling", false));
    expect(state.testHireling.enabled).toEqual(false);

    state = hirelingReducer(state, toggleHireling("testHireling", false));
    expect(state.testHireling.enabled).toEqual(false);
  });

  it("Should update state when expansions are enabled or disabled", () => {
    let state = initialState;

    state = hirelingReducer(state, enableExpansion("dummyExpansion"));
    expect(state).toEqual<ComponentState<Hireling>>({
      ...initialState,
      testHirelingExpansion: {
        enabled: true,
        expansionCode: "dummyExpansion",
        image: "meeples/testHirelingExpansion.png",
        factions: ["testFactionExpansion"],
        warriors: 5,
        components: 0,
      },
    });

    state = hirelingReducer(state, disableExpansion("dummyExpansion"));
    expect(state).toEqual(initialState);
  });

  it("Should not update state when base expansion is disabled", () => {
    let state = initialState;
    state = hirelingReducer(state, disableExpansion("dummyBase"));
    expect(state).toEqual(initialState);
  });
});
