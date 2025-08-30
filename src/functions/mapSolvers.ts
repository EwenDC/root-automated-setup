import type { ClearingSuit, FloodGroup, LandmarkCode, LargeMap, StandardMap } from '../types'

import { STANDARD_MAP_SIZE, SUIT_CLEARING_COUNT } from '../constants'
import { shuffleList, takeRandom } from './random'
import { typedEntries } from './typed'

interface SetupSuitClearing {
  flooded?: false
  ruin?: boolean
  suit: ClearingSuit
  suitLandmark?: LandmarkCode
}

export type SetupClearing =
  | SetupSuitClearing
  | { flooded: true; ruin?: false; suit?: never; suitLandmark?: never }

/** Picks what clearings to flood when shrinking a large map. */
const pickFloodedClearings = (map: LargeMap): Set<number> => {
  // Collect the flood groups and their associated clearings
  const floodGroups = map.clearings.reduce<Record<FloodGroup, number[]>>(
    (floodGroups, { floodGroup }, index) => {
      if (floodGroup) floodGroups[floodGroup].push(index)
      return floodGroups
    },
    { circle: [], square: [], triangle: [] },
  )
  // Pick one clearing to be flooded from each group
  const floodedIndexes = new Set<number>()
  for (const floodGroup of Object.values(floodGroups)) {
    floodedIndexes.add(takeRandom(floodGroup))
  }
  return floodedIndexes
}

export const isLargeMap = <T extends LargeMap | StandardMap>(map: T): map is LargeMap & T =>
  map.clearings.length > STANDARD_MAP_SIZE

export const solveMapBalanced = (map: LargeMap | StandardMap, floodClearings: boolean) => {
  let attempts: number
  const maxAttempts = 1000
  const result: SetupClearing[] = []

  // Do this in a loop as there is a chance the solver fails. I have never seen this solver take
  // more than 5 attempts, so exceeding 1000 indicates almost 100% probability of an infinite loop.
  solveAttempts: for (attempts = 0; attempts < maxAttempts; attempts++) {
    // Clear old result if we're logging failed attempts
    if (import.meta.env.DEV) result.length = 0

    // First, keep track of all clearings, the clearings they connect to, and a list of valid suits for each clearing
    let unassignedClearings = map.clearings.map(({ floodGroup, ruin, fallbackRuin }, index) => ({
      index,
      floodGroup,
      ruin,
      fallbackRuin,
      links: map.paths.reduce((list, [a, b, floods]) => {
        if (a === index) list.set(b, !floods)
        if (b === index) list.set(a, !floods)
        return list
      }, new Map<number, boolean>()),
      options: ['fox', 'mouse', 'rabbit'] as ClearingSuit[],
    }))

    // Perform special handling for large maps (either flooding clearings or dealing suit landmarks)
    if (isLargeMap(map)) {
      // Assign flooded clearings if player count is too low
      if (floodClearings) {
        const floodedIndexes = pickFloodedClearings(map)
        const remappedLinks = new Map<number, number[]>()

        // Remove flooded clearings from the pool and add them to the result
        unassignedClearings = unassignedClearings.reduce<typeof unassignedClearings>(
          (list, clearing) => {
            if (floodedIndexes.has(clearing.index)) {
              // Add flooded clearing to final result
              result[clearing.index] = {
                flooded: true,
              }
              // Save it's connections so we can remap them later
              const links = Array.from(clearing.links.keys()).filter(
                // Do not remap flooding connections, as they get disconnected
                link => clearing.links.get(link),
              )
              remappedLinks.set(clearing.index, links)
            } else {
              // Keep remaining clearings in the pool
              list.push(clearing)
            }
            return list
          },
          [],
        )

        // Remap connections that originally linked to flooded clearings
        for (const dryClearing of unassignedClearings) {
          for (const [floodedIndex, newLinks] of remappedLinks) {
            // Skip remapping step if there's no connection or it's flooded
            if (dryClearing.links.get(floodedIndex)) {
              for (const link of newLinks) {
                if (dryClearing.index !== link) dryClearing.links.set(link, true)
              }
            }
            // Delete the old connection in case it was there
            dryClearing.links.delete(floodedIndex)
          }
        }
      } else {
        // Assign the clearings that will use a suit landmark
        const landmarks = typedEntries(map.suitLandmarks)
        // Ensure landmarks don't get placed next to each other
        const landmarkNeighbors = new Set<number>()

        // Randomly assign suit landmarks by shuffling clearings then checking one-by-one if we can assign
        shuffleList(unassignedClearings)
        unassignedClearings = unassignedClearings.reduce<typeof unassignedClearings>(
          (list, clearing) => {
            // Assign landmark if any are left and clearing doesn't neighbor existing landmark
            // Don't bother checking suit, as there is only one landmark per suit
            if (landmarks.length > 0 && !landmarkNeighbors.has(clearing.index)) {
              const [suit, suitLandmark] = landmarks.pop()!
              // Add landmark clearing to the final result
              result[clearing.index] = {
                ruin: clearing.ruin,
                suit,
                suitLandmark,
              }
              // Remove the landmark suit from all neighbor options, and exclude neighbors from having landmarks
              for (const neighbor of unassignedClearings) {
                if (clearing.links.has(neighbor.index)) {
                  landmarkNeighbors.add(neighbor.index)
                  neighbor.options = neighbor.options.filter(s => s !== suit)
                  // Unlink the assigned clearing so we don't consider it's connection for the entropy calculation
                  neighbor.links.delete(clearing.index)
                }
              }
            } else {
              list.push(clearing)
            }
            return list
          },
          [],
        )

        // In the (probably impossible) chance we failed to assign all landmark suits, reset
        if (landmarks.length > 0) {
          console.info(
            'Failed to solve for balanced suit landmarks. Fail state:',
            [...result],
            unassignedClearings,
          )
          continue solveAttempts
        }
      }
    }

    const suitCounts: Record<ClearingSuit, number> = {
      fox: 0,
      mouse: 0,
      rabbit: 0,
    }

    // Assign each clearing one-by-one, favouring clearings with the least amount of valid options
    // and tie breaking on most connections to unassigned clearings.
    while (unassignedClearings.length > 0) {
      let leastEntropy = Infinity
      let mostLinks = -Infinity
      const candidates = unassignedClearings.reduce((list: number[], { options, links }, index) => {
        // Short circuit if the solver failed
        if (leastEntropy < 1) return list
        // If our entropy is higher don't include as candidate
        if (
          options.length > leastEntropy ||
          (options.length === leastEntropy && links.size < mostLinks)
        ) {
          return list
        }
        // If our entropy is the same add as a candidate
        if (options.length === leastEntropy && links.size === mostLinks) {
          list.push(index)
          return list
        }
        // Our entropy is lower, throw out the current candidate list and start again with just us
        leastEntropy = options.length
        mostLinks = links.size
        return [index]
      }, [])

      // If we've hit 0 entropy then the solver failed
      if (leastEntropy < 1) {
        console.info(
          'Failed to solve for balanced suits. Fail state:',
          [...result],
          unassignedClearings,
        )
        continue solveAttempts
      }

      // Randomly pick a candidate and remove it from the remaining clearings
      const unassignedClearingIndex = takeRandom(candidates)
      const nextClearing = unassignedClearings.splice(unassignedClearingIndex, 1)[0]!

      // Assign a suit based off the valid options for the chosen clearing, and keep track of how many of each we've assigned
      const nextSuit = takeRandom(nextClearing.options)
      result[nextClearing.index] = {
        suit: nextSuit,
        // Use fallback ruins when flooding clearings
        ruin: floodClearings ? nextClearing.ruin || nextClearing.fallbackRuin : nextClearing.ruin,
      }
      suitCounts[nextSuit]++

      // Remove the assigned suit from all neighboring clearings, or all clearings if we've hit the maximum amount for one suit
      for (const clearing of unassignedClearings) {
        clearing.options = clearing.options.filter(
          suit =>
            suitCounts[suit] < SUIT_CLEARING_COUNT &&
            (suit !== nextSuit || !clearing.links.has(nextClearing.index)),
        )
        // Unlink the solved clearing so we don't consider it's connection for the entropy calculation
        clearing.links.delete(nextClearing.index)
      }
    }

    // If we made it here, then we succeeded and can exit the loop
    break
  }

  // Check if we hit the max attempts without solving
  if (attempts >= maxAttempts) {
    throw new Error('Entered infinite loop while trying to solve for balanced suits')
  }
  return result
}

