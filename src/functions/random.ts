/**
 * Shuffles a given list in-place using the Fisher-Yates shuffle algorithm.
 *
 * @param list The list to be shuffled. Will be shuffled in-place rather than returning a copy.
 */
export const shuffleList = (list: unknown[]) => {
  // Go through the list, starting at the highest index and stopping at the second-to-last index (1)
  for (let i = list.length - 1; i > 0; i--) {
    // Generate a random number between 0 and the current index (inclusive)
    const j = Math.floor(Math.random() * (i + 1))
    // Swap index i and index j (may be the same index)
    if (i !== j) {
      const iValue = list[i]
      list[i] = list[j]
      list[j] = iValue
    }
  }
}

/**
 * Removes a random element from a given list, and then returns it.
 *
 * @param list The list of elements to be randomly selected.
 * @returns The element removed.
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
