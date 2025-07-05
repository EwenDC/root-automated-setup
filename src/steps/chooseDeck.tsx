import ComponentToggle from "../components/componentToggle";
import Section from "../components/section";
import { toggleDeck } from "../features/componentsSlice";
import { selectDeckArray } from "../features/selectors";
import { CodeObject } from "../types";

const getDeckLabelKey = (deck: CodeObject) => `deck.${deck.code}.name`;

const ChooseDeckStep: React.FC = () => (
  <Section titleKey="setupStep.chooseDeck.title" textKey="setupStep.chooseDeck.body">
    <ComponentToggle
      selector={selectDeckArray}
      toggleComponent={toggleDeck}
      getLabelKey={getDeckLabelKey}
    />
  </Section>
);

export default ChooseDeckStep;
