import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Section from "../components/section";
import { toggleExpansion } from "../features/componentsSlice";
import { skipSteps } from "../features/flowSlice";
import { selectExpansionArray, selectSkippedSteps } from "../features/selectors";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SetupStep } from "../types";

const ChooseExpansionsStep: React.FC = () => {
  const skippedSteps = useAppSelector(selectSkippedSteps);
  const dispatch = useAppDispatch();
  return (
    <Section textKey="setupStep.chooseExpansions.body">
      <ComponentToggle
        selector={selectExpansionArray}
        toggleComponent={toggleExpansion}
        getLabelKey={(expansion) => "expansion." + expansion.code}
        getLockedKey={(expansion) =>
          // Prevent the player from deselecting the Root base game
          expansion.base ? "error.baseExpansionRequired" : null
        }
        unsorted={true}
      />
      <Checkbox
        id="includeBotStep"
        defaultValue={!skippedSteps[SetupStep.setUpBots]}
        onChange={(checked) => dispatch(skipSteps(SetupStep.setUpBots, !checked))}
      />
    </Section>
  );
};

// Memo intentionally omitted due to rendering bugs with switch language
export default ChooseExpansionsStep;
