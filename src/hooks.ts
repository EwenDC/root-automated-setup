import type { TypedUseSelectorHook } from 'react-redux'

import { createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from './store'
import type { Faction, FlowSlice, Vagabond, WithCode } from './types'

export const selectedFactionContext = createContext<
  (Faction & { vagabond: WithCode<Vagabond> | undefined; captains: WithCode<Vagabond>[] }) | null
>(null)

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/** Returns the number for the player that is current for the given flow slice. */
export const usePlayerNumber = ({ playerIndex }: FlowSlice) => {
  const playerOrder = useAppSelector(state => state.setup.playerOrder)
  if (playerIndex == null) return 0
  return playerOrder[playerIndex] ?? 0
}

/**
 * Returns a flag indicating if this component is in an invalid state (i.e. the component is within
 * the active step and there is a setup error).
 *
 * @param stepActive Whether the component is within the active step.
 */
export const useInvalid = (stepActive: boolean) =>
  useAppSelector(state => stepActive && state.setup.errorMessage != null)
