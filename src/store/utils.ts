import { createSelector, type PayloadAction } from '@reduxjs/toolkit'

import type { Expansion, ValueOf, WithCode } from '../types'
import type { ComponentsState } from './slices/components'

import definitions from '../componentDefinitions'
import { loadPersistedSetting, savePersistedSetting } from '../functions/persistedSettings'

/**
 * Helper for converting a selector to a curried function (i.e. a function returning another
 * function). Allows passing other selector parameters separately from the state parameter.
 *
 * @param selector The selector to be converted to a curried function.
 * @returns A function that takes arguments and returns a selector.
 */
export const currySelector =
  <S, A extends unknown[], R>(selector: (state: S, ...args: A) => R) =>
  (...args: A) =>
  (state: S) =>
    selector(state, ...args)

/**
 * Function for creating a reducer that updates the locked state for a given component type.
 *
 * @param componentType The key the component type is stored under in the "components" redux slice.
 */
export const lockComponent = (componentType: keyof ComponentsState) => ({
  prepare: (...payload: [componentCode: string, locked: false | string]) => ({ payload }),
  reducer(state: ComponentsState, { payload }: PayloadAction<[string, false | string]>) {
    const [componentCode, locked] = payload
    const component = state[componentType][componentCode]
    if (component) {
      component.locked = locked
      component.enabled = locked
        ? false
        : loadPersistedSetting<boolean>(`${componentType}.${componentCode}`, true)
    } else {
      console.warn(
        `Invalid payload for lock${componentType.charAt(0).toUpperCase()}${componentType.slice(1)} action:`,
        payload,
        '(No component exists with provided code)',
      )
    }
  },
})

/**
 * Function for creating a Redux Selector for returning a component list as an array, moving the
 * component key to the component field "code"
 *
 * @param componentType The key the list of components is stored under in the "components" redux
 *   slice.
 */
export const selectComponentArray = <C extends keyof ComponentsState & keyof Expansion>(
  componentType: C,
) =>
  createSelector(
    (state: ComponentsState) => state[componentType],
    componentList => {
      const array: unknown[] = []
      for (const [code, componentInfo] of Object.entries(componentList)) {
        const componentData = definitions[componentInfo.expansionCode]?.[componentType]?.[code]
        array.push({ ...componentData, ...componentInfo, code })
      }
      return array as WithCode<ValueOf<ComponentsState[C]> & ValueOf<Expansion[C]>>[]
    },
  )

/**
 * Function for creating a reducer that toggles the enable state for a given component type.
 *
 * @param componentType The key the component type is stored under in the "components" redux slice.
 */
export const toggleComponent =
  (componentType: keyof ComponentsState) =>
  (state: ComponentsState, { payload: componentCode }: PayloadAction<string>) => {
    const component = state[componentType][componentCode]
    if (component) {
      const newState = !component.enabled
      component.enabled = newState
      savePersistedSetting(`${componentType}.${componentCode}`, newState)
    } else {
      console.warn(
        `Invalid payload for ${componentType} toggle action: ${componentCode} (No component exists with provided code)`,
      )
    }
  }

// ==========================================
// URL SYNC LOGIC
// ==========================================

export interface SyncableState {
  setup: {
    playerCount: number
    landmarkCount: number
    hirelingCount: number
    fixedFirstPlayer: boolean
    balancedSuits: boolean
    limitCaptains: boolean
    limitVagabonds: boolean
    deck: string | null
  }
  components: {
    expansions: Record<string, { enabled?: boolean }>
    factions: Record<string, { enabled?: boolean }>
  }
}

export interface ParsedUrlParams {
  playerCount?: number
  landmarkCount?: number
  hirelingCount?: number
  fixedFirstPlayer?: boolean
  balancedSuits?: boolean
  limitCaptains?: boolean
  limitVagabonds?: boolean
  deck?: string
  expansions?: string[]
  factions?: string[]
}

const safeParseInt = (val: string | null): number | undefined => {
  if (!val) return undefined
  const num = parseInt(val, 10)
  return isNaN(num) ? undefined : num
}

export const serializeStateToUrlParams = (state: SyncableState): string => {
  const params = new URLSearchParams()
  const { setup, components } = state

  // -- NUMBERS --
  params.set('playerCount', setup.playerCount.toString())
  params.set('landmarkCount', setup.landmarkCount.toString())
  params.set('hirelingCount', setup.hirelingCount.toString())

  // -- BOOLEANS --
  params.set('fixedFirstPlayer', String(setup.fixedFirstPlayer))
  params.set('balancedSuits', String(setup.balancedSuits))
  params.set('limitCaptains', String(setup.limitCaptains))
  params.set('limitVagabonds', String(setup.limitVagabonds))

  // -- STRINGS --
  if (setup.deck) params.set('deck', setup.deck)

  // -- ARRAYS --
  const activeExpansions = Object.entries(components.expansions)
    .filter(([_, data]) => data.enabled)
    .map(([code]) => code)
  params.set('expansions', activeExpansions.join(','))

  const activeFactions = Object.entries(components.factions)
    .filter(([_, data]) => data.enabled)
    .map(([code]) => code)
  params.set('factions', activeFactions.join(','))

  return params.toString()
}

export const deserializeUrlParams = (queryString: string): ParsedUrlParams => {
  const urlParams = new URLSearchParams(queryString)
  const parsed: ParsedUrlParams = {}

  //- NUMBERS -//
  parsed.playerCount = safeParseInt(urlParams.get('playerCount'))
  parsed.landmarkCount = safeParseInt(urlParams.get('landmarkCount'))
  parsed.hirelingCount = safeParseInt(urlParams.get('hirelingCount'))

  //- BOOLS -//
  if (urlParams.has('fixedFirstPlayer'))
    parsed.fixedFirstPlayer = urlParams.get('fixedFirstPlayer') === 'true'
  if (urlParams.has('limitCaptains'))
    parsed.limitCaptains = urlParams.get('limitCaptains') === 'true'
  if (urlParams.has('limitVagabonds'))
    parsed.limitVagabonds = urlParams.get('limitVagabonds') === 'true'
  if (urlParams.has('balancedSuits'))
    parsed.balancedSuits = urlParams.get('balancedSuits') === 'true'

  //- STRINGS -//
  if (urlParams.has('deck')) parsed.deck = urlParams.get('deck')!

  //- ARRAYS -//
  if (urlParams.has('expansions'))
    parsed.expansions = urlParams
      .get('expansions')!
      .split(',')
      .filter(Boolean)
  if (urlParams.has('factions'))
    parsed.factions = urlParams
      .get('factions')!
      .split(',')
      .filter(Boolean)

  return parsed
}
