import type { SetupStepDefinition } from '..'

import { selectDeckArray, selectFactionArray, selectMapArray, setErrorMessage } from '../../store'
import { SetupStep } from '../../types'
import ChooseExpansionsStep from '../components/chooseExpansionsStep'

export const chooseExpansions: SetupStepDefinition = {
  component: ChooseExpansionsStep,

  afterStep(dispatch, getState) {
    // We need to validate if we have enough components for setup, since it's *technically*
    // possible to play without the base game (using the Homeland expansion)
    const state = getState()

    // Is there at least one faction?
    if (selectFactionArray(state).length < 1) {
      dispatch(setErrorMessage('error.missingFaction'))
      return null
    }

    // Is there at least one map?
    if (selectMapArray(state).length < 1) {
      dispatch(setErrorMessage('error.missingMap'))
      return null
    }

    // Is there at least one deck?
    if (selectDeckArray(state).length < 1) {
      dispatch(setErrorMessage('error.missingDeck'))
      return null
    }

    return SetupStep.seatPlayers
  },
}
