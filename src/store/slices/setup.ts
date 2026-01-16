import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import type { SetupClearing } from '../../functions/mapSolvers'
import type {
  CodeObject,
  DeckCode,
  FactionCode,
  FactionExcludingComponent,
  HirelingCode,
  LandmarkCode,
  MapCode,
  WithCode,
} from '../../types'

import {
  HIRELING_SETUP_COUNT,
  LEGACY_SETTING_INCLUDE_HIRELINGS,
  MAX_LANDMARKS,
  SETTING_BALANCED_SUITS,
  SETTING_FIXED_FIRST_PLAYER,
  SETTING_HIRELING_COUNT,
  SETTING_INCLUDE_BOTS,
  SETTING_LANDMARK_COUNT,
  SETTING_PLAYER_COUNT,
} from '../../constants'
import { loadPersistedSetting, savePersistedSetting } from '../../functions/persistedSettings'
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
  includeBots: boolean
  errorMessage: string | null
  // Map
  map: MapCode | null
  balancedSuits: boolean
  clearings: SetupClearing[]
  // Deck
  deck: DeckCode | null
  // Landmarks
  landmarkCount: number
  landmarks: LandmarkCode[]
  // Hirelings
  hirelingCount: number
  hirelings: HirelingEntry[]
  // Factions
  excludedFactions: FactionCode[]
  limitVagabonds: boolean
  limitCaptains: boolean
}

