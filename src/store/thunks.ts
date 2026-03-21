import type { UnknownAction } from '@reduxjs/toolkit'

import type { AppDispatch, AppThunk, RootState } from '../store'
import type { Togglable, WithCode } from '../types'

import {
  balanceMapSuits,
  fixFirstPlayer,
  resetState,
  selectExpansionArray,
  selectFactionArray,
  setDeck,
  setHirelingCount,
  setLandmarkCount,
  setLimitCaptains,
  setLimitVagabonds,
  setPlayerCount,
  toggleExpansion,
  toggleFaction,
} from '../store'
import { setCurrentPlayerIndex } from './slices/flow'
import { deserializeUrlParams } from './utils'

/**
 * Thunk action for toggling all unlocked components of a type, ensuring they match the desired
 * enable state.
 *
 * @param selectComponentArray Selector for the list of components you wish to toggle.
 * @param enabled What enable state you wish for all of the unlocked components in the array to
 *   have.
 * @param toggleComponent Action creator for dispatching the toggle component action for the given
 *   components.
 */
export const massComponentToggle =
  <T extends Togglable>(
    selectComponentArray: (state: RootState) => WithCode<T>[],
    enabled: ((component: WithCode<T>) => boolean) | boolean,
    toggleComponent: (code: string) => AppThunk | UnknownAction,
  ): AppThunk =>
  (dispatch, getState) => {
    selectComponentArray(getState()).forEach(component => {
      // Determine the desired enable state for the component
      const desiredEnabled = typeof enabled === 'function' ? enabled(component) : enabled
      // If the component is not locked and does not match the desired enable state, then toggle it
      if (!component.locked && component.enabled !== desiredEnabled) {
        dispatch(toggleComponent(component.code))
      }
    })
  }

/**
 * Thunk action for (un)locking multiple components at a time, dispatching the minimum amount of
 * actions to do so.
 *
 * @param selectComponentArray Selector for the list of components you wish to update.
 * @param componentLock A function returning the lock state for a given component.
 * @param lockComponent Action creator for dispatching the lock component action for the given
 *   components.
 */
export const massComponentLock =
  <T extends Togglable>(
    selectComponentArray: (state: RootState) => WithCode<T>[],
    componentLock: (component: WithCode<T>) => false | string,
    lockComponent: (code: string, locked: false | string) => AppThunk | UnknownAction,
  ): AppThunk =>
  (dispatch, getState) => {
    selectComponentArray(getState()).forEach(component => {
      // Calculate what the locked state of the component should be
      const locked = componentLock(component)
      // If the desired state does not match the actual state, fix it
      if (component.locked !== locked) {
        dispatch(lockComponent(component.code, locked))
      }
    })
  }

/**
 * Thunk action for decrementing the current player index, wrapping around to the last player if the
 * index drops below 0, and setting the index to the last player if it is null.
 */
export const goBackInPlayerTurnOrder = (): AppThunk => (dispatch, getState) => {
  const { flow, setup } = getState()

  let newPlayerIndex: number
  if (flow.currentPlayerIndex == null) {
    newPlayerIndex = setup.playerCount - 1
  } else {
    newPlayerIndex = flow.currentPlayerIndex - 1
    if (newPlayerIndex < 0) newPlayerIndex += setup.playerCount
  }
  dispatch(setCurrentPlayerIndex(newPlayerIndex))
}

export const hydrateSetupFromUrlParams = () => (dispatch: AppDispatch) => {
  const queryString = window.location.search
  if (!queryString) return

  const parsed = deserializeUrlParams(queryString)
  dispatch(resetState())

  //- NUMBERS -//
  if (parsed.playerCount !== undefined) dispatch(setPlayerCount(parsed.playerCount))
  if (parsed.landmarkCount !== undefined) dispatch(setLandmarkCount(parsed.landmarkCount))
  if (parsed.hirelingCount !== undefined) dispatch(setHirelingCount(parsed.hirelingCount))

  //- BOOLS -//
  if (parsed.fixedFirstPlayer !== undefined) dispatch(fixFirstPlayer(parsed.fixedFirstPlayer))
  if (parsed.balancedSuits !== undefined) dispatch(balanceMapSuits(parsed.balancedSuits))
  if (parsed.limitCaptains !== undefined) dispatch(setLimitCaptains(parsed.limitCaptains))
  if (parsed.limitVagabonds !== undefined) dispatch(setLimitVagabonds(parsed.limitVagabonds))

  //- STRINGS -//
  if (parsed.deck) dispatch(setDeck({ code: parsed.deck }))

  //- ARRAYS -//
  if (parsed.expansions) {
    dispatch(
      massComponentToggle(
        selectExpansionArray,
        expansion => parsed.expansions!.includes(expansion.code) || expansion.code === 'root',
        toggleExpansion,
      ),
    )
  }

  if (parsed.factions) {
    dispatch(
      massComponentToggle(
        selectFactionArray,
        faction => parsed.factions!.includes(faction.code),
        toggleFaction,
      ),
    )
  }

  // Optional: clear the URL parameters from the address bar after hydration if you prefer
  // window.history.replaceState(null, '', window.location.pathname);
}
