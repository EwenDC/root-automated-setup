import type { SetupStepComponent } from '..'

import ComponentToggle from '../../components/componentToggle'
import Section from '../../components/section'
import { selectDeckArray, toggleDeck } from '../../store'

const ChooseDeckStep: SetupStepComponent = () => (
  <Section
    titleKey="setupStep.chooseDeck.title"
    textKey="setupStep.chooseDeck.body"
  >
    <ComponentToggle
      selector={selectDeckArray}
      toggleComponent={toggleDeck}
      getLabelKey={deck => `deck.${deck.code}.name`}
    />
  </Section>
)

export default ChooseDeckStep
