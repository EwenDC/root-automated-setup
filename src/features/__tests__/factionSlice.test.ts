import {
  disableExpansion,
  enableExpansion,
  factionReducer,
  toggleFaction,
} from "..";
import { ComponentState, Faction } from "../../types";

const initialState: ComponentState<Faction> = {
  testFaction: {
    enabled: true,
    expansionCode: "dummyBase",
    key: "testFaction",
    image: "meeples/testFaction.png",
    militant: false,
    isVagabond: false,
    warriors: 10,
    buildings: 3,
    tokens: 10,
  },
  testFactionMilitant: {
    enabled: true,
    expansionCode: "dummyBase",
    key: "testFactionMilitant",
    image: "meeples/testFactionMilitant.png",
    militant: true,
    isVagabond: false,
    warriors: 25,
    buildings: 18,
    tokens: 9,
  },
  testFactionVagabond: {
    enabled: true,
    expansionCode: "dummyBase",
    key: "testFactionVagabond",
    image: "meeples/testFactionVagabond.png",
    militant: false,
    isVagabond: true,
    warriors: 1,
    buildings: 0,
    tokens: 0,
  },
};

describe("Faction Reducer", () => {
  it("Should load initial state from content.json", () => {
    expect(factionReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("Should handle toggle faction action", () => {
    let state = initialState;
    state.testFaction.enabled = true;

    state = factionReducer(state, toggleFaction("testFaction"));
    expect(state.testFaction.enabled).toEqual(false);

    state = factionReducer(state, toggleFaction("testFaction"));
    expect(state.testFaction.enabled).toEqual(true);
  });

  it("Should handle enable deck action", () => {
    let state = initialState;
    state.testFaction.enabled = false;

    state = factionReducer(state, toggleFaction("testFaction", true));
    expect(state.testFaction.enabled).toEqual(true);

    state = factionReducer(state, toggleFaction("testFaction", true));
    expect(state.testFaction.enabled).toEqual(true);
  });

  it("Should handle disable deck action", () => {
    let state = initialState;
    state.testFaction.enabled = true;

    state = factionReducer(state, toggleFaction("testFaction", false));
    expect(state.testFaction.enabled).toEqual(false);

    state = factionReducer(state, toggleFaction("testFaction", false));
    expect(state.testFaction.enabled).toEqual(false);
  });

  it("Should update state when expansions are enabled or disabled", () => {
    let state = initialState;

    state = factionReducer(state, enableExpansion("dummyExpansion"));
    expect(state).toEqual<ComponentState<Faction>>({
      ...initialState,
      testFactionExpansion: {
        enabled: true,
        expansionCode: "dummyExpansion",
        key: "testFactionExpansion",
        image: "meeples/testFactionExpansion.png",
        militant: true,
        isVagabond: false,
        warriors: 20,
        buildings: 7,
        tokens: 0,
      },
    });

    state = factionReducer(state, disableExpansion("dummyExpansion"));
    expect(state).toEqual(initialState);
  });

  it("Should not update state when base expansion is disabled", () => {
    let state = initialState;
    state = factionReducer(state, disableExpansion("dummyBase"));
    expect(state).toEqual(initialState);
  });
});
