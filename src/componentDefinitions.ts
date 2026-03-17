import type { DeepReadonly, Expansion, ExpansionCode } from './types'

// Box Images
import clockwork2Box from './images/boxes/clockwork2.png'
import clockworkBox from './images/boxes/clockwork.png'
import exilesDeckBox from './images/boxes/exilesDeck.png'
import homelandBox from './images/boxes/homeland.png'
import homelandHirelingsBox from './images/boxes/homelandHirelings.png'
import landmarkPackBox from './images/boxes/landmarkPack.png'
import marauderBox from './images/boxes/marauder.png'
import marauderHirelingsBox from './images/boxes/marauderHirelings.png'
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
// Chart Images
import autumnChart from './images/charts/autumn.svg'
import marshFloodedChart from './images/charts/flooded/marsh.svg'
import gorgeChart from './images/charts/gorge.svg'
import lakeChart from './images/charts/lake.svg'
import marshChart from './images/charts/marsh.svg'
import mountainChart from './images/charts/mountain.svg'
import winterChart from './images/charts/winter.svg'
// Landmark Images
import cityLandmark from './images/landmarks/city.svg'
import ferryLandmark from './images/landmarks/ferry.svg'
import forgeLandmark from './images/landmarks/forge.svg'
import foxburrowLandmark from './images/landmarks/foxburrow.svg'
import marketLandmark from './images/landmarks/market.svg'
import mouseholdLandmark from './images/landmarks/mousehold.svg'
import rabbittownLandmark from './images/landmarks/rabbittown.svg'
import towerLandmark from './images/landmarks/tower.svg'
import treetopLandmark from './images/landmarks/treetop.svg'
// Map Images
import autumnMap from './images/maps/autumn.png'
import gorgeMap from './images/maps/gorge.png'
import lakeMap from './images/maps/lake.png'
import marshMap from './images/maps/marsh.png'
import mountainMap from './images/maps/mountain.png'
import winterMap from './images/maps/winter.png'
// Meeple Images
import adventurerMeeple from './images/meeples/adventurer.svg'
import advocatesMeeple from './images/meeples/advocates.svg'
import allianceMeeple from './images/meeples/alliance.svg'
import arbiterMeeple from './images/meeples/arbiter.svg'
import bandMeeple from './images/meeples/band.svg'
import banditsMeeple from './images/meeples/bandits.svg'
import cheatMeeple from './images/meeples/cheat.svg'
import corvidMeeple from './images/meeples/corvid.svg'
import councilMeeple from './images/meeples/council.svg'
import cultMeeple from './images/meeples/cult.svg'
import diasporaMeeple from './images/meeples/diaspora.svg'
import duchyMeeple from './images/meeples/duchy.svg'
import dynastyMeeple from './images/meeples/dynasty.svg'
import exileMeeple from './images/meeples/exile.svg'
import expeditionMeeple from './images/meeples/expedition.svg'
import eyrieMeeple from './images/meeples/eyrie.svg'
import farmersMeeple from './images/meeples/farmers.svg'
import flameBearersMeeple from './images/meeples/flameBearers.svg'
import flotillaMeeple from './images/meeples/flotilla.svg'
import gladiatorMeeple from './images/meeples/gladiator.svg'
import harrierMeeple from './images/meeples/harrier.svg'
import jailorMeeple from './images/meeples/jailor.svg'
import keepersMeeple from './images/meeples/keepers.svg'
import knavesMeeple from './images/meeples/knaves.svg'
import marquiseMeeple from './images/meeples/marquise.svg'
import patrolMeeple from './images/meeples/patrol.svg'
import prophetsMeeple from './images/meeples/prophets.svg'
import protectorMeeple from './images/meeples/protector.svg'
import rangerMeeple from './images/meeples/ranger.svg'
import riverfolkMeeple from './images/meeples/riverfolk.svg'
import roamersMeeple from './images/meeples/roamers.svg'
import roninMeeple from './images/meeples/ronin.svg'
import scoundrelMeeple from './images/meeples/scoundrel.svg'
import spiesMeeple from './images/meeples/spies.svg'
import thiefMeeple from './images/meeples/thief.svg'
import tinkerMeeple from './images/meeples/tinker.svg'
import uprisingMeeple from './images/meeples/uprising.svg'
import vagrantMeeple from './images/meeples/vagrant.svg'
import vaultKeepersMeeple from './images/meeples/vaultKeepers.svg'
import warlordMeeple from './images/meeples/warlord.svg'
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

