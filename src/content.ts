import { Expansion } from "./types";

// Box Images
import exilesDeckBox from "./images/boxes/exilesDeck.png";
import landmarkPackBox from "./images/boxes/landmarkPack.png";
import marauderBox from "./images/boxes/marauder.png";
import marauderHirelingsBox from "./images/boxes/marauderHirelings.png";
import riverfolkBox from "./images/boxes/riverfolk.png";
import riverfolkHirelingsBox from "./images/boxes/riverfolkHirelings.png";
import rootBox from "./images/boxes/root.png";
import underworldBox from "./images/boxes/underworld.png";
import underworldHirelingsBox from "./images/boxes/underworldHirelings.png";
import vagabondPackBox from "./images/boxes/vagabondPack.png";

// Building Images
import baseBuildings from "./images/buildings/bases.png";
import duchyBuildings from "./images/buildings/duchy.png";
import gardenBuildings from "./images/buildings/gardens.png";
import marquiseBuildings from "./images/buildings/marquise.png";
import roostBuilding from "./images/buildings/roost.png";
import strongholdBuilding from "./images/buildings/stronghold.png";
import waystationBuildings from "./images/buildings/waystations.png";

// Card Images
import exilesCard from "./images/cards/exiles.png";
import standardCard from "./images/cards/standard.png";

// Landmark Images
import cityLandmark from "./images/landmarks/city.png";
import ferryLandmark from "./images/landmarks/ferry.png";
import forgeLandmark from "./images/landmarks/forge.png";
import marketLandmark from "./images/landmarks/market.png";
import towerLandmark from "./images/landmarks/tower.png";
import treetopLandmark from "./images/landmarks/treetop.png";

// Map Images
import autumnMap from "./images/maps/autumn.png";
import lakeMap from "./images/maps/lake.png";
import mountainMap from "./images/maps/mountain.png";
import winterMap from "./images/maps/winter.png";

// Meeple Images
import adventurerMeeple from "./images/meeples/adventurer.png";
import allianceMeeple from "./images/meeples/alliance.png";
import arbiterMeeple from "./images/meeples/arbiter.png";
import bandMeeple from "./images/meeples/band.png";
import banditsMeeple from "./images/meeples/bandits.png";
import corvidMeeple from "./images/meeples/corvid.png";
import cultMeeple from "./images/meeples/cult.png";
import duchyMeeple from "./images/meeples/duchy.png";
import dynastyMeeple from "./images/meeples/dynasty.png";
import exileMeeple from "./images/meeples/exile.png";
import expeditionMeeple from "./images/meeples/expedition.png";
import eyrieMeeple from "./images/meeples/eyrie.png";
import flamebearersMeeple from "./images/meeples/flamebearers.png";
import flotillaMeeple from "./images/meeples/flotilla.png";
import harrierMeeple from "./images/meeples/harrier.png";
import keepersMeeple from "./images/meeples/keepers.png";
import marquiseMeeple from "./images/meeples/marquise.png";
import patrolMeeple from "./images/meeples/patrol.png";
import prophetsMeeple from "./images/meeples/prophets.png";
import protectorMeeple from "./images/meeples/protector.png";
import rangerMeeple from "./images/meeples/ranger.png";
import roninMeeple from "./images/meeples/ronin.png";
import riverfolkMeeple from "./images/meeples/riverfolk.png";
import scoundrelMeeple from "./images/meeples/scoundrel.png";
import spiesMeeple from "./images/meeples/spies.png";
import thiefMeeple from "./images/meeples/thief.png";
import tinkerMeeple from "./images/meeples/tinker.png";
import uprisingMeeple from "./images/meeples/uprising.png";
import vagrantMeeple from "./images/meeples/vagrant.png";
import vaultkeepersMeeple from "./images/meeples/vaultkeepers.png";
import warlordMeeple from "./images/meeples/warlord.png";

// Path Images
import autumnPaths from "./images/paths/autumn.png";
import lakePaths from "./images/paths/lake.png";
import mountainPaths from "./images/paths/mountain.png";
import winterPaths from "./images/paths/winter.png";

// Token Images
import marquiseTokens from "./images/tokens/marquise.png";
import mobToken from "./images/tokens/mob.png";
import plotToken from "./images/tokens/plot.png";
import relicTokens from "./images/tokens/relics.png";
import sympathyToken from "./images/tokens/sympathy.png";
import tradePostTokens from "./images/tokens/tradePosts.png";
import tunnelToken from "./images/tokens/tunnel.png";

