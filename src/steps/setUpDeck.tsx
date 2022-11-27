import { memo } from "react";
import Section from "../components/section";
import { selectFlowState, selectSetupParameters } from "../features/selectors";
import { useAppSelector } from "../hooks";
import { SetupStep } from "../types";

const SetUpDeckStep: React.FC = () => {
  const { playerCount, deck } = useAppSelector(selectSetupParameters);
  const { skippedSteps } = useAppSelector(selectFlowState);
  return (
    <Section
      titleKey={skippedSteps[SetupStep.chooseDeck] ? "setupStep.setUpDeck.title" : undefined}
      subtitleKey={skippedSteps[SetupStep.chooseDeck] ? undefined : "deck." + deck + ".setupTitle"}
      textKey={"deck." + deck + ".setup"}
      translationOptions={{
        context: playerCount < 3 ? "twoPlayer" : undefined,
      }}
    />
  );
};

export default memo(SetUpDeckStep);
