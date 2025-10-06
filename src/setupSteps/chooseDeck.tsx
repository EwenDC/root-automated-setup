import ComponentToggle from '../components/componentToggle'
import Section from '../components/section'
import { selectDeckArray, toggleDeck } from '../store'

const ChooseDeckStep: React.FC = () => (
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

export default ChooseDeckStep
