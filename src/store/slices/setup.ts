import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import type {
  ClearingSuit,
  CodeObject,
  DeckCode,
  FactionCode,
  FactionExcludingComponent,
  HirelingCode,
  LandmarkCode,
  Map,
  MapCode,
  MapInfo,
  WithCode,
} from '../../types'

import { loadPersistedSetting, savePersistedSetting, takeRandom } from '../utils'
import { toggleExpansion } from './components'

/** An object representing an promoted or demoted Hireling. */
export interface HirelingEntry {
  code: HirelingCode
  demoted: boolean
}

/** An object containing all variables used during the setup process. */
export interface SetupState {
  playerCount: number
  fixedFirstPlayer: boolean
  playerOrder: number[]
  errorMessage: string | null
  // Map
  map: MapCode | null
  balancedSuits: boolean
  clearingSuits: ClearingSuit[]
  // Deck
  deck: DeckCode | null
  // Landmarks
  landmarkCount: 0 | 1 | 2
  landmark1: LandmarkCode | null
  landmark2: LandmarkCode | null
  // Hirelings
  hireling1: HirelingEntry | null
  hireling2: HirelingEntry | null
  hireling3: HirelingEntry | null
  // Factions
  excludedFactions: FactionCode[]
  limitVagabonds: boolean
  limitCaptains: boolean
}

