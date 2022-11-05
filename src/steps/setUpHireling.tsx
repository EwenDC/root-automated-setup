import { memo } from "react";
import Section from "../components/section";
import { selectSetupParameters } from "../features/selectors";
import { useAppSelector, useNthLastPlayer } from "../hooks";

interface SetUpHirelingStepProps {
  number: 1 | 2 | 3;
}

const SetUpHirelingStep: React.FC<SetUpHirelingStepProps> = ({ number }) => {
  const hireling = useAppSelector(selectSetupParameters)[`hireling${number}`];
  const nthLastPlayer = useNthLastPlayer();
  return (
    <Section
      subtitleKey={"hireling." + hireling?.code + ".setupTitle"}
      textKey={"hireling." + hireling?.code + ".setup"}
      translationOptions={{
        context: hireling?.demoted ? "demoted" : undefined,
        count: nthLastPlayer(number),
      }}
    />
  );
};

export default memo(SetUpHirelingStep);
