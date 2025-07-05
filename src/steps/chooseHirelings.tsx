import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Section from "../components/section";
import { toggleHireling } from "../features/componentsSlice";
import { skipSteps } from "../features/flowSlice";
import { selectHirelingArray } from "../features/selectors";
import { savePersistedSetting } from "../features/utils";
import { useAppDispatch, useAppSelector } from "../hooks";
import { CodeObject, SetupStep } from "../types";

const getHirelingLabelKey = (hireling: CodeObject) => `hireling.${hireling.code}.name`;

const ChooseHirelingsStep: React.FC = () => {
  const skippedSteps = useAppSelector((state) => state.flow.skippedSteps);
  const dispatch = useAppDispatch();

  return (
    <Section titleKey="setupStep.chooseHirelings.title" textKey="setupStep.chooseHirelings.body">
      <Checkbox
        id="includeHirelings"
        defaultValue={!skippedSteps[SetupStep.setUpHireling1]}
        onChange={(checked) => {
          dispatch(
            skipSteps(
              [
                SetupStep.setUpHireling1,
                SetupStep.setUpHireling2,
                SetupStep.setUpHireling3,
                SetupStep.postHirelingSetup,
              ],
              !checked,
            ),
          );
          savePersistedSetting("includeHirelings", checked);
        }}
      />
      {!skippedSteps[SetupStep.setUpHireling1] ? (
        <ComponentToggle
          selector={selectHirelingArray}
          toggleComponent={toggleHireling}
          getLabelKey={getHirelingLabelKey}
        />
      ) : null}
    </Section>
  );
};

export default ChooseHirelingsStep;
