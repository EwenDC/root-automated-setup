import { memo } from "react";
import FactionSelect from "../components/factionSelect";
import Section from "../components/section";
import { SetupSwitchProps } from "../components/stepSwitch";
import { selectSetupParameters } from "../features/selectors";
import { useAppSelector } from "../hooks";

const SelectFactionStep: React.FC<SetupSwitchProps> = ({ flowSlice }) => {
  const { playerOrder } = useAppSelector(selectSetupParameters);
  return (
    <Section
      subtitleKey="setupStep.selectFaction.subtitle"
      textKey="setupStep.selectFaction.body"
      translationOptions={{ count: playerOrder[flowSlice.playerIndex] }}
    >
      <FactionSelect flowSlice={flowSlice} />
    </Section>
  );
};

export default memo(SelectFactionStep);
