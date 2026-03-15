import type { UnknownAction } from '@reduxjs/toolkit'

import type { Togglable, WithCode } from '../types'

import { HIRELING_SETUP_COUNT } from '../constants'
import {
  type AppThunk,
  type RootState,
  selectExpansionArray,
  selectFactionArray,
  toggleExpansion,
  toggleFaction,
} from '../store'
import { setCurrentPlayerIndex } from './slices/flow'
import {
  balanceMapSuits,
  fixFirstPlayer,
  setBotCount,
  setDeck,
  setHirelingCount,
  setLandmarkCount,
  setLimitCaptains,
  setLimitVagabonds,
  setMap,
  setPlayerCount,
} from './slices/setup'

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

/**
 * Thunk action for pulling URL params Example URL:
 * https://ewendc.github.io/root-automated-setup/?playerCount=2&botCount=1&map=autumn&factions=marquise,eyrie.
 */
export const hydrateSetupFromUrlParams = (): AppThunk => dispatch => {
  const queryString = window.location.search || window.location.hash.split('?')[1] || ''
  const urlParams = new URLSearchParams(queryString)
  let paramsChanged = false

  // -- NUMBERS -- //

  if (urlParams.has('playerCount')) {
    const playerCount = parseInt(urlParams.get('playerCount')!, 10)
    if (!isNaN(playerCount)) dispatch(setPlayerCount(playerCount))
    urlParams.delete('playerCount')
    paramsChanged = true
  }

  if (urlParams.has('botCount')) {
    const botCount = parseInt(urlParams.get('botCount')!, 10)
    if (!isNaN(botCount)) dispatch(setBotCount(botCount))
    urlParams.delete('botCount')
    paramsChanged = true
  }

  if (urlParams.has('landmarkCount')) {
    const landmarkCount = parseInt(urlParams.get('landmarkCount')!, 10)
    if (!isNaN(landmarkCount)) dispatch(setLandmarkCount(landmarkCount))
    urlParams.delete('landmarkCount')
    paramsChanged = true
  }

  if (urlParams.has('hirelingCount')) {
    const hirelingCount = parseInt(urlParams.get('hirelingCount')!, 10)
    if (!isNaN(hirelingCount)) dispatch(setHirelingCount(hirelingCount))
    urlParams.delete('hirelingCount')
    paramsChanged = true
  }

  // -- BOOLEANS -- //

  if (urlParams.has('fixedFirstPlayer')) {
    dispatch(fixFirstPlayer(urlParams.get('fixedFirstPlayer') === 'true'))
    urlParams.delete('fixedFirstPlayer')
    paramsChanged = true
  }

  if (urlParams.has('balancedSuits')) {
    dispatch(balanceMapSuits(urlParams.get('balancedSuits') === 'true'))
    urlParams.delete('balancedSuits')
    paramsChanged = true
  }

  // If someone passes printedSuits, it's the inverse of balancedSuits
  if (urlParams.has('printedSuits')) {
    dispatch(balanceMapSuits(urlParams.get('printedSuits') === 'false'))
    urlParams.delete('printedSuits')
    paramsChanged = true
  }

  if (urlParams.has('limitCaptains')) {
    dispatch(setLimitCaptains(urlParams.get('limitCaptains') === 'true'))
    urlParams.delete('limitCaptains')
    paramsChanged = true
  }

  if (urlParams.has('limitVagabonds')) {
    dispatch(setLimitVagabonds(urlParams.get('limitVagabonds') === 'true'))
    urlParams.delete('limitVagabonds')
    paramsChanged = true
  }

  if (urlParams.has('includeHirelings')) {
    const includeHirelings = urlParams.get('includeHirelings') === 'true'
    dispatch(setHirelingCount(includeHirelings ? HIRELING_SETUP_COUNT : 0))
    urlParams.delete('includeHirelings')
    paramsChanged = true
  }

  // -- STRINGS / ARRAYS (Codes) -- //

  if (urlParams.has('expansions')) {
    const expansionParam = urlParams.get('expansions')
    if (expansionParam) {
      const requestedExpansions = expansionParam.split(',')
      dispatch(
        massComponentToggle(
          selectExpansionArray,
          expansion => requestedExpansions.includes(expansion.code) || expansion.code === 'root',
          toggleExpansion,
        ),
      )
    }
    urlParams.delete('expansions')
    paramsChanged = true
  }

  if (urlParams.has('map')) {
    const mapParam = urlParams.get('map')
    if (mapParam) dispatch(setMap({ code: mapParam }))
    urlParams.delete('map')
    paramsChanged = true
  }

  if (urlParams.has('deck')) {
    const deckParam = urlParams.get('deck')
    if (deckParam) dispatch(setDeck({ code: deckParam }))
    urlParams.delete('deck')
    paramsChanged = true
  }

  if (urlParams.has('factions')) {
    const factionsParam = urlParams.get('factions')
    if (factionsParam) {
      const requestedFactions = factionsParam.split(',')
      dispatch(
        massComponentToggle(
          selectFactionArray,
          faction => requestedFactions.includes(faction.code),
          toggleFaction,
        ),
      )
    }
    urlParams.delete('factions')
    paramsChanged = true
  }

  // Clean up the URL so undo/redo or refreshes don't get confused
  if (paramsChanged) {
    const newUrl = urlParams.toString()
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname
    window.history.replaceState({}, '', newUrl)
  }
}