const content: Record<string, Expansion> = {
  root: {
    base: true,
    image: rootBox,
    decks: {
      standard: {
        image: standardCard,
      },
    },
    factions: {
      marquise: {
        key: "marquise",
        image: marquiseMeeple,
        militant: true,
        isVagabond: false,
        warriors: 25,
        buildings: 18,
        buildingImage: marquiseBuildings,
        tokens: 9,
        tokenImage: marquiseTokens,
        complexity: 0,
        wealth: 1,
        aggression: 1,
        crafting: 1,
      },
      eyrie: {
        key: "eyrie",
        image: eyrieMeeple,
        militant: true,
        isVagabond: false,
        warriors: 20,
        buildings: 7,
        buildingImage: roostBuilding,
        tokens: 0,
        complexity: 0,
        wealth: 0,
        aggression: 2,
        crafting: 1,
      },
      alliance: {
        key: "alliance",
        image: allianceMeeple,
        militant: false,
        isVagabond: false,
        warriors: 10,
        buildings: 3,
        buildingImage: baseBuildings,
        tokens: 10,
        tokenImage: sympathyToken,
        complexity: 2,
        wealth: 1,
        aggression: 1,
        crafting: 2,
      },
      vagabond: {
        key: "vagabond",
        image: thiefMeeple,
        militant: false,
        isVagabond: true,
        warriors: 1,
        buildings: 0,
        tokens: 0,
        complexity: 1,
        wealth: 1,
        aggression: 1,
        crafting: 0,
      },
    },
    maps: {
      autumn: {
        image: autumnMap,
        clearings: [
          { no: 1, x: 11.75, y: 14.25 },
          { no: 5, x: 59.45, y: 14.25 },
          { no: 10, x: 42.75, y: 28.75 },
          { no: 2, x: 87.1, y: 28.2 },
          { no: 9, x: 12.1, y: 39.7 },
          { no: 12, x: 35.83, y: 59.55 },
          { no: 11, x: 66.6, y: 51.2 },
          { no: 6, x: 89.6, y: 53.6 },
          { no: 4, x: 12.1, y: 80.7 },
          { no: 8, x: 39.67, y: 89.46 },
          { no: 7, x: 63.3, y: 79.1 },
          { no: 3, x: 88.05, y: 88.4 },
        ],
        paths: [
          [1, 5],
          [1, 9],
          [1, 10],
          [2, 5],
          [2, 6],
          [2, 10],
          [3, 6],
          [3, 7],
          [3, 11],
          [4, 8],
          [4, 9],
          [4, 12],
          [6, 11],
          [7, 8],
          [7, 12],
          [9, 12],
          [10, 12],
          [11, 12],
        ],
        backImage: autumnPaths,
        printedSuits: true,
        defaultSuits: {
          1: "fox",
          5: "rabbit",
          10: "rabbit",
          2: "mouse",
          9: "mouse",
          12: "fox",
          11: "mouse",
          6: "fox",
          4: "rabbit",
          8: "fox",
          7: "mouse",
          3: "rabbit",
        },
      },
      winter: {
        image: winterMap,
        clearings: [
          { no: 1, x: 10.85, y: 11.3 },
          { no: 5, x: 38.6, y: 13.5 },
          { no: 6, x: 62.75, y: 18.6 },
          { no: 2, x: 90.35, y: 11.55 },
          { no: 10, x: 9.1, y: 46.3 },
          { no: 11, x: 40.35, y: 47.75 },
          { no: 12, x: 67.3, y: 49.3 },
          { no: 7, x: 90.95, y: 51.8 },
          { no: 4, x: 11.15, y: 79.7 },
          { no: 9, x: 39.55, y: 88.7 },
          { no: 8, x: 63.85, y: 78 },
          { no: 3, x: 89.3, y: 87.65 },
        ],
        paths: [
          [1, 5],
          [1, 10],
          [1, 11],
          [2, 6],
          [2, 7],
          [2, 12],
          [3, 7],
          [3, 8],
          [3, 12],
          [4, 9],
          [4, 10],
          [4, 11],
          [5, 6],
          [8, 9],
          [8, 12],
          [9, 11],
        ],
        backImage: winterPaths,
        printedSuits: false,
      },
    },
    vagabonds: {
      thief: {
        startingItems: ["boot", "torch", "tea", "sword"],
        image: thiefMeeple,
      },
      tinker: {
        startingItems: ["boot", "torch", "bag", "hammer"],
        image: tinkerMeeple,
      },
      ranger: {
        startingItems: ["boot", "torch", "crossbow", "sword"],
        image: rangerMeeple,
      },
    },
  },
  riverfolk: {
    base: false,
    image: riverfolkBox,
    factions: {
      cult: {
        key: "cult",
        image: cultMeeple,
        militant: false,
        isVagabond: false,
        warriors: 25,
        buildings: 15,
        buildingImage: gardenBuildings,
        tokens: 0,
        complexity: 2,
        wealth: 2,
        aggression: 1,
        crafting: 2,
      },
      riverfolk: {
        key: "riverfolk",
        image: riverfolkMeeple,
        militant: false,
        isVagabond: false,
        warriors: 15,
        buildings: 0,
        tokens: 9,
        tokenImage: tradePostTokens,
        complexity: 2,
        wealth: 2,
        aggression: 0,
        crafting: 1,
      },
      vagabond2: {
        key: "vagabond",
        image: roninMeeple,
        militant: false,
        isVagabond: true,
        warriors: 1,
        buildings: 0,
        tokens: 0,
        complexity: 1,
        wealth: 1,
        aggression: 1,
        crafting: 0,
      },
    },
    vagabonds: {
      vagrant: {
        startingItems: ["coin", "torch", "boot"],
        image: vagrantMeeple,
      },
      arbiter: {
        startingItems: ["boot", "torch", "sword", "sword"],
        image: arbiterMeeple,
      },
      scoundrel: {
        startingItems: ["boot", "boot", "torch", "crossbow"],
        image: scoundrelMeeple,
      },
    },
  },
  underworld: {
    base: false,
    image: underworldBox,
    factions: {
      duchy: {
        key: "duchy",
        image: duchyMeeple,
        militant: true,
        isVagabond: false,
        warriors: 20,
        buildings: 6,
        buildingImage: duchyBuildings,
        tokens: 3,
        tokenImage: tunnelToken,
        complexity: 1,
        wealth: 2,
        aggression: 1,
        crafting: 1,
      },
      corvid: {
        key: "corvid",
        image: corvidMeeple,
        militant: false,
        isVagabond: false,
        warriors: 15,
        buildings: 0,
        tokens: 8,
        tokenImage: plotToken,
        complexity: 0,
        wealth: 1,
        aggression: 1,
        crafting: 2,
      },
    },
    landmarks: {
      tower: {
        image: towerLandmark,
        minPlayers: 0,
      },
      ferry: {
        image: ferryLandmark,
        minPlayers: 0,
      },
    },
    maps: {
      lake: {
        image: lakeMap,
        clearings: [
          { no: 2, x: 11.2, y: 11.65 },
          { no: 7, x: 43.15, y: 13.85 },
          { no: 6, x: 67.1, y: 18.9 },
          { no: 4, x: 90.15, y: 11.9 },
          { no: 8, x: 9.5, y: 46.4 },
          { no: 10, x: 36.75, y: 40.95 },
          { no: 11, x: 67.25, y: 49.4 },
          { no: 5, x: 90.7, y: 51.85 },
          { no: 12, x: 40.6, y: 69.65 },
          { no: 3, x: 11.5, y: 79.6 },
          { no: 9, x: 58.5, y: 88.45 },
          { no: 1, x: 86.7, y: 83.55 },
        ],
        paths: [
          [1, 5],
          [1, 9],
          [2, 7],
          [2, 8],
          [2, 10],
          [3, 8],
          [3, 9],
          [3, 12],
          [4, 5],
          [4, 6],
          [5, 11],
          [6, 7],
          [6, 11],
          [7, 10],
          [7, 11],
          [8, 10],
          [9, 12],
        ],
        backImage: lakePaths,
        printedSuits: false,
        landmark: {
          code: "ferry",
          clearing: 1,
          x: 71.5,
          y: 67.5,
          angle: 42,
        },
        defaultSuits: {
          2: "fox",
          7: "mouse",
          6: "fox",
          4: "rabbit",
          8: "rabbit",
          10: "mouse",
          11: "rabbit",
          5: "mouse",
          12: "rabbit",
          3: "mouse",
          9: "fox",
          1: "fox",
        },
      },
      mountain: {
        image: mountainMap,
        clearings: [
          { no: 1, x: 11.5, y: 12.2 },
          { no: 5, x: 58.8, y: 14.65 },
          { no: 2, x: 89.8, y: 12.45 },
          { no: 8, x: 9.8, y: 46.65 },
          { no: 9, x: 33.3, y: 37.7 },
          { no: 10, x: 53.25, y: 41.15 },
          { no: 12, x: 34.75, y: 60.75 },
          { no: 11, x: 64.1, y: 61.47 },
          { no: 6, x: 90.37, y: 52.07 },
          { no: 4, x: 11.82, y: 79.57 },
          { no: 7, x: 48.95, y: 87.5 },
          { no: 3, x: 88.77, y: 87.4 },
        ],
        paths: [
          [1, 8],
          [1, 9],
          [2, 5],
          [2, 6],
          [2, 11],
          [3, 6],
          [3, 7],
          [3, 11],
          [4, 8],
          [4, 12],
          [5, 9],
          [5, 10],
          [5, 11],
          [6, 11],
          [7, 12],
          [8, 9],
          [9, 10],
          [9, 12],
          [10, 11],
          [10, 12],
          [11, 12],
        ],
        backImage: mountainPaths,
        printedSuits: false,
        landmark: {
          code: "tower",
          clearing: 10,
          x: 43,
          y: 36,
        },
        defaultSuits: {
          1: "fox",
          5: "mouse",
          2: "rabbit",
          8: "rabbit",
          9: "rabbit",
          10: "fox",
          12: "fox",
          11: "mouse",
          6: "mouse",
          4: "mouse",
          7: "rabbit",
          3: "fox",
        },
      },
    },
  },
  marauder: {
    base: false,
    image: marauderBox,
    factions: {
      warlord: {
        key: "warlord",
        image: warlordMeeple,
        militant: true,
        isVagabond: false,
        warriors: 21,
        buildings: 6,
        buildingImage: strongholdBuilding,
        tokens: 5,
        tokenImage: mobToken,
        complexity: 1,
        wealth: 0,
        aggression: 2,
        crafting: 0,
      },
      keepers: {
        key: "keepers",
        image: keepersMeeple,
        militant: true,
        isVagabond: false,
        warriors: 15,
        buildings: 3,
        buildingImage: waystationBuildings,
        tokens: 12,
        tokenImage: relicTokens,
        complexity: 2,
        wealth: 2,
        aggression: 1,
        crafting: 1,
      },
    },
    hirelings: {
      patrol: {
        image: patrolMeeple,
        factions: ["marquise"],
      },
      dynasty: {
        image: dynastyMeeple,
        factions: ["eyrie"],
      },
      uprising: {
        image: uprisingMeeple,
        factions: ["alliance"],
      },
      exile: {
        image: exileMeeple,
        factions: ["vagabond", "vagabond2"],
      },
    },
  },
  exilesDeck: {
    base: false,
    image: exilesDeckBox,
    decks: {
      exiles: {
        image: exilesCard,
      },
    },
  },
  landmarkPack: {
    base: false,
    image: landmarkPackBox,
    landmarks: {
      treetop: {
        image: treetopLandmark,
        minPlayers: 3,
      },
      city: {
        image: cityLandmark,
        minPlayers: 0,
      },
      market: {
        image: marketLandmark,
        minPlayers: 0,
      },
      forge: {
        image: forgeLandmark,
        minPlayers: 0,
      },
    },
  },
  vagabondPack: {
    base: false,
    image: vagabondPackBox,
    vagabonds: {
      adventurer: {
        startingItems: ["boot", "torch", "hammer"],
        image: adventurerMeeple,
      },
      ronin: {
        startingItems: ["boot", "boot", "torch", "sword"],
        image: roninMeeple,
      },
      harrier: {
        startingItems: ["coin", "torch", "sword", "crossbow"],
        image: harrierMeeple,
      },
    },
  },
  riverfolkHirelings: {
    base: false,
    image: riverfolkHirelingsBox,
    hirelings: {
      prophets: {
        image: prophetsMeeple,
        factions: ["cult"],
      },
      flotilla: {
        image: flotillaMeeple,
        factions: ["riverfolk"],
      },
      bandits: {
        image: banditsMeeple,
        factions: [],
      },
    },
  },
  underworldHirelings: {
    base: false,
    image: underworldHirelingsBox,
    hirelings: {
      expedition: {
        image: expeditionMeeple,
        factions: ["duchy"],
      },
      spies: {
        image: spiesMeeple,
        factions: ["corvid"],
      },
      protector: {
        image: protectorMeeple,
        factions: [],
      },
    },
  },
  marauderHirelings: {
    base: false,
    image: marauderHirelingsBox,
    hirelings: {
      flamebearers: {
        image: flamebearersMeeple,
        factions: ["warlord"],
      },
      vaultkeepers: {
        image: vaultkeepersMeeple,
        factions: ["keepers"],
      },
      band: {
        image: bandMeeple,
        factions: [],
      },
    },
  },
};

export default Object.freeze(content);
