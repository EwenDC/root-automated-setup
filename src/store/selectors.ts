import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '.'
import type { FlowSlice } from '../types'

import {
  selectCaptainArray,
  selectDeckArray,
  selectFactionArray,
  selectHirelingArray,
  selectLandmarkArray,
  selectMapArray,
  selectVagabondArray,
} from './slices/components'
import { selectSetupClearings, selectSetupDeckCode, selectSetupMapCode } from './slices/setup'
import { currySelector } from './utils'

/** Returns the faction pool, with all faction, vagabond, and captain information included. */
export const selectFactionPoolFull = currySelector(
  createSelector(
    (_state: RootState, flowSlice: FlowSlice) => flowSlice.factionPool,
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

/** Returns the hireling pool with all hireling information included. */
export const selectHirelingPoolFull = currySelector(
  createSelector(
    (_state: RootState, flowSlice: FlowSlice) => flowSlice.hirelingPool,
    selectHirelingArray,
    (hirelingPool, hirelingArray) =>
      hirelingPool.map(entry => ({
        ...hirelingArray.find(({ code: hirelingCode }) => hirelingCode === entry.code)!,
        ...entry,
      })),
  ),
)

/** Returns the landmark pool with all landmark information included. */
export const selectLandmarkPoolFull = currySelector(
  createSelector(
    (_state: RootState, flowSlice: FlowSlice) => flowSlice.landmarkPool,
    selectLandmarkArray,
    (landmarkPool, landmarkArray) =>
      landmarkPool.map(
        code => landmarkArray.find(({ code: landmarkCode }) => landmarkCode === code)!,
      ),
  ),
)

/** Returns the object for the deck selected in setup. */
export const selectSetupDeck = createSelector(
  selectSetupDeckCode,
  selectDeckArray,
  (deckCode, deckArray) => deckArray.find(({ code }) => code === deckCode),
)

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
