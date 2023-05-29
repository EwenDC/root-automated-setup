import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../components/icon";
import IconList from "../components/iconList";
import Section from "../components/section";
import { StepSwitchProps } from "../components/stepSwitch";
import { useAppSelector, useSelectFactionPool } from "../hooks";

const SetUpFactionStep: React.FC<StepSwitchProps> = ({ flowSlice }) => {
  const { factionIndex, factionPool, vagabondSetUp } = flowSlice;
  const useDraft = useAppSelector((state) => state.flow.useDraft);
  const selectFactionPool = useSelectFactionPool(factionPool);
  const factionPoolEntry = useAppSelector((state) => selectFactionPool(state)[factionIndex ?? 0]);
  const { t } = useTranslation();

  const translationOptions = useMemo(
    () => ({
      context: vagabondSetUp ? "vagabondSetUp" : undefined,
      vagabond: factionPoolEntry.vagabond && t(`vagabond.${factionPoolEntry.vagabond.code}.name`),
    }),
    [factionPoolEntry.vagabond, t, vagabondSetUp]
  );
  const components = useMemo(
    () =>
      factionPoolEntry.vagabond && {
        InitialStartingItems: (
          <IconList list={factionPoolEntry.vagabond.startingItems.slice(0, -1)} />
        ),
        FinalStartingItem: (
          <Icon
            icon={
              factionPoolEntry.vagabond.startingItems[
                factionPoolEntry.vagabond.startingItems.length - 1
              ]
            }
          />
        ),
      },
    [factionPoolEntry.vagabond]
  );

  return (
    <Section
      subtitleKey={`faction.${factionPoolEntry.key}.setupTitle`}
      textKey={`faction.${factionPoolEntry.key}${useDraft ? ".advancedSetup" : ".setup"}`}
      translationOptions={translationOptions}
      components={components}
    />
  );
};

export default memo(SetUpFactionStep);
