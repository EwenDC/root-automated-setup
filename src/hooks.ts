import type { TypedUseSelectorHook } from 'react-redux'

import { createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from './store'
import type { FactionEntry } from './types'

import { selectFactionArray, selectVagabondArray } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/** Returns a function for returning the player number for a specified point in turn order. */
export const useNthLastPlayer = () => {
  const playerOrder = useAppSelector(state => state.setup.playerOrder)
  return (position: number) => {
    if (playerOrder.length > 0) {
      let index = -position
      do {
        index += playerOrder.length
      } while (index < 0)
      return playerOrder[index]
    }
    return 0
  }
}

/**
 * Generates a redux selector for getting a stable-reference version of the faction pool.
 *
 * @param factionPool The raw faction entries that will be used to generate the faction pool.
 * @returns The faction pool, with all faction and vagabond information included.
 */
export const useSelectFactionPool = (factionPool: FactionEntry[]) =>
  createSelector(selectFactionArray, selectVagabondArray, (factionArray, vagabondArray) =>
    factionPool.map(({ code, vagabond }) => ({
      ...factionArray.find(({ code: factionCode }) => factionCode === code)!,
      vagabond:
        typeof vagabond === 'string'
          ? vagabondArray.find(({ code: vagabondCode }) => vagabondCode === vagabond)
          : undefined,
    })),
  )

/**
 * Returns a flag indicating if this component is in an invalid state (i.e. the component is within
 * the active step and there is a setup error).
 *
 * @param stepActive Whether the component is within the active step.
 */
export const useInvalid = (stepActive: boolean) =>
  useAppSelector(state => stepActive && state.setup.errorMessage != null)
