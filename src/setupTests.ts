// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

jest.mock(
  "./content.json",
  () => ({
    dummyBase: {
      base: true,
      image: "boxes/dummyBase.png",
      decks: {
        testDeck: {
          image: "cards/testDeck.png",
        },
      },
      factions: {
        testFaction: {
          key: "testFaction",
          image: "meeples/testFaction.png",
          militant: false,
          isVagabond: false,
          warriors: 10,
          buildings: 3,
          tokens: 10,
        },
        testFactionMilitant: {
          key: "testFactionMilitant",
          image: "meeples/testFactionMilitant.png",
          militant: true,
          isVagabond: false,
          warriors: 25,
          buildings: 18,
          tokens: 9,
        },
        testFactionVagabond: {
          key: "testFactionVagabond",
          image: "meeples/testFactionVagabond.png",
          militant: false,
          isVagabond: true,
          warriors: 1,
          buildings: 0,
          tokens: 0,
        },
      },
      hirelings: {
        testHireling: {
          image: "meeples/testHireling.png",
          factions: ["testFaction"],
          warriors: 12,
          components: 0,
          componentName: "",
        },
        testHirelingIndependant: {
          image: "meeples/testHirelingIndependant.png",
          factions: [],
          warriors: 4,
          components: 1,
          componentName: "component.uprisingDie",
        },
      },
      landmarks: {
        testLandmark: {
          image: "landmarks/testLandmark.png",
          minPlayers: 0,
        },
        testLandmarkMinPlayers: {
          image: "landmarks/testLandmarkMinPlayers.png",
          minPlayers: 3,
        },
      },
      maps: {
        testMap: {
          printedSuits: true,
          landmark: "",
          image: "maps/testMap.png",
        },
        testMapLandmark: {
          printedSuits: false,
          landmark: "testLandmark",
          image: "maps/testMapLandmark.png",
        },
      },
      vagabonds: {
        testVagabond: {
          startingItems: ["boot", "torch", "tea", "sword"],
          image: "meeples/testVagabond.png",
        },
      },
    },
    dummyExpansion: {
      base: false,
      image: "boxes/dummyExpansion.png",
      decks: {
        testDeckExpansion: {
          image: "cards/testDeckExpansion.png",
        },
      },
      factions: {
        testFactionExpansion: {
          key: "testFactionExpansion",
          image: "meeples/testFactionExpansion.png",
          militant: true,
          isVagabond: false,
          warriors: 20,
          buildings: 7,
          tokens: 0,
        },
      },
      hirelings: {
        testHirelingExpansion: {
          image: "meeples/testHirelingExpansion.png",
          factions: ["testFactionExpansion"],
          warriors: 5,
          components: 0,
          componentName: "",
        },
      },
      landmarks: {
        testLandmarkExpansion: {
          image: "landmarks/testLandmarkExpansion.png",
          minPlayers: 0,
        },
      },
      maps: {
        testMapExpansion: {
          printedSuits: false,
          landmark: "",
          image: "maps/testMapExpansion.png",
        },
      },
      vagabonds: {
        testVagabondExpansion: {
          startingItems: ["boot", "torch", "bag", "hammer"],
          image: "meeples/testVagabondExpansion.png",
        },
      },
    },
  }),
  { virtual: true }
);
