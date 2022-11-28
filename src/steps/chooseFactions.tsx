import { memo } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../components/checkbox";
import ComponentToggle from "../components/componentToggle";
import Section from "../components/section";
import { toggleFaction, toggleVagabond } from "../features/componentsSlice";
import { setUseDraft } from "../features/flowSlice";
import { selectFactionArray, selectVagabondArray } from "../features/selectors";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SetupStep } from "../types";

const ChooseFactionsStep: React.FC = () => {
  const playerCount = useAppSelector((state) => state.setup.playerCount);
  const excludedFactions = useAppSelector((state) => state.setup.excludedFactions);
  const skippedSteps = useAppSelector((state) => state.flow.skippedSteps);
  const useDraft = useAppSelector((state) => state.flow.useDraft);
  const factions = useAppSelector(selectFactionArray);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Section titleKey="setupStep.chooseFactions.title" textKey="setupStep.chooseFactions.body">
      {playerCount < factions.length ? (
        <Checkbox
          id="useDraft"
          defaultValue={useDraft}
          onChange={(checked) => dispatch(setUseDraft(checked))}
        />
      ) : null}
      <ComponentToggle
        selector={selectFactionArray}
        toggleComponent={toggleFaction}
        getLabelKey={(faction) => "faction." + faction.key + ".name"}
        getLockedKey={(faction) =>
          // Disable insurgent factions if we're only playing with 2 people and no bots or hirelings
          playerCount < 3 &&
          !faction.militant &&
          skippedSteps[SetupStep.setUpHireling1] &&
          skippedSteps[SetupStep.setUpBots]
            ? "error.tooFewPlayerInsurgent"
            : // Disable a faction if it was replaced by an equivilent hireling
            excludedFactions.includes(faction.code)
            ? "error.hirelingSelected"
            : null
        }
      />
      {useDraft && factions.some((faction) => faction.isVagabond && faction.enabled) ? (
        <>
          {t("label.selectVagabonds")}
          <ComponentToggle
            selector={selectVagabondArray}
            toggleComponent={toggleVagabond}
            getLabelKey={(vagabond) => "vagabond." + vagabond.code + ".name"}
          />
        </>
      ) : null}
    </Section>
  );
};

export default memo(ChooseFactionsStep);
