import { memo } from "react";
import Section from "../components/section";
import { selectSetupParameters } from "../features/selectors";
import { useAppSelector, useNthLastPlayer } from "../hooks";

interface SetUpLandmarkStepProps {
  number: 1 | 2;
}

const SetUpLandmarkStep: React.FC<SetUpLandmarkStepProps> = ({ number }) => {
  // Typescript is bad at inferring the limited range of dynamic keys, so we have to spell it out
  const { [("landmark" + number) as `landmark${typeof number}`]: landmark, map } =
    useAppSelector(selectSetupParameters);
  const nthLastPlayer = useNthLastPlayer();
  return (
    <Section
      subtitleKey={"landmark." + landmark + ".setupTitle"}
      textKey={"landmark." + landmark + ".setup"}
      translationOptions={{
        context: map,
        count: nthLastPlayer(number),
      }}
    />
  );
};

export default memo(SetUpLandmarkStep);