const definitions: DeepReadonly<Record<ExpansionCode, Expansion>> = {
  root: {
    image: rootBox,
    decks: {
      standard: {
        image: standardCard,
      },
    },
    factions: {
      marquise: {
        key: 'marquise',
        image: marquiseMeeple,
        militant: true,
        standardSetup: {
          order: 1,
          cornerSetup: true,
        },
        pieces: {
          warriors: 25,
          buildings: {
            count: 18,
            image: marquiseBuildings,
          },
          tokens: {
            count: 9,
            image: marquiseTokens,
          },
        },
        stats: {
          complexity: 0,
          wealth: 1,
          aggression: 1,
          crafting: 1,
        },
      },
      eyrie: {
        key: 'eyrie',
        image: eyrieMeeple,
        militant: true,
        standardSetup: {
          order: 2,
          cornerSetup: true,
        },
        pieces: {
          warriors: 20,
          buildings: {
            count: 7,
            image: roostBuilding,
          },
        },
        stats: {
          complexity: 0,
          wealth: 0,
          aggression: 2,
          crafting: 1,
        },
      },
      alliance: {
        key: 'alliance',
        image: allianceMeeple,
        standardSetup: {
          order: 3,
        },
        pieces: {
          warriors: 10,
          buildings: {
            count: 3,
            image: baseBuildings,
          },
          tokens: {
            count: 10,
            image: sympathyToken,
          },
        },
        stats: {
          complexity: 2,
          wealth: 1,
          aggression: 1,
          crafting: 2,
        },
      },
      vagabond: {
        key: 'vagabond',
        image: thiefMeeple,
        excludeFactions: ['knaves'],
        dealVagabond: true,
        standardSetup: {
          order: 4,
        },
        pieces: {
          warriors: 1,
        },
        stats: {
          complexity: 1,
          wealth: 1,
          aggression: 1,
          crafting: 0,
        },
      },
    },
    maps: {
      autumn: {
        image: autumnMap,
        clearings: [
          {
            x: 101,
            y: 116,
            adjacentClearings: [1, 2, 4],
            corner: true,
            mapEdge: true,
            buildingSlots: 1,
            suit: 'fox',
          },
          {
            x: 589,
            y: 115,
            adjacentClearings: [0, 3],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'rabbit',
            coastal: true,
          },
          {
            x: 419,
            y: 264,
            adjacentClearings: [0, 3, 5],
            buildingSlots: 2,
            suit: 'rabbit',
            ruin: true,
            coastal: true,
          },
          {
            x: 872,
            y: 258,
            adjacentClearings: [1, 7],
            corner: true,
            mapEdge: true,
            buildingSlots: 2,
            suit: 'mouse',
          },
          {
            x: 104,
            y: 376,
            adjacentClearings: [0, 5, 8],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'mouse',
          },
          {
            x: 347,
            y: 580,
            adjacentClearings: [2, 4, 6, 8],
            buildingSlots: 2,
            suit: 'fox',
            ruin: true,
          },
          {
            x: 662,
            y: 494,
            adjacentClearings: [5, 7, 11],
            buildingSlots: 3,
            suit: 'mouse',
            ruin: true,
            coastal: true,
          },
          {
            x: 898,
            y: 519,
            adjacentClearings: [3, 6, 11],
            buildingSlots: 2,
            suit: 'fox',
            mapEdge: true,
            ruin: true,
          },
          {
            x: 104,
            y: 796,
            adjacentClearings: [4, 5, 9],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'rabbit',
            corner: true,
            coastal: true,
          },
          {
            x: 387,
            y: 886,
            adjacentClearings: [8, 10],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'fox',
          },
          {
            x: 628,
            y: 780,
            adjacentClearings: [5, 9, 11],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'mouse',
            coastal: true,
          },
          {
            x: 882,
            y: 875,
            adjacentClearings: [6, 7, 10],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'rabbit',
            corner: true,
          },
        ],
        botPriorities: [1, 5, 10, 2, 9, 12, 11, 6, 4, 8, 7, 3],
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
        printedSuits: true,
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
        backImage: autumnChart,
      },
      winter: {
        image: winterMap,
        clearings: [
          {
            x: 110,
            y: 115,
            adjacentClearings: [1, 5],
            mapEdge: true,
            suit: 'rabbit',
            buildingSlots: 1,
            corner: true,
          },
          {
            x: 386,
            y: 138,
            adjacentClearings: [0, 2],
            mapEdge: true,
            suit: 'fox',
            buildingSlots: 2,
          },
          {
            x: 626,
            y: 188,
            adjacentClearings: [1, 3],
            mapEdge: true,
            suit: 'mouse',
            buildingSlots: 2,
          },
          {
            x: 901,
            y: 118,
            adjacentClearings: [2, 6, 7],
            mapEdge: true,
            suit: 'fox',
            buildingSlots: 1,
            corner: true,
          },
          {
            x: 93,
            y: 463,
            adjacentClearings: [0, 8],
            mapEdge: true,
            suit: 'mouse',
            buildingSlots: 1,
            coastal: true,
          },
          {
            x: 403,
            y: 478,
            adjacentClearings: [0, 9],
            suit: 'fox',
            buildingSlots: 3,
            ruin: true,
            coastal: true,
          },
          {
            x: 671,
            y: 493,
            adjacentClearings: [3, 10, 11],
            suit: 'rabbit',
            buildingSlots: 3,
            ruin: true,
            coastal: true,
          },
          {
            x: 907,
            y: 518,
            adjacentClearings: [3, 11],
            mapEdge: true,
            suit: 'rabbit',
            buildingSlots: 1,
            coastal: true,
          },
          {
            x: 113,
            y: 796,
            adjacentClearings: [4, 5, 9],
            mapEdge: true,
            suit: 'rabbit',
            buildingSlots: 2,
            corner: true,
          },
          {
            x: 396,
            y: 885,
            adjacentClearings: [5, 8, 10],
            mapEdge: true,
            suit: 'mouse',
            buildingSlots: 2,
            ruin: true,
          },
          {
            x: 637,
            y: 779,
            adjacentClearings: [6, 9, 11],
            mapEdge: true,
            suit: 'fox',
            buildingSlots: 2,
            ruin: true,
          },
          {
            x: 891,
            y: 875,
            adjacentClearings: [6, 7, 10],
            mapEdge: true,
            suit: 'mouse',
            buildingSlots: 2,
            corner: true,
          },
        ],
        botPriorities: [1, 5, 6, 2, 10, 11, 12, 7, 4, 9, 8, 3],
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
        backImage: winterChart,
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
    defaultDisabled: true,
    factions: {
      vagabond2: {
        // As per the latest law of root, only one vagabond is recommended to be included in setup
        defaultDisabled: true,
        key: 'vagabond',
        image: roninMeeple,
        excludeFactions: ['knaves'],
        dealVagabond: true,
        standardSetup: {
          order: 5,
        },
        pieces: {
          warriors: 1,
        },
        stats: {
          complexity: 1,
          wealth: 1,
          aggression: 1,
          crafting: 0,
        },
      },
      cult: {
        key: 'cult',
        image: cultMeeple,
        standardSetup: {
          order: 6,
          cornerSetup: true,
        },
        pieces: {
          warriors: 25,
          buildings: {
            count: 15,
            image: gardenBuildings,
          },
        },
        stats: {
          complexity: 2,
          wealth: 2,
          aggression: 1,
          crafting: 2,
        },
      },
      riverfolk: {
        key: 'riverfolk',
        image: riverfolkMeeple,
        standardSetup: {
          order: 7,
        },
        pieces: {
          warriors: 15,
          tokens: {
            count: 9,
            image: tradePostTokens,
          },
        },
        stats: {
          complexity: 2,
          wealth: 2,
          aggression: 0,
          crafting: 1,
        },
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
    defaultDisabled: true,
    factions: {
      duchy: {
        key: 'duchy',
        image: duchyMeeple,
        militant: true,
        standardSetup: {
          order: 8,
          cornerSetup: true,
        },
        pieces: {
          warriors: 20,
          buildings: {
            count: 6,
            image: duchyBuildings,
          },
          tokens: {
            count: 3,
            image: tunnelToken,
          },
        },
        stats: {
          complexity: 1,
          wealth: 2,
          aggression: 1,
          crafting: 1,
        },
      },
      corvid: {
        key: 'corvid',
        image: corvidMeeple,
        standardSetup: {
          order: 9,
        },
        pieces: {
          warriors: 15,
          tokens: {
            count: 8,
            image: plotToken,
          },
        },
        stats: {
          complexity: 0,
          wealth: 1,
          aggression: 1,
          crafting: 2,
        },
      },
    },
    landmarks: {
      tower: {
        image: towerLandmark,
        minPlayers: 0,
        placementRules: ['ruin'],
      },
      ferry: {
        image: ferryLandmark,
        minPlayers: 0,
        placementRules: ['river'],
      },
    },
    maps: {
      lake: {
        image: lakeMap,
        clearings: [
          {
            x: 110,
            y: 115,
            adjacentClearings: [1, 4, 5],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'fox',
            corner: true,
          },
          {
            x: 430,
            y: 138,
            adjacentClearings: [0, 2, 5],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'mouse',
          },
          {
            x: 670,
            y: 188,
            adjacentClearings: [1, 3, 6],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'fox',
          },
          {
            x: 901,
            y: 118,
            adjacentClearings: [2, 7],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'rabbit',
            corner: true,
          },
          {
            x: 93,
            y: 463,
            adjacentClearings: [0, 5, 9],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'rabbit',
          },
          {
            x: 366,
            y: 409,
            adjacentClearings: [0, 1, 4],
            buildingSlots: 3,
            suit: 'mouse',
            coastal: true,
            ruin: true,
          },
          {
            x: 671,
            y: 493,
            adjacentClearings: [1, 2, 7],
            buildingSlots: 3,
            suit: 'rabbit',
            ruin: true,
            coastal: true,
          },
          {
            x: 907,
            y: 518,
            adjacentClearings: [1, 2, 7],
            mapEdge: true,
            buildingSlots: 3,
            suit: 'mouse',
            ruin: true,
          },
          {
            x: 404,
            y: 696,
            adjacentClearings: [9, 10],
            buildingSlots: 3,
            suit: 'rabbit',
            ruin: true,
            coastal: true,
          },
          {
            x: 113,
            y: 796,
            adjacentClearings: [4, 8, 10],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'mouse',
            corner: true,
          },
          {
            x: 584,
            y: 884,
            adjacentClearings: [8, 9, 11],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'fox',
          },
          {
            x: 866,
            y: 836,
            adjacentClearings: [7, 10],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'fox',
            coastal: true,
            corner: true,
          },
        ],
        botPriorities: [2, 7, 6, 4, 8, 10, 11, 5, 12, 3, 9, 1],
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
        backImage: lakeChart,
        landmark: {
          code: 'ferry',
          clearing: 11,
          x: 715,
          y: 675,
          angle: 42,
        },
      },
      mountain: {
        image: mountainMap,
        clearings: [
          {
            x: 110,
            y: 120,
            adjacentClearings: [3, 4],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'fox',
            corner: true,
          },
          {
            x: 588,
            y: 145,
            adjacentClearings: [2, 4],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'mouse',
          },
          {
            x: 901,
            y: 122,
            adjacentClearings: [1, 7, 8],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'rabbit',
            coastal: true,
            corner: true,
          },
          {
            x: 93,
            y: 468,
            adjacentClearings: [0, 4, 9],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'rabbit',
          },
          {
            x: 330,
            y: 377,
            adjacentClearings: [0, 1, 3, 5],
            buildingSlots: 3,
            suit: 'rabbit',
            ruin: true,
          },
          {
            x: 532,
            y: 412,
            adjacentClearings: [1, 4, 6, 7],
            buildingSlots: 2,
            suit: 'fox',
            coastal: true,
            ruin: true,
          },
          {
            x: 345,
            y: 610,
            adjacentClearings: [4, 5, 7, 9, 10],
            buildingSlots: 3,
            suit: 'fox',
            ruin: true,
          },
          {
            x: 641,
            y: 618,
            adjacentClearings: [1, 2, 5, 6, 8, 11],
            buildingSlots: 3,
            suit: 'mouse',
            ruin: true,
          },
          {
            x: 907,
            y: 522,
            adjacentClearings: [2, 7, 11],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'mouse',
          },
          {
            x: 113,
            y: 800,
            adjacentClearings: [3, 6],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'mouse',
            coastal: true,
            corner: true,
          },
          {
            x: 488,
            y: 880,
            adjacentClearings: [6, 11],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'rabbit',
          },
          {
            x: 891,
            y: 879,
            adjacentClearings: [7, 8, 10],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'fox',
            corner: true,
          },
        ],
        botPriorities: [1, 5, 2, 8, 9, 10, 12, 11, 6, 4, 7, 3],
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
        backImage: mountainChart,
        landmark: {
          code: 'tower',
          clearing: 5,
          x: 525,
          y: 350,
        },
      },
    },
  },
  marauder: {
    image: marauderBox,
    defaultDisabled: true,
    factions: {
      warlord: {
        key: 'warlord',
        image: warlordMeeple,
        militant: true,
        standardSetup: {
          order: 10,
          cornerSetup: true,
        },
        pieces: {
          warriors: 21,
          buildings: {
            count: 6,
            image: strongholdBuilding,
          },
          tokens: {
            count: 5,
            image: mobToken,
          },
        },
        stats: {
          complexity: 1,
          wealth: 0,
          aggression: 2,
          crafting: 0,
        },
      },
      keepers: {
        key: 'keepers',
        image: keepersMeeple,
        militant: true,
        standardSetup: {
          order: 11,
          cornerSetup: true,
        },
        pieces: {
          warriors: 15,
          buildings: {
            count: 3,
            image: waystationBuildings,
          },
          tokens: {
            count: 12,
            image: relicTokens,
          },
        },
        stats: {
          complexity: 2,
          wealth: 2,
          aggression: 1,
          crafting: 1,
        },
      },
    },
    hirelings: {
      patrol: {
        image: patrolMeeple,
        excludeFactions: ['marquise'],
        placementRules: ['allClearings'],
      },
      dynasty: {
        image: dynastyMeeple,
        excludeFactions: ['eyrie'],
        placementRules: ['mapEdge'],
        placementCount: 1,
      },
      uprising: {
        image: uprisingMeeple,
        excludeFactions: ['alliance'],
        placementRules: ['randomSuit'],
        placementCount: 1,
      },
      exile: {
        image: exileMeeple,
        excludeFactions: ['vagabond', 'vagabond2', 'knaves'],
        placementRules: ['forest'],
        placementCount: 1,
      },
    },
  },
  homeland: {
    image: homelandBox,
    defaultDisabled: true,
    captains: {
      adventurer: {
        startingItems: ['hammer', 'coin'],
        image: adventurerMeeple,
      },
      arbiter: {
        startingItems: ['sword', 'coin'],
        image: arbiterMeeple,
      },
      cheat: {
        startingItems: ['boot', 'tea'],
        image: cheatMeeple,
      },
      gladiator: {
        startingItems: ['sword', 'hammer'],
        image: gladiatorMeeple,
      },
      harrier: {
        startingItems: ['boot', 'crossbow'],
        image: harrierMeeple,
      },
      jailor: {
        startingItems: ['crossbow', 'bag'],
        image: jailorMeeple,
      },
      ranger: {
        startingItems: ['sword', 'crossbow'],
        image: rangerMeeple,
      },
      ronin: {
        startingItems: ['boot', 'sword'],
        image: roninMeeple,
      },
      scoundrel: {
        startingItems: ['crossbow', 'tea'],
        image: scoundrelMeeple,
      },
      thief: {
        startingItems: ['boot', 'bag'],
        image: thiefMeeple,
      },
      tinker: {
        startingItems: ['bag', 'hammer'],
        image: tinkerMeeple,
      },
      vagrant: {
        startingItems: ['tea', 'coin'],
        image: vagrantMeeple,
      },
    },
    factions: {
      council: {
        key: 'council',
        image: councilMeeple,
        standardSetup: {
          order: 12,
        },
        pieces: {
          warriors: 20,
          tokens: {
            count: 6,
            image: assemblyToken,
          },
        },
        stats: {
          complexity: 1,
          wealth: 1,
          aggression: 0,
          crafting: 0,
        },
      },
      diaspora: {
        key: 'diaspora',
        image: diasporaMeeple,
        militant: true,
        standardSetup: {
          order: 13,
        },
        pieces: {
          warriors: 20,
          tokens: {
            count: 12,
            image: enclaveToken,
          },
        },
        stats: {
          complexity: 1,
          wealth: 1,
          aggression: 1,
          crafting: 2,
        },
      },
      knaves: {
        key: 'knaves',
        image: knavesMeeple,
        excludeFactions: ['vagabond', 'vagabond2'],
        dealCaptains: true,
        standardSetup: {
          order: 14,
        },
        pieces: {
          warriors: 13,
          tokens: {
            count: 8,
            image: acclaimToken,
          },
        },
        stats: {
          complexity: 2,
          wealth: 0,
          aggression: 2,
          crafting: 1,
        },
      },
    },
    landmarks: {
      foxburrow: {
        image: foxburrowLandmark,
        minPlayers: 0,
        placementRules: ['fox'],
      },
      mousehold: {
        image: mouseholdLandmark,
        minPlayers: 0,
        placementRules: ['mouse'],
      },
      rabbittown: {
        image: rabbittownLandmark,
        minPlayers: 0,
        placementRules: ['rabbit'],
      },
    },
    maps: {
      marsh: {
        image: marshMap,
        clearings: [
          {
            x: 129,
            y: 152,
            adjacentClearings: [1, 4, 7],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'mouse',
            corner: true,
          },
          {
            x: 404,
            y: 147,
            adjacentClearings: [0, 2, 5],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'fox',
          },
          {
            x: 647,
            y: 170,
            adjacentClearings: [1, 3],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'rabbit',
            coastal: true,
            floodGroup: 'circle',
            fallbackRuin: true,
          },
          {
            x: 914,
            y: 222,
            adjacentClearings: [2, 6, 10],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'mouse',
            corner: true,
          },
          {
            x: 271,
            y: 353,
            adjacentClearings: [0, 5, 8],
            buildingSlots: 1,
            suit: 'none',
            floodGroup: 'square',
          },
          {
            x: 547,
            y: 375,
            adjacentClearings: [1, 4, 6],
            buildingSlots: 3,
            suit: 'rabbit',
            coastal: true,
            ruin: true,
          },
          {
            x: 809,
            y: 421,
            adjacentClearings: [3, 5, 9],
            buildingSlots: 2,
            suit: 'none',
            floodGroup: 'triangle',
            ruin: true,
          },
          {
            x: 88,
            y: 549,
            adjacentClearings: [0, 8, 11],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'fox',
            floodGroup: 'square',
          },
          {
            x: 409,
            y: 540,
            adjacentClearings: [4, 7, 9],
            buildingSlots: 3,
            suit: 'rabbit',
            coastal: true,
            ruin: true,
          },
          {
            x: 651,
            y: 651,
            adjacentClearings: [6, 8, 14],
            buildingSlots: 2,
            suit: 'fox',
            floodGroup: 'triangle',
            ruin: true,
          },
          {
            x: 912,
            y: 633,
            adjacentClearings: [3, 14],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'rabbit',
          },
          {
            x: 92,
            y: 832,
            adjacentClearings: [7, 12],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'mouse',
            coastal: true,
            corner: true,
          },
          {
            x: 340,
            y: 757,
            adjacentClearings: [8, 11, 13],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'fox',
          },
          {
            x: 561,
            y: 847,
            adjacentClearings: [12, 14],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'none',
            coastal: true,
            floodGroup: 'circle',
            fallbackRuin: true,
          },
          {
            x: 831,
            y: 853,
            adjacentClearings: [9, 10, 13],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'mouse',
            corner: true,
          },
        ],
        paths: [
          [0, 1],
          [0, 4],
          [0, 7],
          [1, 2],
          [1, 5],
          [2, 3],
          [3, 6],
          [3, 10],
          [4, 5, true],
          [4, 8],
          [5, 6],
          [6, 9],
          [7, 8, true],
          [7, 11],
          [8, 9],
          [8, 12],
          [9, 14],
          [10, 14],
          [11, 12],
          [12, 13],
          [13, 14],
        ],
        suitLandmarks: {
          fox: 'foxburrow',
          mouse: 'mousehold',
          rabbit: 'rabbittown',
          none: '',
        },
        backImage: marshChart,
        floodImage: marshFloodedChart,
      },
      gorge: {
        image: gorgeMap,
        clearings: [
          {
            x: 116,
            y: 155,
            adjacentClearings: [1, 3, 4],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'mouse',
            corner: true,
          },
          {
            x: 607,
            y: 147,
            adjacentClearings: [0, 2, 4, 5],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'rabbit',
          },
          {
            x: 865,
            y: 171,
            adjacentClearings: [1, 5],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'fox',
            coastal: true,
            corner: true,
          },
          {
            x: 229,
            y: 369,
            adjacentClearings: [0, 5, 6],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'rabbit',
            coastal: true,
          },
          {
            x: 456,
            y: 298,
            adjacentClearings: [0, 1, 7],
            buildingSlots: 3,
            suit: 'fox',
            coastal: true,
            ruin: true,
          },
          {
            x: 725,
            y: 382,
            adjacentClearings: [1, 2, 3, 8],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'mouse',
            ruin: true,
          },
          {
            x: 141,
            y: 585,
            adjacentClearings: [3, 8, 9, 10],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'mouse',
            ruin: true,
          },
          {
            x: 520,
            y: 550,
            adjacentClearings: [4, 10, 11],
            buildingSlots: 3,
            suit: 'mouse',
            ruin: true,
          },
          {
            x: 884,
            y: 574,
            adjacentClearings: [5, 6, 11],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'fox',
          },
          {
            x: 156,
            y: 830,
            adjacentClearings: [6, 10],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'rabbit',
            corner: true,
          },
          {
            x: 441,
            y: 792,
            adjacentClearings: [6, 7, 9, 11],
            mapEdge: true,
            buildingSlots: 2,
            suit: 'fox',
            coastal: true,
          },
          {
            x: 723,
            y: 853,
            adjacentClearings: [7, 8, 10],
            mapEdge: true,
            buildingSlots: 1,
            suit: 'rabbit',
            corner: true,
          },
        ],
        paths: [
          [0, 1],
          [0, 3],
          [0, 4],
          [1, 2],
          [1, 4],
          [1, 5],
          [2, 5],
          [3, 5],
          [3, 6],
          [4, 7],
          [5, 8],
          [6, 8],
          [6, 9],
          [6, 10],
          [7, 10],
          [7, 11],
          [8, 11],
          [9, 10],
          [10, 11],
        ],
        backImage: gorgeChart,
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
    defaultDisabled: true,
    hirelings: {
      prophets: {
        image: prophetsMeeple,
        excludeFactions: ['cult'],
        placementRules: ['allRuins'],
      },
      flotilla: {
        image: flotillaMeeple,
        excludeFactions: ['riverfolk'],
        placementRules: ['mapEdge', 'river'],
        placementCount: 1,
      },
      bandits: {
        image: banditsMeeple,
        placementRules: ['path'],
        placementCount: 2,
      },
    },
  },
  underworldHirelings: {
    image: underworldHirelingsBox,
    defaultDisabled: true,
    hirelings: {
      expedition: {
        image: expeditionMeeple,
        excludeFactions: ['duchy'],
        placementRules: [],
        placementCount: 1,
      },
      spies: {
        image: spiesMeeple,
        excludeFactions: ['corvid'],
        placementRules: ['matchFirstSuit'],
        placementCount: 2,
        allowSameClearing: false,
      },
      protector: {
        image: protectorMeeple,
        placementRules: [],
        placementCount: 1,
      },
    },
  },
  marauderHirelings: {
    image: marauderHirelingsBox,
    defaultDisabled: true,
    hirelings: {
      flameBearers: {
        image: flameBearersMeeple,
        excludeFactions: ['warlord'],
        placementRules: [],
        placementCount: 2,
        allowSameClearing: true,
      },
      vaultKeepers: {
        image: vaultKeepersMeeple,
        excludeFactions: ['keepers'],
        placementRules: ['openBuildingSlot'],
        placementCount: 1,
      },
      band: {
        image: bandMeeple,
        placementRules: [],
        placementCount: 2,
        allowSameClearing: false,
      },
    },
  },
  homelandHirelings: {
    image: homelandHirelingsBox,
    defaultDisabled: true,
    hirelings: {
      advocates: {
        image: advocatesMeeple,
        excludeFactions: ['council'],
      },
      roamers: {
        image: roamersMeeple,
        excludeFactions: ['diaspora'],
      },
      farmers: {
        image: farmersMeeple,
      },
    },
  },
  exilesDeck: {
    image: exilesDeckBox,
    defaultDisabled: true,
    decks: {
      exiles: {
        image: exilesCard,
      },
    },
  },
  squiresDeck: {
    image: squiresDeckBox,
    defaultDisabled: true,
    decks: {
      squires: {
        image: squiresCard,
      },
    },
  },
  landmarkPack: {
    image: landmarkPackBox,
    defaultDisabled: true,
    landmarks: {
      treetop: {
        image: treetopLandmark,
        minPlayers: 3,
        placementRules: ['corner'],
      },
      city: {
        image: cityLandmark,
        minPlayers: 0,
        placementRules: ['river'],
      },
      market: {
        image: marketLandmark,
        minPlayers: 0,
        placementRules: ['singleSlot'],
      },
      forge: {
        image: forgeLandmark,
        minPlayers: 0,
        placementRules: [],
      },
    },
  },
  vagabondPack: {
    image: vagabondPackBox,
    defaultDisabled: true,
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
  clockwork: {
    image: clockworkBox,
    defaultDisabled: true,
    bots: {
      mechanicalMarquise: {
        image: marquiseMeeple,
        baseFactionCode: 'marquise',
        clockroot: 'MarquiseDC',
        excludeFactions: ['marquise'],
      },
      electricEyrie: {
        image: eyrieMeeple,
        baseFactionCode: 'eyrie',
        clockroot: 'EyrieDC',
        excludeFactions: ['eyrie'],
      },
      automatedAlliance: {
        image: allianceMeeple,
        baseFactionCode: 'alliance',
        clockroot: 'WoodlandDC',
        excludeFactions: ['alliance'],
      },
      vagabot: {
        image: thiefMeeple,
        baseFactionCode: 'vagabond',
        clockroot: 'VagabondDC',
        excludeFactions: ['vagabond], vagabond2, knaves'],
      },
    },
  },
  clockwork2: {
    image: clockwork2Box,
    defaultDisabled: true,
    bots: {
      cogwheelCorvids: {
        image: corvidMeeple,
        baseFactionCode: 'corvid',
        clockroot: 'Corvid',
        excludeFactions: ['corvid'],
      },
      drillbitDuchy: {
        image: duchyMeeple,
        baseFactionCode: 'duchy',
        clockroot: 'Duchy',
        excludeFactions: ['duchy'],
      },
      logicalLizards: {
        image: cultMeeple,
        baseFactionCode: 'cult',
        clockroot: 'Lizard',
        excludeFactions: ['cult'],
      },
      riverfolkRobots: {
        image: riverfolkMeeple,
        baseFactionCode: 'riverfolk',
        clockroot: 'Riverfolk',
        excludeFactions: ['riverfolk'],
      },
    },
  },
  betaClockwork: {
    image: clockworkBox,
    defaultDisabled: true,
    bots: {
      lootingLegion: {
        image: warlordMeeple,
        baseFactionCode: 'warlord',
        clockroot: 'Legion',
        excludeFactions: ['warlord'],
      },
    },
  },
} as const

export default definitions
