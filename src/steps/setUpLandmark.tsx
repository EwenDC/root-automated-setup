import Section from "../components/section";
import { useAppSelector, useNthLastPlayer } from "../hooks";

interface SetUpLandmarkStepProps {
  number: 1 | 2;
}

const SetUpLandmarkStep: React.FC<SetUpLandmarkStepProps> = ({ number }) => {
  const landmark = useAppSelector((state) => state.setup[`landmark${number}`]);
  const map = useAppSelector((state) => state.setup.map);
  const nthLastPlayer = useNthLastPlayer();

  return (
    <Section
      subtitleKey={`landmark.${landmark}.setupTitle`}
      textKey={`landmark.${landmark}.setup`}
      translationOptions={{
        context: map,
        count: nthLastPlayer(number),
      }}
    />
  );
};

export default SetUpLandmarkStep;
