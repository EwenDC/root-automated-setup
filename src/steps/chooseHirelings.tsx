import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Section from "../components/section";
import { toggleHireling } from "../features/componentsSlice";
import { skipSteps } from "../features/flowSlice";
import { selectFactionCodes, selectHirelingArray } from "../features/selectors";
import { savePersistedSetting } from "../features/utils";
import { useAppDispatch, useAppSelector } from "../hooks";
import { CodeObject, Hireling, SetupStep } from "../types";

const getHirelingLabelKey = (hireling: CodeObject) => "hireling." + hireling.code + ".name";

const ChooseHirelingsStep: React.FC = () => {
  const playerCount = useAppSelector((state) => state.setup.playerCount);
  const skippedSteps = useAppSelector((state) => state.flow.skippedSteps);
  const factionCodes = useAppSelector(selectFactionCodes);
  const dispatch = useAppDispatch();
  // Ensure the component re-renders when the language changes
  useTranslation();

  const onIncludeHirelingsChange = useCallback(
    (checked: boolean) => {
      dispatch(
        skipSteps(
          [
            SetupStep.setUpHireling1,
            SetupStep.setUpHireling2,
            SetupStep.setUpHireling3,
            SetupStep.postHirelingSetup,
          ],
          !checked
        )
      );
      savePersistedSetting("includeHirelings", checked);
    },
    [dispatch]
  );
  const getHirelingLockedKey = useCallback(
    (hireling: Hireling) =>
      // Are we at the max player count (i.e. there are no factions to spare for an equivilent hireling)?
      playerCount >= factionCodes.length &&
      // Is this hireling one of the faction equivilents?
      hireling.factions.some((faction) => factionCodes.includes(faction))
        ? "error.factionHirelingExcluded"
        : null,
    [factionCodes, playerCount]
  );

  return (
    <Section titleKey="setupStep.chooseHirelings.title" textKey="setupStep.chooseHirelings.body">
      <Checkbox
        id="includeHirelings"
        defaultValue={!skippedSteps[SetupStep.setUpHireling1]}
        onChange={onIncludeHirelingsChange}
      />
      {!skippedSteps[SetupStep.setUpHireling1] ? (
        <ComponentToggle
          selector={selectHirelingArray}
          toggleComponent={toggleHireling}
          getLabelKey={getHirelingLabelKey}
          getLockedKey={getHirelingLockedKey}
        />
      ) : null}
    </Section>
  );
};

export default memo(ChooseHirelingsStep);
