import type { SetupStepDefinition } from '..'

import { getEnabled } from '../../functions/filtering'
import { takeRandom } from '../../functions/random'
import { selectDeckArray, setDeck, setErrorMessage } from '../../store'
import { SetupStep } from '../../types'
import ChooseDeckStep from '../components/chooseDeckStep'

export const chooseDeck: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const decks = selectDeckArray(getState())
    if (decks.length === 1) {
      // If there's only one deck, auto-select it and proceed to deck setup
      dispatch(setDeck(decks[0]!))
      return SetupStep.setUpDeck
    }
    return null
  },

  component: ChooseDeckStep,

  afterStep(dispatch, getState) {
    const deckPool = getEnabled(selectDeckArray(getState()))

    // Check that there is even a deck to be selected...
    if (deckPool.length < 1) {
      // Invalid state, do not proceed
      dispatch(setErrorMessage('error.noDeck'))
      return null
    }

    // Choose a random deck
    dispatch(setDeck(takeRandom(deckPool)))
    return SetupStep.setUpDeck
  },
}
