import { memo, useMemo } from "react";
import Section from "../components/section";
import { useAppSelector, useNthLastPlayer } from "../hooks";

interface SetUpLandmarkStepProps {
  number: 1 | 2;
}

const SetUpLandmarkStep: React.FC<SetUpLandmarkStepProps> = ({ number }) => {
  const landmark = useAppSelector((state) => state.setup[`landmark${number}`]);
  const map = useAppSelector((state) => state.setup.map);
  const nthLastPlayer = useNthLastPlayer();

  const translationOptions = useMemo(
    () => ({
      context: map,
      count: nthLastPlayer(number),
    }),
    [map, nthLastPlayer, number]
  );

  return (
    <Section
      subtitleKey={`landmark.${landmark}.setupTitle`}
      textKey={`landmark.${landmark}.setup`}
      translationOptions={translationOptions}
    />
  );
};

export default memo(SetUpLandmarkStep);