export const setupSlice = createSlice({
  name: 'setup',

  initialState: (): SetupState => {
    // Migrate old "include hirelings" setting to "hireling count" setting
    let defaultHirelingCount = 0
    const includeHirelings = localStorage.getItem(LEGACY_SETTING_INCLUDE_HIRELINGS)
    if (includeHirelings != null) {
      if (includeHirelings === JSON.stringify(true)) defaultHirelingCount = HIRELING_SETUP_COUNT
      localStorage.removeItem(LEGACY_SETTING_INCLUDE_HIRELINGS)
    }

    return {
      playerCount: loadPersistedSetting<number>(SETTING_PLAYER_COUNT, 4),
      fixedFirstPlayer: loadPersistedSetting<boolean>(SETTING_FIXED_FIRST_PLAYER, false),
      playerOrder: [],
      includeBots: loadPersistedSetting<boolean>(SETTING_INCLUDE_BOTS, false),
      errorMessage: null,
      // Map
      map: null,
      balancedSuits: loadPersistedSetting<boolean>(SETTING_BALANCED_SUITS, false),
      clearings: [],
      // Deck
      deck: null,
      // Landmarks
      landmarkCount: loadPersistedSetting<number>(SETTING_LANDMARK_COUNT, 0),
      landmarks: [],
      // Hirelings
      hirelingCount: loadPersistedSetting(SETTING_HIRELING_COUNT, defaultHirelingCount),
      hirelings: [],
      // Factions
      excludedFactions: [],
      limitVagabonds: false,
      limitCaptains: false,
    }
  },

  reducers: {
    setPlayerCount(state, { payload: playerCount }: PayloadAction<number>) {
      // Make sure the player count is valid (i.e. above 0)
      if (playerCount >= 1) {
        state.playerCount = playerCount
        state.errorMessage = null
        savePersistedSetting(SETTING_PLAYER_COUNT, playerCount)
      } else {
        console.warn(
          `Invalid payload for setPlayerCount action: ${playerCount} (Payload must be a number above 0)`,
        )
      }
    },

    fixFirstPlayer(state, { payload: fixedFirstPlayer }: PayloadAction<boolean>) {
      state.fixedFirstPlayer = fixedFirstPlayer
      state.errorMessage = null
      savePersistedSetting(SETTING_FIXED_FIRST_PLAYER, fixedFirstPlayer)
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

    setIncludeBots(state, { payload: includeBots }: PayloadAction<boolean>) {
      state.includeBots = includeBots
      state.errorMessage = null
      savePersistedSetting(SETTING_INCLUDE_BOTS, includeBots)
    },

    setErrorMessage(state, { payload: errorMessage }: PayloadAction<string | null>) {
      state.errorMessage = errorMessage
    },

    setMap(state, { payload }: PayloadAction<CodeObject>) {
      const { code: mapCode } = payload
      state.map = mapCode
    },

    setClearings(state, { payload: clearings }: PayloadAction<SetupClearing[]>) {
      state.clearings = clearings
    },

    balanceMapSuits(state, { payload: balancedSuits }: PayloadAction<boolean>) {
      state.balancedSuits = balancedSuits
      state.errorMessage = null
      savePersistedSetting(SETTING_BALANCED_SUITS, balancedSuits)
    },

    setDeck(state, { payload }: PayloadAction<CodeObject>) {
      const { code: deckCode } = payload
      state.deck = deckCode
    },

    setLandmarkCount(state, { payload: landmarkCount }: PayloadAction<number>) {
      if (landmarkCount >= 0 && landmarkCount <= MAX_LANDMARKS) {
        state.landmarkCount = landmarkCount
        state.errorMessage = null
        savePersistedSetting(SETTING_LANDMARK_COUNT, landmarkCount)
      } else {
        console.warn(
          `Invalid payload for setLandmarkCount action: ${landmarkCount} (Payload must be a number between 0 and ${MAX_LANDMARKS})`,
        )
      }
    },

    setLandmarks(state, { payload: landmarks }: PayloadAction<LandmarkCode[]>) {
      state.landmarks = landmarks
    },

    setHirelingCount(state, { payload: hirelingCount }: PayloadAction<number>) {
      if (hirelingCount === 0 || hirelingCount === HIRELING_SETUP_COUNT) {
        state.hirelingCount = hirelingCount
        state.errorMessage = null
        savePersistedSetting(SETTING_HIRELING_COUNT, hirelingCount)
      } else {
        console.warn(
          `Invalid payload for setHirelingCount action: ${hirelingCount} (Payload must either be 0 or ${HIRELING_SETUP_COUNT})`,
        )
      }
    },

    clearHirelingState(state) {
      state.hirelings = []
      state.excludedFactions = []
    },

    addHireling: {
      prepare: (hireling: WithCode<FactionExcludingComponent>) => ({
        payload: [hireling.code, hireling.excludeFactions] as const,
      }),
      reducer(
        state,
        { payload }: PayloadAction<readonly [HirelingCode, FactionCode[] | undefined]>,
      ) {
        const [hirelingCode, excludeFactions] = payload
        const existingHirelingCount = state.hirelings.length

        state.hirelings.push({
          code: hirelingCode,
          // 2 players - 0 demoted
          // 3 players - 1 demoted
          // 4 players - 2 demoted
          // 5+ players - 3 demoted
          demoted: state.playerCount + existingHirelingCount > 4,
        })
        if (excludeFactions) state.excludedFactions.push(...excludeFactions)
      },
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
        state.clearings = []
        state.deck = null
        state.landmarks = []
        state.hirelings = []
        state.errorMessage = null
      })
      // This allows us to always reset the displayed error if the user makes a separate input
      .addDefaultCase(state => {
        state.errorMessage = null
      })
  },

  selectors: {
    selectTwoPlayer: state => state.playerCount < 3,

    selectSetupClearings: state => state.clearings,

    selectSetupDeckCode: state => state.deck,

    selectSetupHirelings: state => state.hirelings,

    selectSetupLandmarks: state => state.landmarks,

    selectSetupMapCode: state => state.map,
  },
})

export const {
  setPlayerCount,
  fixFirstPlayer,
  setFirstPlayer,
  setErrorMessage,
  setMap,
  setClearings,
  balanceMapSuits,
  setDeck,
  setIncludeBots,
  setLandmarkCount,
  setLandmarks,
  setLimitCaptains,
  setLimitVagabonds,
  setHirelingCount,
  clearHirelingState,
  addHireling,
} = setupSlice.actions

export const {
  selectTwoPlayer,
  selectSetupClearings,
  selectSetupDeckCode,
  selectSetupHirelings,
  selectSetupLandmarks,
  selectSetupMapCode,
} = setupSlice.selectors

export default setupSlice.reducer
