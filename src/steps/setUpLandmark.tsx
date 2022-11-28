import { memo } from "react";
import Section from "../components/section";
import { useAppSelector, useNthLastPlayer } from "../hooks";

interface SetUpLandmarkStepProps {
  number: 1 | 2;
}

const SetUpLandmarkStep: React.FC<SetUpLandmarkStepProps> = ({ number }) => {
  // Typescript is bad at inferring the limited range of dynamic keys, so we have to spell it out
  const landmark = useAppSelector(
    (state) => state.setup[("landmark" + number) as `landmark${typeof number}`]
  );
  const map = useAppSelector((state) => state.setup.map);
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
