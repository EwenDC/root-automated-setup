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
      },
      winter: {
        image: winterMap,
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
        landmark: "ferry",
        image: lakeMap,
      },
      mountain: {
        landmark: "tower",
        image: mountainMap,
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
