import type { Expansion, ExpansionCode } from './types'

// Box Images
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
          { x: 101, y: 116 },
          { x: 589, y: 115 },
          { x: 419, y: 264, ruin: true },
          { x: 872, y: 258 },
          { x: 104, y: 376 },
          { x: 347, y: 580, ruin: true },
          { x: 662, y: 494, ruin: true },
          { x: 898, y: 519, ruin: true },
          { x: 104, y: 796 },
          { x: 387, y: 886 },
          { x: 628, y: 780 },
          { x: 882, y: 875 },
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
          { x: 110, y: 115 },
          { x: 386, y: 138 },
          { x: 626, y: 188 },
          { x: 901, y: 118 },
          { x: 93, y: 463 },
          { x: 403, y: 478, ruin: true },
          { x: 671, y: 493, ruin: true },
          { x: 907, y: 518 },
          { x: 113, y: 796 },
          { x: 396, y: 885, ruin: true },
          { x: 637, y: 779, ruin: true },
          { x: 891, y: 875 },
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
          { x: 110, y: 115 },
          { x: 430, y: 138 },
          { x: 670, y: 188 },
          { x: 901, y: 118 },
          { x: 93, y: 463 },
          { x: 366, y: 409, ruin: true },
          { x: 671, y: 493, ruin: true },
          { x: 907, y: 518, ruin: true },
          { x: 404, y: 696, ruin: true },
          { x: 113, y: 796 },
          { x: 584, y: 884 },
          { x: 866, y: 836 },
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
          { x: 110, y: 120 },
          { x: 588, y: 145 },
          { x: 901, y: 122 },
          { x: 93, y: 468 },
          { x: 330, y: 377, ruin: true },
          { x: 532, y: 412, ruin: true },
          { x: 345, y: 610, ruin: true },
          { x: 641, y: 618, ruin: true },
          { x: 907, y: 522 },
          { x: 113, y: 800 },
          { x: 488, y: 880 },
          { x: 891, y: 879 },
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
          { x: 129, y: 152 },
          { x: 404, y: 147 },
          { x: 647, y: 170, floodGroup: 'circle', fallbackRuin: true },
          { x: 914, y: 222 },
          { x: 271, y: 353, floodGroup: 'square' },
          { x: 547, y: 375, ruin: true },
          { x: 809, y: 421, floodGroup: 'triangle', ruin: true },
          { x: 88, y: 549, floodGroup: 'square' },
          { x: 409, y: 540, ruin: true },
          { x: 651, y: 651, floodGroup: 'triangle', ruin: true },
          { x: 912, y: 633 },
          { x: 92, y: 832 },
          { x: 340, y: 757 },
          { x: 561, y: 847, floodGroup: 'circle', fallbackRuin: true },
          { x: 831, y: 853 },
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
        },
        backImage: marshChart,
        floodImage: marshFloodedChart,
      },
      gorge: {
        image: gorgeMap,
        clearings: [
          { x: 116, y: 155 },
          { x: 607, y: 147 },
          { x: 865, y: 171 },
          { x: 229, y: 369 },
          { x: 456, y: 298, ruin: true },
          { x: 725, y: 382, ruin: true },
          { x: 141, y: 585, ruin: true },
          { x: 520, y: 550, ruin: true },
          { x: 884, y: 574 },
          { x: 156, y: 830 },
          { x: 441, y: 792 },
          { x: 723, y: 853 },
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
