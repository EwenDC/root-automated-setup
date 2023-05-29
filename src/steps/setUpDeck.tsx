import { memo, useMemo } from "react";
import Section from "../components/section";
import { useAppSelector } from "../hooks";
import { SetupStep } from "../types";

const SetUpDeckStep: React.FC = () => {
  const deck = useAppSelector((state) => state.setup.deck);
  const playerCount = useAppSelector((state) => state.setup.playerCount);
  const skippedSteps = useAppSelector((state) => state.flow.skippedSteps);

  const translationOptions = useMemo(
    () => ({
      context: playerCount < 3 ? "twoPlayer" : undefined,
    }),
    [playerCount]
  );

  return (
    <Section
      titleKey={skippedSteps[SetupStep.chooseDeck] ? "setupStep.setUpDeck.title" : undefined}
      subtitleKey={skippedSteps[SetupStep.chooseDeck] ? undefined : `deck.${deck}.setupTitle`}
      textKey={`deck.${deck}.setup`}
      translationOptions={translationOptions}
    />
  );
};

export default memo(SetUpDeckStep);
