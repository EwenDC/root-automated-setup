import type { TypedUseSelectorHook, UseDispatch } from 'react-redux'

import { createContext } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from './store'
import type { Faction, FlowSlice, Vagabond, WithCode } from './types'

import { resetState } from './store'

export const selectedFactionContext = createContext<
  (Faction & { vagabond: WithCode<Vagabond> | undefined; captains: WithCode<Vagabond>[] }) | null
>(null)
export const stepActiveContext = createContext(false)

export const useAppDispatch: UseDispatch<AppDispatch> = useDispatch
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

// Handles toolbar reset actions.
export const useToolbarActions = () => {
  const dispatch = useAppDispatch()
  const [confirmReset, setConfirmReset] = useState(false)

  const handleResetClick = () => {
    if (confirmReset) {
      dispatch(resetState())
      setConfirmReset(false)
      // Wipe query params when resetting so app returns to zero
      window.history.replaceState(null, '', window.location.pathname)
    } else {
      setConfirmReset(true)
    }
  }
  // Auto-cancel the reset confirmation after 3 seconds of inactivity
  useEffect(() => {
    if (confirmReset) {
      const timer = setTimeout(() => {
        setConfirmReset(false)
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
    return
  }, [confirmReset])

  return {
    confirmReset,
    handleResetClick,
  }
}
