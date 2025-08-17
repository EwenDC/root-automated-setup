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
// Chart Images
import autumnChart from './images/charts/autumn.svg'
import lakeChart from './images/charts/lake.svg'
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

const definitions: Record<ExpansionCode, Expansion> = {
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
          { x: 10.123, y: 11.569 },
          { x: 58.882, y: 11.518 },
          { x: 41.858, y: 26.447 },
          { x: 10.458, y: 37.594 },
          { x: 87.198, y: 25.808 },
          { x: 34.743, y: 57.927 },
          { x: 66.245, y: 49.38 },
          { x: 89.788, y: 51.853 },
          { x: 10.428, y: 79.616 },
          { x: 38.672, y: 88.571 },
          { x: 62.84, y: 77.929 },
          { x: 88.173, y: 87.524 },
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
          { x: 11.001, y: 11.499 },
          { x: 38.586, y: 13.759 },
          { x: 62.602, y: 18.773 },
          { x: 90.09, y: 11.776 },
          { x: 9.267, y: 46.303 },
          { x: 40.35, y: 47.758 },
          { x: 67.124, y: 49.311 },
          { x: 90.667, y: 51.783 },
          { x: 11.306, y: 79.547 },
          { x: 39.551, y: 88.502 },
          { x: 63.72, y: 77.86 },
          { x: 89.052, y: 87.455 },
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
          { x: 11.001, y: 11.525 },
          { x: 42.975, y: 13.785 },
          { x: 66.99, y: 18.799 },
          { x: 90.088, y: 11.801 },
          { x: 9.266, y: 46.329 },
          { x: 36.586, y: 40.886 },
          { x: 67.122, y: 49.337 },
          { x: 90.663, y: 51.81 },
          { x: 40.452, y: 69.624 },
          { x: 11.306, y: 79.571 },
          { x: 58.376, y: 88.454 },
          { x: 86.61, y: 83.576 },
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
          x: 71.5,
          y: 67.5,
          angle: 42,
        },
      },
      mountain: {
        image: mountainMap,
        clearings: [
          { x: 11.001, y: 11.971 },
          { x: 58.79, y: 14.464 },
          { x: 90.088, y: 12.248 },
          { x: 9.266, y: 46.776 },
          { x: 33.004, y: 37.71 },
          { x: 53.161, y: 41.2 },
          { x: 34.476, y: 61.02 },
          { x: 64.122, y: 61.741 },
          { x: 90.663, y: 52.254 },
          { x: 11.306, y: 80.02 },
          { x: 48.829, y: 88.029 },
          { x: 89.049, y: 87.927 },
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
          x: 43,
          y: 36,
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
      },
      dynasty: {
        image: dynastyMeeple,
        excludeFactions: ['eyrie'],
      },
      uprising: {
        image: uprisingMeeple,
        excludeFactions: ['alliance'],
      },
      exile: {
        image: exileMeeple,
        excludeFactions: ['vagabond', 'vagabond2', 'knaves'],
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
          { x: 11.2, y: 11.65 },
          { x: 43.15, y: 13.85 },
          { x: 67.1, y: 18.9 },
          { x: 90.15, y: 11.9 },
          { x: 9.5, y: 46.4 },
          { x: 36.75, y: 40.95 },
          { x: 67.25, y: 49.4 },
          { x: 90.7, y: 51.85 },
          { x: 40.6, y: 69.65 },
          { x: 11.5, y: 79.6 },
          { x: 58.5, y: 88.45 },
          { x: 86.7, y: 83.55 },
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
          { x: 11.5, y: 12.2 },
          { x: 58.8, y: 14.65 },
          { x: 89.8, y: 12.45 },
          { x: 9.8, y: 46.65 },
          { x: 33.3, y: 37.7 },
          { x: 53.25, y: 41.15 },
          { x: 34.75, y: 60.75 },
          { x: 64.1, y: 61.47 },
          { x: 90.37, y: 52.07 },
          { x: 11.82, y: 79.57 },
          { x: 48.95, y: 87.5 },
          { x: 88.77, y: 87.4 },
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
    defaultDisabled: true,
    hirelings: {
      prophets: {
        image: prophetsMeeple,
        excludeFactions: ['cult'],
      },
      flotilla: {
        image: flotillaMeeple,
        excludeFactions: ['riverfolk'],
      },
      bandits: {
        image: banditsMeeple,
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
      },
      spies: {
        image: spiesMeeple,
        excludeFactions: ['corvid'],
      },
      protector: {
        image: protectorMeeple,
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
      },
      vaultKeepers: {
        image: vaultKeepersMeeple,
        excludeFactions: ['keepers'],
      },
      band: {
        image: bandMeeple,
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
} as const

export default definitions
