import { createSelector, type PayloadAction } from '@reduxjs/toolkit'

import type {
  ComponentsState,
  Expansion,
  LockComponentPayload,
  Togglable,
  ValueOf,
  WithCode,
} from '../types'

import content from '../content'

/**
 * Function for counting how many elements in an array match a condition.
 *
 * @param array The array to count the matching elements of.
 * @param matcher A matching function returning a boolean to indicate if a value should be counted.
 * @returns The number of elements in the array that return true when passed into the matcher
 *   function.
 */
export const countMatches = <T>(array: T[], matcher: (value: T) => boolean) =>
  array.reduce((count, value) => count + (matcher(value) ? 1 : 0), 0)

/**
 * Function to return the state of a given setup setting from localStorage, for the purpose of
 * setting up the initial redux state.
 *
 * @param settingKey The key of the setting to check, as stored in localStorage.
 * @param defaultValue The default setting value to use if no setting is in localStorage.
 */
export const loadPersistedSetting = <T>(settingKey: string, defaultValue: T) => {
  // Load the current enable state from localStorage so we remember user settings
  const storedVal = localStorage.getItem(settingKey)

  // Was there a value stored in localStorage?
  if (storedVal != null) {
    try {
      // Parse the string stored in localStorage
      const parsedValue = JSON.parse(storedVal) as unknown

      // Only use it if it matches the expected type
      if (typeof parsedValue === typeof defaultValue) {
        return parsedValue as T
      } else {
        console.warn(
          `Saved state of ${storedVal} for setting ${settingKey} is of incorrect type (expected ${typeof defaultValue} got ${typeof parsedValue})`,
        )
      }
    } catch (error: unknown) {
      console.warn(`Failed to parse saved state of ${storedVal} for setting ${settingKey}`, error)
    }
  }

  // Default value, then save that state to localStorage for future
  savePersistedSetting(settingKey, defaultValue)
  return defaultValue
}

/**
 * Function for creating a reducer that updates the locked state for a given component type.
 *
 * @param componentType The key the component type is stored under in the "components" redux slice.
 */
export const lockComponent = (componentType: keyof ComponentsState) => ({
  prepare: (componentCode: string, locked: false | string) => ({
    payload: { componentCode, locked },
  }),
  reducer(state: ComponentsState, { payload }: PayloadAction<LockComponentPayload>) {
    const { componentCode, locked } = payload
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
 * Saves the enable/disable state of the specified setting to localStorage.
 *
 * @param settingKey The key of the setting to save, as stored in localStorage.
 * @param value The value to save.
 */
export const savePersistedSetting = (settingKey: string, value: unknown) => {
  try {
    localStorage.setItem(settingKey, JSON.stringify(value))
  } catch (error: unknown) {
    console.warn(
      `Failed to persist state of ${JSON.stringify(value)} for setting ${settingKey}`,
      error,
    )
  }
}

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
        const componentData = content[componentInfo.expansionCode]?.[componentType]?.[code]
        array.push({ ...componentData, ...componentInfo, code })
      }
      return array as WithCode<ValueOf<ComponentsState[C]> & ValueOf<Expansion[C]>>[]
    },
  )

/** Filters out disabled components from a given component array. */
export const selectEnabled = <T extends Togglable>(array: T[]) =>
  array.filter(({ enabled }) => enabled)

/**
 * Removes a random element from a given list, and then returns it.
 *
 * @param list The list of elements to be randomly selected.
 */
export const takeRandom = <T>(list: T[]): T => {
  // Get a random index in the given list (i.e. between 0 inclusive and list.length exclusive)
  const i = Math.floor(Math.random() * list.length)
  // Save value at given index so we can return it
  const returnVal = list[i]!
  // Delete 1 element starting at chosen index
  list.splice(i, 1)
  return returnVal
}

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
        `Invalid payload for toggle${componentType.charAt(0).toUpperCase()}${componentType.slice(1)} action: ${componentCode} (No component exists with provided code)`,
      )
    }
  }

/**
 * Returns a typed array of key/values of the enumerable properties of an object.
 *
 * @param o Object that contains the properties and methods. This can be an object that you created
 *   or an existing Document Object Model (DOM) object.
 */
export const typedEntries = Object.entries as <T, K = keyof T>(
  o: T,
) => (K extends keyof T ? [K, T[K]] : [K, T[keyof T]])[]
