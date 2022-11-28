import { memo } from "react";
import { useTranslation } from "react-i18next";
import NumberSelector from "../components/numberSelector";
import Radiogroup from "../components/radiogroup";
import Section from "../components/section";
import { selectFactionArray } from "../features/selectors";
import { fixFirstPlayer, setPlayerCount } from "../features/setupSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SetupStep } from "../types";

const SeatPlayersStep: React.FC = () => {
  const fixedFirstPlayer = useAppSelector((state) => state.setup.fixedFirstPlayer);
  const playerCount = useAppSelector((state) => state.setup.playerCount);
  const skippedSteps = useAppSelector((state) => state.flow.skippedSteps);
  const factions = useAppSelector(selectFactionArray);
  const dispatch = useAppDispatch();
  // Ensure the component re-renders when the language changes
  useTranslation();

  return (
    <Section titleKey="setupStep.seatPlayers.title" textKey="setupStep.seatPlayers.body">
      <NumberSelector
        id="playerCount"
        value={playerCount}
        minVal={skippedSteps[SetupStep.setUpBots] ? 2 : 1}
        maxVal={factions.length}
        onChange={(value) => dispatch(setPlayerCount(value))}
      />
      <Radiogroup
        id="fixedFirstPlayer"
        defaultValue={fixedFirstPlayer}
        onChange={(value) => dispatch(fixFirstPlayer(value))}
      />
    </Section>
  );
};

export default memo(SeatPlayersStep);
