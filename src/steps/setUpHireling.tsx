import { memo } from "react";
import Section from "../components/section";
import { selectSetupParameters } from "../features/selectors";
import { useAppSelector, useNthLastPlayer } from "../hooks";

interface SetUpHirelingStepProps {
  number: 1 | 2 | 3;
}

const SetUpHirelingStep: React.FC<SetUpHirelingStepProps> = ({ number }) => {
  // Typescript is bad at inferring the limited range of dynamic keys, so we have to spell it out
  const { [("hireling" + number) as `hireling${typeof number}`]: hireling } =
    useAppSelector(selectSetupParameters);
  const nthLastPlayer = useNthLastPlayer();

  if (!hireling) return null;

  return (
    <Section
      subtitleKey={"hireling." + hireling.code + ".setupTitle"}
      textKey={"hireling." + hireling.code + ".setup"}
      translationOptions={{
        context: hireling.demoted ? "demoted" : undefined,
        count: nthLastPlayer(number),
      }}
    />
  );
};

export default memo(SetUpHirelingStep);
