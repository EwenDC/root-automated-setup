import type { Togglable } from '../types'

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
 * Filters out disabled components from a given component array.
 *
 * @param array An array of game components with an enabled state.
 * @returns A copy of the array with only enabled components included.
 */
export const getEnabled = <T extends Togglable>(array: T[]) =>
  array.filter(({ enabled }) => enabled)
