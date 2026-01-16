import type { SetupStepComponent, SetupStepDefinition } from '..'

import ComponentToggle from '../../components/componentToggle'
import Section from '../../components/section'
import { getEnabled } from '../../functions/filtering'
import { takeRandom } from '../../functions/random'
import { selectDeckArray, setDeck, setErrorMessage, toggleDeck } from '../../store'
import { SetupStep } from '../../types'

const ChooseDeckStep: SetupStepComponent = () => (
  <Section
    titleKey="setupStep.chooseDeck.title"
    textKey="setupStep.chooseDeck.body"
  >
    <ComponentToggle
      className="deck-toggle"
      selector={selectDeckArray}
      toggleComponent={toggleDeck}
      getLabelKey={deck => `deck.${deck.code}.name`}
    />
  </Section>
)

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
