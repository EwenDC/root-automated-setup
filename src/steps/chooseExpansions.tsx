import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Section from "../components/section";
import { toggleExpansion } from "../features/componentsSlice";
import { skipSteps } from "../features/flowSlice";
import { selectExpansionArray } from "../features/selectors";
import { savePersistedSetting } from "../features/utils";
import { useAppDispatch, useAppSelector } from "../hooks";
import { CodeObject, ExpansionInfo, SetupStep } from "../types";

const getExpansionLabelKey = (expansion: CodeObject) => "expansion." + expansion.code;
const getExpansionLockedKey = (expansion: ExpansionInfo) =>
  // Prevent the player from deselecting the Root base game
  expansion.base ? "error.baseExpansionRequired" : null;

const ChooseExpansionsStep: React.FC = () => {
  const skippedSteps = useAppSelector((state) => state.flow.skippedSteps);
  const dispatch = useAppDispatch();
  // Ensure the component re-renders when the language changes
  useTranslation();

  const onIncludeBotChange = useCallback(
    (checked: boolean) => {
      dispatch(skipSteps(SetupStep.setUpBots, !checked));
      savePersistedSetting("includeBotStep", checked);
    },
    [dispatch]
  );

  return (
    <Section textKey="setupStep.chooseExpansions.body">
      <ComponentToggle
        selector={selectExpansionArray}
        toggleComponent={toggleExpansion}
        getLabelKey={getExpansionLabelKey}
        getLockedKey={getExpansionLockedKey}
        unsorted={true}
      />
      <Checkbox
        id="includeBotStep"
        defaultValue={!skippedSteps[SetupStep.setUpBots]}
        onChange={onIncludeBotChange}
      />
    </Section>
  );
};

export default memo(ChooseExpansionsStep);
