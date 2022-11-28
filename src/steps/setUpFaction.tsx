import { memo } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";
import Icon from "../components/icon";
import IconList from "../components/iconList";
import Section from "../components/section";
import { SetupSwitchProps } from "../components/stepSwitch";
import { selectFactionPoolEntry } from "../features/selectors";
import { useAppSelector } from "../hooks";

const SetUpFactionStep: React.FC<SetupSwitchProps> = ({ flowSlice }) => {
  const { factionIndex, factionPool, vagabondSetUp } = flowSlice;
  const useDraft = useAppSelector((state) => state.flow.useDraft);
  const factionPoolEntry = useAppSelector(
    (state) => selectFactionPoolEntry(state, factionPool[factionIndex || 0]),
    shallowEqual
  );
  const { t } = useTranslation();

  return (
    <Section
      subtitleKey={"faction." + factionPoolEntry.key + ".setupTitle"}
      textKey={"faction." + factionPoolEntry.key + (useDraft ? ".advancedSetup" : ".setup")}
      translationOptions={{
        context: vagabondSetUp ? "vagabondSetUp" : undefined,
        vagabond:
          factionPoolEntry.vagabond && t("vagabond." + factionPoolEntry.vagabond.code + ".name"),
      }}
      components={
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
        }
      }
    />
  );
};

export default memo(SetUpFactionStep);
