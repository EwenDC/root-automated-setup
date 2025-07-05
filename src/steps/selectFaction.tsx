import { memo, useMemo } from "react";
import FactionSelect from "../components/factionSelect";
import Section from "../components/section";
import { StepSwitchProps } from "../components/stepSwitch";
import { useAppSelector } from "../hooks";

const SelectFactionStep: React.FC<StepSwitchProps> = ({ flowSlice }) => {
  const playerOrder = useAppSelector((state) => state.setup.playerOrder);
  const useDraft = useAppSelector((state) => state.flow.useDraft);

  const translationOptions = useMemo(
    () => ({
      count: playerOrder[flowSlice.playerIndex],
      context: useDraft ? "useDraft" : undefined,
    }),
    [flowSlice.playerIndex, playerOrder, useDraft],
  );

  return (
    <Section
      subtitleKey="setupStep.selectFaction.subtitle"
      textKey="setupStep.selectFaction.body"
      translationOptions={translationOptions}
    >
      <FactionSelect flowSlice={flowSlice} />
    </Section>
  );
};

export default memo(SelectFactionStep);