export const solveMapRandom = (map: LargeMap | StandardMap, floodClearings: boolean) => {
  const result: SetupClearing[] = []
  const clearingPool: SetupSuitClearing[] = [
    { suit: 'fox' },
    { suit: 'fox' },
    { suit: 'fox' },
    { suit: 'fox' },
    { suit: 'mouse' },
    { suit: 'mouse' },
    { suit: 'mouse' },
    { suit: 'mouse' },
    { suit: 'rabbit' },
    { suit: 'rabbit' },
    { suit: 'rabbit' },
    { suit: 'rabbit' },
  ]

  if (isLargeMap(map)) {
    // Use special setup for flooded clearing assignment if required
    if (floodClearings) {
      const floodedIndexes = pickFloodedClearings(map)
      for (let index = 0; index < map.clearings.length; index++) {
        const clearing = map.clearings[index]!
        result[index] = floodedIndexes.has(index)
          ? { flooded: true }
          : {
              ...takeRandom(clearingPool),
              ruin: clearing.ruin || clearing.fallbackRuin,
            }
      }
      return result
    }

    // Add suit landmarks to random pool since we're playing with all 15 clearings
    clearingPool.push(
      { suit: 'fox', suitLandmark: map.suitLandmarks.fox },
      { suit: 'mouse', suitLandmark: map.suitLandmarks.mouse },
      { suit: 'rabbit', suitLandmark: map.suitLandmarks.rabbit },
    )
  }

  // Do straightforward random assignment
  for (let index = 0; index < map.clearings.length; index++) {
    result[index] = { ...takeRandom(clearingPool), ruin: map.clearings[index]?.ruin }
  }
  return result
}
