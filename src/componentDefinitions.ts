import type { Expansion, ExpansionCode } from './types'

// Box Images
import exilesDeckBox from './images/boxes/exilesDeck.png'
import homelandBox from './images/boxes/homeland.png'
import homelandHirelingsBox from './images/boxes/homelandHirelings.png'
import landmarkPackBox from './images/boxes/landmarkPack.png'
import marauderBox from './images/boxes/marauder.png'
import marauderHirelingsBox from './images/boxes/marauderHirelings.png'
import placeholderBox from './images/boxes/placeholder.png'
import riverfolkBox from './images/boxes/riverfolk.png'
import riverfolkHirelingsBox from './images/boxes/riverfolkHirelings.png'
import rootBox from './images/boxes/root.png'
import squiresDeckBox from './images/boxes/squiresDeck.png'
import underworldBox from './images/boxes/underworld.png'
import underworldHirelingsBox from './images/boxes/underworldHirelings.png'
import vagabondPackBox from './images/boxes/vagabondPack.png'
// Building Images
import baseBuildings from './images/buildings/bases.png'
import duchyBuildings from './images/buildings/duchy.png'
import gardenBuildings from './images/buildings/gardens.png'
import marquiseBuildings from './images/buildings/marquise.png'
import roostBuilding from './images/buildings/roost.png'
import strongholdBuilding from './images/buildings/stronghold.png'
import waystationBuildings from './images/buildings/waystations.png'
// Card Images
import exilesCard from './images/cards/exiles.png'
import squiresCard from './images/cards/squires.png'
import standardCard from './images/cards/standard.png'
// Landmark Images
import cityLandmark from './images/landmarks/city.png'
import ferryLandmark from './images/landmarks/ferry.png'
import forgeLandmark from './images/landmarks/forge.png'
import foxburrowLandmark from './images/landmarks/foxburrow.png'
import marketLandmark from './images/landmarks/market.png'
import mouseholdLandmark from './images/landmarks/mousehold.png'
import rabbittownLandmark from './images/landmarks/rabbittown.png'
import towerLandmark from './images/landmarks/tower.png'
import treetopLandmark from './images/landmarks/treetop.png'
// Map Images
import autumnMap from './images/maps/autumn.png'
import gorgeMap from './images/maps/gorge.png'
import lakeMap from './images/maps/lake.png'
import marshMap from './images/maps/marsh.png'
import mountainMap from './images/maps/mountain.png'
import winterMap from './images/maps/winter.png'
// Meeple Images
import adventurerMeeple from './images/meeples/adventurer.png'
import advocatesMeeple from './images/meeples/advocates.png'
import allianceMeeple from './images/meeples/alliance.png'
import arbiterMeeple from './images/meeples/arbiter.png'
import bandMeeple from './images/meeples/band.png'
import banditsMeeple from './images/meeples/bandits.png'
import cheatMeeple from './images/meeples/cheat.png'
import corvidMeeple from './images/meeples/corvid.png'
import councilMeeple from './images/meeples/council.png'
import cultMeeple from './images/meeples/cult.png'
import diasporaMeeple from './images/meeples/diaspora.png'
import duchyMeeple from './images/meeples/duchy.png'
import dynastyMeeple from './images/meeples/dynasty.png'
import exileMeeple from './images/meeples/exile.png'
import expeditionMeeple from './images/meeples/expedition.png'
import eyrieMeeple from './images/meeples/eyrie.png'
import farmersMeeple from './images/meeples/farmers.png'
import flamebearersMeeple from './images/meeples/flamebearers.png'
import flotillaMeeple from './images/meeples/flotilla.png'
import gladiatorMeeple from './images/meeples/gladiator.png'
import harrierMeeple from './images/meeples/harrier.png'
import jailorMeeple from './images/meeples/jailor.png'
import keepersMeeple from './images/meeples/keepers.png'
import knavesMeeple from './images/meeples/knaves.png'
import marquiseMeeple from './images/meeples/marquise.png'
import patrolMeeple from './images/meeples/patrol.png'
import prophetsMeeple from './images/meeples/prophets.png'
import protectorMeeple from './images/meeples/protector.png'
import rangerMeeple from './images/meeples/ranger.png'
import riverfolkMeeple from './images/meeples/riverfolk.png'
import roamersMeeple from './images/meeples/roamers.png'
import roninMeeple from './images/meeples/ronin.png'
import scoundrelMeeple from './images/meeples/scoundrel.png'
import spiesMeeple from './images/meeples/spies.png'
import thiefMeeple from './images/meeples/thief.png'
import tinkerMeeple from './images/meeples/tinker.png'
import uprisingMeeple from './images/meeples/uprising.png'
import vagrantMeeple from './images/meeples/vagrant.png'
import vaultkeepersMeeple from './images/meeples/vaultkeepers.png'
import warlordMeeple from './images/meeples/warlord.png'
// Path Images
import autumnPaths from './images/paths/autumn.png'
import lakePaths from './images/paths/lake.png'
import mountainPaths from './images/paths/mountain.png'
import winterPaths from './images/paths/winter.png'
// Token Images
import acclaimToken from './images/tokens/acclaim.png'
import assemblyToken from './images/tokens/assembly.png'
import enclaveToken from './images/tokens/enclave.png'
import marquiseTokens from './images/tokens/marquise.png'
import mobToken from './images/tokens/mob.png'
import plotToken from './images/tokens/plot.png'
import relicTokens from './images/tokens/relics.png'
import sympathyToken from './images/tokens/sympathy.png'
import tradePostTokens from './images/tokens/tradePosts.png'
import tunnelToken from './images/tokens/tunnel.png'

