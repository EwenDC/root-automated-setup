import type { TypedUseSelectorHook } from 'react-redux'

import { createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from './store'
import type { Faction, Vagabond, WithCode } from './types'

export const selectedFactionContext = createContext<
  (Faction & { vagabond: WithCode<Vagabond> | undefined; captains: WithCode<Vagabond>[] }) | null
>(null)

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
 * Returns a flag indicating if this component is in an invalid state (i.e. the component is within
 * the active step and there is a setup error).
 *
 * @param stepActive Whether the component is within the active step.
 */
export const useInvalid = (stepActive: boolean) =>
  useAppSelector(state => stepActive && state.setup.errorMessage != null)
