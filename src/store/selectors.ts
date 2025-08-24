import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '.'
import type { FactionEntry } from '../types'

import {
  selectCaptainArray,
  selectDeckArray,
  selectFactionArray,
  selectHirelingArray,
  selectLandmarkArray,
  selectMapArray,
  selectVagabondArray,
} from './slices/components'
import {
  selectSetupClearings,
  selectSetupDeckCode,
  selectSetupHireling1Entry,
  selectSetupHireling2Entry,
  selectSetupHireling3Entry,
  selectSetupLandmark1Code,
  selectSetupLandmark2Code,
  selectSetupMapCode,
} from './slices/setup'
import { currySelector } from './utils'

/** Returns the object for the map selected in setup. */
export const selectSetupMap = createSelector(
  selectSetupMapCode,
  selectSetupClearings,
  selectMapArray,
  selectLandmarkArray,
  (mapCode, setupClearings, mapArray, landmarkArray) => {
    const setupMap = mapArray.find(({ code }) => code === mapCode)
    // Inject the landmark data too
    return (
      setupMap && {
        ...setupMap,
        clearings: setupMap.clearings.map(({ x, y }, index) => {
          const setupClearing = setupClearings[index]!
          return {
            x,
            y,
            ...setupClearing,
            suitLandmark:
              setupClearing.suitLandmark &&
              landmarkArray.find(({ code }) => code === setupClearing.suitLandmark),
          }
        }),
        landmark: setupMap.landmark && {
          ...landmarkArray.find(({ code }) => code === setupMap.landmark!.code)!,
          ...setupMap.landmark,
        },
      }
    )
  },
)

/** Returns the object for the deck selected in setup. */
export const selectSetupDeck = createSelector(
  selectSetupDeckCode,
  selectDeckArray,
  (deckCode, deckArray) => deckArray.find(({ code }) => code === deckCode),
)

/** Returns the object for the first landmark selected in setup. */
export const selectSetupLandmark1 = createSelector(
  selectSetupLandmark1Code,
  selectLandmarkArray,
  (landmarkCode, landmarkArray) => landmarkArray.find(({ code }) => code === landmarkCode),
)

/** Returns the object for the second landmark selected in setup. */
export const selectSetupLandmark2 = createSelector(
  selectSetupLandmark2Code,
  selectLandmarkArray,
  (landmarkCode, landmarkArray) => landmarkArray.find(({ code }) => code === landmarkCode),
)

/** Returns the object for the first hireling selected in setup. */
export const selectSetupHireling1 = createSelector(
  selectSetupHireling1Entry,
  selectHirelingArray,
  (hirelingEntry, hirelingArray) =>
    hirelingEntry && {
      ...hirelingArray.find(({ code }) => code === hirelingEntry.code)!,
      ...hirelingEntry,
    },
)

/** Returns the object for the second hireling selected in setup. */
export const selectSetupHireling2 = createSelector(
  selectSetupHireling2Entry,
  selectHirelingArray,
  (hirelingEntry, hirelingArray) =>
    hirelingEntry && {
      ...hirelingArray.find(({ code }) => code === hirelingEntry.code)!,
      ...hirelingEntry,
    },
)

/** Returns the object for the third hireling selected in setup. */
export const selectSetupHireling3 = createSelector(
  selectSetupHireling3Entry,
  selectHirelingArray,
  (hirelingEntry, hirelingArray) =>
    hirelingEntry && {
      ...hirelingArray.find(({ code }) => code === hirelingEntry.code)!,
      ...hirelingEntry,
    },
)

/** Returns the faction pool, with all faction, vagabond, and captain information included. */
export const selectFactionPoolFull = currySelector(
  createSelector(
    (_state: RootState, factionPool: FactionEntry[]) => factionPool,
    selectFactionArray,
    selectVagabondArray,
    selectCaptainArray,
    (factionPool, factionArray, vagabondArray, captainArray) =>
      factionPool.map(({ code, vagabond, captains }) => ({
        ...factionArray.find(({ code: factionCode }) => factionCode === code)!,
        vagabond:
          typeof vagabond === 'string'
            ? vagabondArray.find(({ code: vagabondCode }) => vagabondCode === vagabond)
            : undefined,
        captains: Array.isArray(captains)
          ? captains.map(
              captain => captainArray.find(({ code: captainCode }) => captainCode === captain)!,
            )
          : [],
      })),
  ),
)
