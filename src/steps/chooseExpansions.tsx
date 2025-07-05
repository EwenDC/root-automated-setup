import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Section from "../components/section";
import { toggleExpansion } from "../features/componentsSlice";
import { skipSteps } from "../features/flowSlice";
import { selectExpansionArray } from "../features/selectors";
import { savePersistedSetting } from "../features/utils";
import { useAppDispatch, useAppSelector } from "../hooks";
import { CodeObject, SetupStep } from "../types";

const getExpansionLabelKey = (expansion: CodeObject) => `expansion.${expansion.code}`;

const ChooseExpansionsStep: React.FC = () => {
  const skippedSteps = useAppSelector((state) => state.flow.skippedSteps);
  const dispatch = useAppDispatch();

  return (
    <Section textKey="setupStep.chooseExpansions.body">
      <ComponentToggle
        selector={selectExpansionArray}
        toggleComponent={toggleExpansion}
        getLabelKey={getExpansionLabelKey}
        unsorted={true}
      />
      <Checkbox
        id="includeBotStep"
        defaultValue={!skippedSteps[SetupStep.setUpBots]}
        onChange={(checked) => {
          dispatch(skipSteps(SetupStep.setUpBots, !checked));
          savePersistedSetting("includeBotStep", checked);
        }}
      />
    </Section>
  );
};

export default ChooseExpansionsStep;
