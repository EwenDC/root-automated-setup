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