export const setupSlice = createSlice({
  name: 'setup',

  initialState: (): SetupState => ({
    playerCount: loadPersistedSetting<number>('playerCount', 4),
    fixedFirstPlayer: loadPersistedSetting<boolean>('fixedFirstPlayer', false),
    playerOrder: [],
    errorMessage: null,
    // Map
    map: null,
    balancedSuits: loadPersistedSetting<boolean>('balancedSuits', false),
    clearingSuits: [],
    // Deck
    deck: null,
    // Landmarks
    landmarkCount: loadPersistedSetting<0 | 1 | 2>('landmarkCount', 0),
    landmark1: null,
    landmark2: null,
    // Hirelings
    hireling1: null,
    hireling2: null,
    hireling3: null,
    // Factions
    excludedFactions: [],
    limitVagabonds: false,
    limitCaptains: false,
  }),

  reducers: {
    setPlayerCount(state, { payload: playerCount }: PayloadAction<number>) {
      // Make sure the player count is valid (i.e. above 0)
      if (playerCount >= 1) {
        state.playerCount = playerCount
        state.errorMessage = null
        savePersistedSetting('playerCount', playerCount)
      } else {
        console.warn(
          `Invalid payload for setPlayerCount action: ${playerCount} (Payload must be a number above 0)`,
        )
      }
    },

    fixFirstPlayer(state, { payload: fixedFirstPlayer }: PayloadAction<boolean>) {
      state.fixedFirstPlayer = fixedFirstPlayer
      state.errorMessage = null
      savePersistedSetting('fixedFirstPlayer', fixedFirstPlayer)
    },

    setFirstPlayer(state, { payload: firstPlayer }: PayloadAction<number>) {
      // Make sure the player count is valid (i.e. between 1 and playerCount)
      if (firstPlayer >= 1 && firstPlayer <= state.playerCount) {
        state.playerOrder = []
        // Generate the player order array
        for (let i = 0; i < state.playerCount; i++) {
          // Add each player to the array, starting with the first player
          let nextPlayer = firstPlayer + i
          if (nextPlayer > state.playerCount) nextPlayer -= state.playerCount
          state.playerOrder.push(nextPlayer)
        }
      } else {
        console.warn(
          `Invalid payload for setFirstPlayer action: ${firstPlayer} (Payload must be a number between 1 and playerCount [${state.playerCount}])`,
        )
      }
    },

    setErrorMessage(state, { payload: errorMessage }: PayloadAction<string | null>) {
      state.errorMessage = errorMessage
    },

    setMap(state, { payload }: PayloadAction<CodeObject & Map & MapInfo>) {
      const { code: mapCode, defaultSuits, clearings, paths, fixedSuits } = payload
      state.map = mapCode

      // Also assign the clearing suits
      if (fixedSuits && defaultSuits) {
        state.clearingSuits = defaultSuits
      } else if (state.balancedSuits) {
        // Do this in a loop as there is a chance the solver fails
        do {
          // First, keep track of all clearings, the clearings they connect to, and a list of valid suits for each clearing
          const unassignedClearings = clearings.map((_clearing, index) => ({
            index,
            links: paths.reduce((list: number[], [a, b]) => {
              if (a === index) list.push(b)
              if (b === index) list.push(a)
              return list
            }, []),
            options: ['fox', 'mouse', 'rabbit'] as ClearingSuit[],
          }))
          const suitCounts: Record<ClearingSuit, number> = {
            fox: 0,
            mouse: 0,
            rabbit: 0,
          }

          // Assign each clearing one-by-one, favouring clearings with the least amount of valid options
          while (unassignedClearings.length > 0) {
            let lowestEntropy = Infinity
            const candidates = unassignedClearings.reduce((list: number[], { options }, index) => {
              // If our entropy is higher don't include as candidate
              if (options.length > lowestEntropy) return list
              // If our entropy is the same add as a candidate
              if (options.length === lowestEntropy) {
                list.push(index)
                return list
              }
              // Our entropy is lower, throw out the current candidate list and start again with just us
              lowestEntropy = options.length
              return [index]
            }, [])

            // If we've hit 0 entropy then the solver failed
            if (lowestEntropy === 0) {
              console.info(
                'Failed to solve for balanced suits. Fail state:',
                [...state.clearingSuits],
                unassignedClearings,
              )
              state.clearingSuits = []
              break
            }

            // Randomly pick a candidate and remove it from the remaining clearings
            const nextClearingIndex = takeRandom(candidates)
            const nextClearing = unassignedClearings[nextClearingIndex]!
            unassignedClearings.splice(nextClearingIndex, 1)

            // Assign a suit based off the valid options for the chosen clearing, and keep track of how many of each we've assigned
            const nextSuit = takeRandom(nextClearing.options)
            state.clearingSuits[nextClearing.index] = nextSuit
            suitCounts[nextSuit]++

            // Remove the assigned suit from all neighbouring clearings, or all clearings if we've hit the maximum amount for one suit
            for (const clearing of unassignedClearings) {
              clearing.options = clearing.options.filter(
                suit =>
                  suitCounts[suit] < 4 &&
                  (suit !== nextSuit || !clearing.links.includes(nextClearing.index)),
              )
            }
          }
        } while (Object.keys(state.clearingSuits).length === 0)
      } else {
        const suitPool: ClearingSuit[] = [
          'fox',
          'fox',
          'fox',
          'fox',
          'mouse',
          'mouse',
          'mouse',
          'mouse',
          'rabbit',
          'rabbit',
          'rabbit',
          'rabbit',
        ]
        for (let index = 0; index < clearings.length; index++) {
          state.clearingSuits[index] = takeRandom(suitPool)
        }
      }
    },

    balanceMapSuits(state, { payload: balancedSuits }: PayloadAction<boolean>) {
      state.balancedSuits = balancedSuits
      state.errorMessage = null
      savePersistedSetting('balancedSuits', balancedSuits)
    },

    setDeck(state, { payload }: PayloadAction<CodeObject>) {
      const { code: deckCode } = payload
      state.deck = deckCode
    },

    setLandmarkCount(state, { payload: landmarkCount }: PayloadAction<number>) {
      // We use === instead of >= or <= to ensure typescript can infer the correct payload type
      if (landmarkCount === 0 || landmarkCount === 1 || landmarkCount === 2) {
        state.landmarkCount = landmarkCount
        state.errorMessage = null
        savePersistedSetting('landmarkCount', landmarkCount)
      } else {
        console.warn(
          `Invalid payload for setLandmarkCount action: ${landmarkCount} (Payload must be a number between 0 and 2)`,
        )
      }
    },

    setLandmark1(state, { payload }: PayloadAction<CodeObject>) {
      const { code: landmarkCode } = payload

      if (state.landmarkCount >= 1) {
        state.landmark1 = landmarkCode
      } else {
        console.warn(
          'Invalid setLandmark1 action: Cannot set landmark 1 when landmark count less than 1',
        )
      }
    },

    setLandmark2(state, { payload }: PayloadAction<CodeObject>) {
      const { code: landmarkCode } = payload

      if (state.landmarkCount >= 2) {
        state.landmark2 = landmarkCode
      } else {
        console.warn(
          'Invalid setLandmark2 action: Cannot set landmark 2 when landmark count less than 2',
        )
      }
    },

    setHireling: {
      prepare: (
        number: number,
        hireling: WithCode<FactionExcludingComponent>,
        demoted: boolean,
      ) => ({
        payload: [
          number,
          { code: hireling.code, demoted },
          hireling.excludeFactions ?? [],
        ] as const,
      }),
      reducer(state, { payload }: PayloadAction<readonly [number, HirelingEntry, FactionCode[]]>) {
        const [number, hirelingEntry, excludeFactions] = payload

        if (number >= 1 && number <= 3) {
          if (number === 1) state.hireling1 = hirelingEntry
          if (number === 2) state.hireling2 = hirelingEntry
          if (number === 3) state.hireling3 = hirelingEntry
          state.excludedFactions.push(...excludeFactions)
        } else {
          console.warn(
            'Invalid payload for setHireling action:',
            payload,
            '("number" must be a number between 1 and 3)',
          )
        }
      },
    },

    clearExcludedFactions(state) {
      state.excludedFactions = []
    },

    setLimitVagabonds(state, { payload: limitVagabonds }: PayloadAction<boolean>) {
      state.limitVagabonds = limitVagabonds
      state.errorMessage = null
    },

    setLimitCaptains(state, { payload: limitCaptains }: PayloadAction<boolean>) {
      state.limitCaptains = limitCaptains
      state.errorMessage = null
    },
  },

  extraReducers(builder) {
    builder
      // Ensure we don't reference codes for components that may have been removed with the toggled expansion
      .addCase(toggleExpansion, state => {
        state.map = null
        state.deck = null
        state.landmark1 = null
        state.landmark2 = null
        state.hireling1 = null
        state.hireling2 = null
        state.hireling3 = null
      })
      // This allows us to always reset the displayed error if the user makes a separate input
      .addDefaultCase(state => {
        state.errorMessage = null
      })
  },

  selectors: {
    selectTwoPlayer: state => state.playerCount < 3,

    selectSetupDeckCode: state => state.deck,

    selectSetupHireling1Entry: state => state.hireling1,

    selectSetupHireling2Entry: state => state.hireling2,

    selectSetupHireling3Entry: state => state.hireling3,

    selectSetupLandmark1Code: state => state.landmark1,

    selectSetupLandmark2Code: state => state.landmark2,

    selectSetupMapCode: state => state.map,
  },
})

export const {
  setPlayerCount,
  fixFirstPlayer,
  setFirstPlayer,
  setErrorMessage,
  setMap,
  balanceMapSuits,
  setDeck,
  setLandmarkCount,
  setLandmark1,
  setLandmark2,
  setLimitCaptains,
  setLimitVagabonds,
  setHireling,
  clearExcludedFactions,
} = setupSlice.actions

export const {
  selectTwoPlayer,
  selectSetupDeckCode,
  selectSetupHireling1Entry,
  selectSetupHireling2Entry,
  selectSetupHireling3Entry,
  selectSetupLandmark1Code,
  selectSetupLandmark2Code,
  selectSetupMapCode,
} = setupSlice.selectors

export default setupSlice.reducer