const definitions: Record<ExpansionCode, Expansion> = {
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
        key: 'marquise',
        order: 1,
        cornerSetup: true,
        image: marquiseMeeple,
        militant: true,
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
        key: 'eyrie',
        order: 2,
        cornerSetup: true,
        image: eyrieMeeple,
        militant: true,
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
        key: 'alliance',
        order: 3,
        image: allianceMeeple,
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
        key: 'vagabond',
        order: 4,
        image: thiefMeeple,
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
          [0, 1],
          [0, 2],
          [0, 4],
          [1, 3],
          [2, 3],
          [2, 5],
          [3, 7],
          [4, 5],
          [4, 8],
          [5, 6],
          [5, 8],
          [5, 10],
          [6, 7],
          [6, 11],
          [7, 11],
          [8, 9],
          [9, 10],
          [10, 11],
        ],
        backImage: autumnPaths,
        printedSuits: true,
        defaultSuits: [
          'fox',
          'rabbit',
          'rabbit',
          'mouse',
          'mouse',
          'fox',
          'mouse',
          'fox',
          'rabbit',
          'fox',
          'mouse',
          'rabbit',
        ],
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
          [0, 1],
          [0, 4],
          [0, 5],
          [1, 2],
          [2, 3],
          [3, 6],
          [3, 7],
          [4, 8],
          [5, 8],
          [5, 9],
          [6, 10],
          [6, 11],
          [7, 11],
          [8, 9],
          [9, 10],
          [10, 11],
        ],
        backImage: winterPaths,
      },
    },
    vagabonds: {
      thief: {
        startingItems: ['boot', 'torch', 'tea', 'sword'],
        image: thiefMeeple,
      },
      tinker: {
        startingItems: ['boot', 'torch', 'bag', 'hammer'],
        image: tinkerMeeple,
      },
      ranger: {
        startingItems: ['boot', 'torch', 'crossbow', 'sword'],
        image: rangerMeeple,
      },
    },
  },
  riverfolk: {
    image: riverfolkBox,
    factions: {
      vagabond2: {
        key: 'vagabond',
        order: 5,
        image: roninMeeple,
        isVagabond: true,
        warriors: 1,
        buildings: 0,
        tokens: 0,
        complexity: 1,
        wealth: 1,
        aggression: 1,
        crafting: 0,
      },
      cult: {
        key: 'cult',
        order: 6,
        cornerSetup: true,
        image: cultMeeple,
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
        key: 'riverfolk',
        order: 7,
        image: riverfolkMeeple,
        warriors: 15,
        buildings: 0,
        tokens: 9,
        tokenImage: tradePostTokens,
        complexity: 2,
        wealth: 2,
        aggression: 0,
        crafting: 1,
      },
    },
    vagabonds: {
      vagrant: {
        startingItems: ['coin', 'torch', 'boot'],
        image: vagrantMeeple,
      },
      arbiter: {
        startingItems: ['boot', 'torch', 'sword', 'sword'],
        image: arbiterMeeple,
      },
      scoundrel: {
        startingItems: ['boot', 'boot', 'torch', 'crossbow'],
        image: scoundrelMeeple,
      },
    },
  },
  underworld: {
    image: underworldBox,
    factions: {
      duchy: {
        key: 'duchy',
        order: 8,
        cornerSetup: true,
        image: duchyMeeple,
        militant: true,
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
        key: 'corvid',
        order: 9,
        image: corvidMeeple,
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
          [0, 1],
          [0, 4],
          [0, 5],
          [1, 2],
          [1, 5],
          [1, 6],
          [2, 3],
          [2, 6],
          [3, 7],
          [4, 5],
          [4, 9],
          [6, 7],
          [7, 11],
          [8, 9],
          [8, 10],
          [9, 10],
          [10, 11],
        ],
        backImage: lakePaths,
        landmark: {
          code: 'ferry',
          clearing: 11,
          x: 71.5,
          y: 67.5,
          angle: 42,
        },
        defaultSuits: [
          'fox',
          'mouse',
          'fox',
          'rabbit',
          'rabbit',
          'mouse',
          'rabbit',
          'mouse',
          'rabbit',
          'mouse',
          'fox',
          'fox',
        ],
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
        // Includes the covered paths, since suits can still be balanced with them
        paths: [
          [0, 3],
          [0, 4],
          [1, 2],
          [1, 4],
          [1, 5],
          [1, 7],
          [2, 7],
          [2, 8],
          [3, 4],
          [3, 9],
          [4, 5],
          [4, 6],
          [5, 6],
          [5, 7],
          [6, 7],
          [6, 9],
          [6, 10],
          [7, 8],
          [7, 11],
          [8, 11],
          [10, 11],
        ],
        backImage: mountainPaths,
        landmark: {
          code: 'tower',
          clearing: 5,
          x: 43,
          y: 36,
        },
        defaultSuits: [
          'fox',
          'mouse',
          'rabbit',
          'rabbit',
          'rabbit',
          'fox',
          'fox',
          'mouse',
          'mouse',
          'mouse',
          'rabbit',
          'fox',
        ],
      },
    },
  },
  marauder: {
    image: marauderBox,
    factions: {
      warlord: {
        key: 'warlord',
        order: 10,
        cornerSetup: true,
        image: warlordMeeple,
        militant: true,
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
        key: 'keepers',
        order: 11,
        cornerSetup: true,
        image: keepersMeeple,
        militant: true,
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
        factions: ['marquise'],
      },
      dynasty: {
        image: dynastyMeeple,
        factions: ['eyrie'],
      },
      uprising: {
        image: uprisingMeeple,
        factions: ['alliance'],
      },
      exile: {
        image: exileMeeple,
        factions: ['vagabond', 'vagabond2'],
      },
    },
  },
  homeland: {
    image: homelandBox,
    factions: {
      council: {
        key: 'council',
        order: 12,
        image: councilMeeple,
        warriors: 20,
        buildings: 0,
        tokens: 6,
        tokenImage: assemblyToken,
        complexity: 1,
        wealth: 1,
        aggression: 0,
        crafting: 0,
      },
      diaspora: {
        key: 'diaspora',
        order: 13,
        cornerSetup: true,
        image: diasporaMeeple,
        militant: true,
        warriors: 20,
        buildings: 0,
        tokens: 12,
        tokenImage: enclaveToken,
        complexity: 1,
        wealth: 1,
        aggression: 1,
        crafting: 2,
      },
      knaves: {
        key: 'knaves',
        order: 14,
        image: knavesMeeple,
        warriors: 13,
        buildings: 0,
        tokens: 8,
        tokenImage: acclaimToken,
        complexity: 2,
        wealth: 0,
        aggression: 2,
        crafting: 1,
      },
    },
    landmarks: {
      foxburrow: {
        image: foxburrowLandmark,
        minPlayers: 0,
      },
      mousehold: {
        image: mouseholdLandmark,
        minPlayers: 0,
      },
      rabbittown: {
        image: rabbittownLandmark,
        minPlayers: 0,
      },
    },
    maps: {
      marsh: {
        image: marshMap,
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
          [0, 1],
          [0, 4],
          [0, 5],
          [1, 2],
          [1, 5],
          [1, 6],
          [2, 3],
          [2, 6],
          [3, 7],
          [4, 5],
          [4, 9],
          [6, 7],
          [7, 11],
          [8, 9],
          [8, 10],
          [9, 10],
          [10, 11],
        ],
        backImage: placeholderBox,
      },
      gorge: {
        image: gorgeMap,
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
          [0, 3],
          [0, 4],
          [1, 2],
          [1, 4],
          [1, 5],
          [1, 7],
          [2, 7],
          [2, 8],
          [3, 4],
          [3, 9],
          [4, 5],
          [4, 6],
          [5, 6],
          [5, 7],
          [6, 7],
          [6, 9],
          [6, 10],
          [7, 8],
          [7, 11],
          [8, 11],
          [10, 11],
        ],
        backImage: placeholderBox,
      },
    },
    vagabonds: {
      cheat: {
        startingItems: ['boot', 'crossbow', 'tea', 'torch'],
        image: cheatMeeple,
      },
      gladiator: {
        startingItems: ['boot', 'hammer', 'torch'],
        image: gladiatorMeeple,
      },
      jailor: {
        startingItems: ['boot', 'crossbow', 'torch'],
        image: jailorMeeple,
      },
    },
  },
  riverfolkHirelings: {
    image: riverfolkHirelingsBox,
    hirelings: {
      prophets: {
        image: prophetsMeeple,
        factions: ['cult'],
      },
      flotilla: {
        image: flotillaMeeple,
        factions: ['riverfolk'],
      },
      bandits: {
        image: banditsMeeple,
        factions: [],
      },
    },
  },
  underworldHirelings: {
    image: underworldHirelingsBox,
    hirelings: {
      expedition: {
        image: expeditionMeeple,
        factions: ['duchy'],
      },
      spies: {
        image: spiesMeeple,
        factions: ['corvid'],
      },
      protector: {
        image: protectorMeeple,
        factions: [],
      },
    },
  },
  marauderHirelings: {
    image: marauderHirelingsBox,
    hirelings: {
      flamebearers: {
        image: flamebearersMeeple,
        factions: ['warlord'],
      },
      vaultkeepers: {
        image: vaultkeepersMeeple,
        factions: ['keepers'],
      },
      band: {
        image: bandMeeple,
        factions: [],
      },
    },
  },
  homelandHirelings: {
    image: homelandHirelingsBox,
    hirelings: {
      advocates: {
        image: advocatesMeeple,
        factions: ['council'],
      },
      roamers: {
        image: roamersMeeple,
        factions: ['diaspora'],
      },
      farmers: {
        image: farmersMeeple,
        factions: [],
      },
    },
  },
  exilesDeck: {
    image: exilesDeckBox,
    decks: {
      exiles: {
        image: exilesCard,
      },
    },
  },
  squiresDeck: {
    image: squiresDeckBox,
    decks: {
      exiles: {
        image: squiresCard,
      },
    },
  },
  landmarkPack: {
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
    image: vagabondPackBox,
    vagabonds: {
      adventurer: {
        startingItems: ['boot', 'torch', 'hammer'],
        image: adventurerMeeple,
      },
      ronin: {
        startingItems: ['boot', 'boot', 'torch', 'sword'],
        image: roninMeeple,
      },
      harrier: {
        startingItems: ['coin', 'torch', 'sword', 'crossbow'],
        image: harrierMeeple,
      },
    },
  },
} as const

export default definitions
