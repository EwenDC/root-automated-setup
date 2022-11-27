import NumberSelector from "../components/numberSelector";
import Radiogroup from "../components/radiogroup";
import Section from "../components/section";
import { selectFactionArray, selectFlowState, selectSetupParameters } from "../features/selectors";
import { fixFirstPlayer, setPlayerCount } from "../features/setupSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SetupStep } from "../types";

const SeatPlayersStep: React.FC = () => {
  const { playerCount, fixedFirstPlayer } = useAppSelector(selectSetupParameters);
  const { skippedSteps } = useAppSelector(selectFlowState);
  const factions = useAppSelector(selectFactionArray);
  const dispatch = useAppDispatch();
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

// Memo intentionally omitted due to rendering bugs with switch language
export default SeatPlayersStep;
