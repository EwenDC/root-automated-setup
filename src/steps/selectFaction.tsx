import { memo } from "react";
import FactionSelect from "../components/factionSelect";
import Section from "../components/section";
import { SetupSwitchProps } from "../components/stepSwitch";
import { selectFlowState, selectSetupParameters } from "../features/selectors";
import { useAppSelector } from "../hooks";

const SelectFactionStep: React.FC<SetupSwitchProps> = ({ flowSlice }) => {
  const { playerOrder } = useAppSelector(selectSetupParameters);
  const { useDraft } = useAppSelector(selectFlowState);
  return (
    <Section
      subtitleKey="setupStep.selectFaction.subtitle"
      textKey="setupStep.selectFaction.body"
      translationOptions={{
        count: playerOrder[flowSlice.playerIndex],
        context: useDraft ? "useDraft" : undefined,
      }}
    >
      <FactionSelect flowSlice={flowSlice} />
    </Section>
  );
};

export default memo(SelectFactionStep);
