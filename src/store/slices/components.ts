import type { PayloadAction } from '@reduxjs/toolkit'

import { createSelector, createSlice } from '@reduxjs/toolkit'

import type {
  ComponentInfo,
  DeckCode,
  DeepReadonly,
  Expansion,
  ExpansionCode,
  FactionCode,
  GameComponent,
  HirelingCode,
  LandmarkCode,
  MapCode,
  MapInfo,
  Togglable,
  VagabondCode,
} from '../../types'

import definitions from '../../componentDefinitions'
import { COMPONENT_TYPES, FIXED_SUIT_KEY, USE_LANDMARK_KEY } from '../../constants'
import { loadPersistedSetting, savePersistedSetting } from '../../functions/persistedSettings'
import { typedEntries } from '../../functions/typed'
import { lockComponent, selectComponentArray, toggleComponent } from '../utils'

/** Object tracking which components are available for selection. */
export interface ComponentsState {
  captains: Record<VagabondCode, ComponentInfo>
  expansions: Record<ExpansionCode, GameComponent & Togglable>
  decks: Record<DeckCode, ComponentInfo>
  factions: Record<FactionCode, ComponentInfo>
  hirelings: Record<HirelingCode, ComponentInfo>
  landmarks: Record<LandmarkCode, ComponentInfo>
  maps: Record<MapCode, MapInfo>
  vagabonds: Record<VagabondCode, ComponentInfo>
}

const addExpansionComponents = (
  state: ComponentsState,
  expansionCode: string,
  expansionContent: DeepReadonly<Expansion>,
) => {
  for (const componentType of COMPONENT_TYPES) {
    const componentList = expansionContent[componentType]
    if (!componentList) continue

    for (const [componentCode, componentData] of typedEntries(componentList)) {
      const componentInfo: MapInfo = {
        enabled: loadPersistedSetting(
          `${componentType}.${componentCode}`,
          !componentData.defaultDisabled,
        ),
        locked: false,
        expansionCode,
      }
      if ('defaultSuits' in componentData)
        componentInfo.fixedSuits = loadPersistedSetting<boolean>(
          `${componentType}.${componentCode}.${FIXED_SUIT_KEY}`,
          false,
        )
      if ('landmark' in componentData)
        componentInfo.useLandmark = loadPersistedSetting<boolean>(
          `${componentType}.${componentCode}.${USE_LANDMARK_KEY}`,
          true,
        )

      state[componentType][componentCode] = componentInfo
    }
  }
}

export const componentsSlice = createSlice({
  name: 'components',

  initialState: () => {
    const initialState: ComponentsState = {
      captains: {},
      expansions: {},
      decks: {},
      factions: {},
      hirelings: {},
      landmarks: {},
      maps: {},
      vagabonds: {},
    }
    for (const [expansionCode, expansion] of typedEntries(definitions)) {
      const enabled = loadPersistedSetting(
        `expansions.${expansionCode}`,
        !expansion.defaultDisabled,
      )
      initialState.expansions[expansionCode] = {
        enabled,
        locked: false,
        image: expansion.image,
      }
      // Add expansion components to state if the expansion is enabled
      if (enabled) addExpansionComponents(initialState, expansionCode, expansion)
    }
    return initialState
  },

  reducers: {
    toggleCaptain: toggleComponent('captains'),

    toggleExpansion(state, { payload: expansionCode }: PayloadAction<string>) {
      const expansion = state.expansions[expansionCode]
      if (expansion) {
        // Toggle enable state and persist change
        expansion.enabled = !expansion.enabled
        savePersistedSetting(`expansions.${expansionCode}`, expansion.enabled)

        if (expansion.enabled) {
          // The expansion was just enabled, add it's components to our component list. We know the
          // expansion content will exist because we used componentDefinitions to create the
          // expansion state.
          addExpansionComponents(state, expansionCode, definitions[expansionCode]!)
        } else {
          // The expansion was just disabled, delete any components that came from it
          for (const componentType of COMPONENT_TYPES) {
            const componentList = state[componentType]
            for (const [componentCode, component] of typedEntries(componentList)) {
              if (component.expansionCode === expansionCode) {
                delete state[componentType][componentCode]
              }
            }
          }
        }
      } else {
        console.warn(
          `Invalid payload for toggleExpansion action: ${expansionCode} (No expansion exists with provided code)`,
        )
      }
    },

    toggleDeck: toggleComponent('decks'),

    toggleFaction: toggleComponent('factions'),

    lockFaction: lockComponent('factions'),

    toggleHireling: toggleComponent('hirelings'),

    lockHireling: lockComponent('hirelings'),

    toggleLandmark: toggleComponent('landmarks'),

    lockLandmark: lockComponent('landmarks'),

    toggleMap: toggleComponent('maps'),

    lockMap: lockComponent('maps'),

    enableMapLandmark(
      state,
      { payload }: PayloadAction<[mapCode: MapCode, enableLandmark: boolean]>,
    ) {
      const [mapCode, enableLandmark] = payload
      const map = state.maps[mapCode]
      if (map) {
        map.useLandmark = enableLandmark
        savePersistedSetting(`maps.${mapCode}.${USE_LANDMARK_KEY}`, enableLandmark)
      } else {
        console.warn(
          'Invalid payload for enableMapLandmark action:',
          payload,
          '(No map exists with provided code)',
        )
      }
    },

    mapFixedSuits(state, { payload }: PayloadAction<[mapCode: MapCode, fixedSuits: boolean]>) {
      const [mapCode, fixedSuits] = payload
      const map = state.maps[mapCode]
      if (map) {
        map.fixedSuits = fixedSuits
        savePersistedSetting(`maps.${mapCode}.${FIXED_SUIT_KEY}`, fixedSuits)
      } else {
        console.warn(
          'Invalid payload for mapFixedSuits action:',
          payload,
          '(No map exists with provided code)',
        )
      }
    },

    toggleVagabond: toggleComponent('vagabonds'),
  },

  selectors: {
    selectCaptainArray: selectComponentArray('captains'),

    selectExpansionArray: createSelector(
      (state: ComponentsState) => state.expansions,
      expansions =>
        Object.entries(expansions).map(([code, expansionInfo]) => ({ ...expansionInfo, code })),
    ),

    selectDeckArray: selectComponentArray('decks'),

    selectFactionArray: selectComponentArray('factions'),

    selectFactionCodes: createSelector(
      (state: ComponentsState) => state.factions,
      factions => new Set(Object.keys(factions)),
    ),

    selectHirelingArray: selectComponentArray('hirelings'),

    selectLandmarkArray: selectComponentArray('landmarks'),

    selectMapArray: selectComponentArray('maps'),

    selectVagabondArray: selectComponentArray('vagabonds'),
  },
})

export const {
  enableMapLandmark,
  lockFaction,
  lockHireling,
  lockLandmark,
  lockMap,
  mapFixedSuits,
  toggleCaptain,
  toggleExpansion,
  toggleDeck,
  toggleFaction,
  toggleHireling,
  toggleLandmark,
  toggleMap,
  toggleVagabond,
} = componentsSlice.actions

export const {
  selectCaptainArray,
  selectExpansionArray,
  selectDeckArray,
  selectFactionArray,
  selectFactionCodes,
  selectHirelingArray,
  selectLandmarkArray,
  selectMapArray,
  selectVagabondArray,
} = componentsSlice.selectors

export default componentsSlice.reducer
