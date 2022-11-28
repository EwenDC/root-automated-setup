import { memo } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Section from "../components/section";
import { toggleExpansion } from "../features/componentsSlice";
import { skipSteps } from "../features/flowSlice";
import { selectExpansionArray } from "../features/selectors";
import { savePersistedSetting } from "../features/utils";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SetupStep } from "../types";

const ChooseExpansionsStep: React.FC = () => {
  const skippedSteps = useAppSelector((state) => state.flow.skippedSteps);
  const dispatch = useAppDispatch();
  // Ensure the component re-renders when the language changes
  useTranslation();

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
        onChange={(checked) => {
          dispatch(skipSteps(SetupStep.setUpBots, !checked));
          savePersistedSetting("includeBotStep", checked);
        }}
      />
    </Section>
  );
};

export default memo(ChooseExpansionsStep);
