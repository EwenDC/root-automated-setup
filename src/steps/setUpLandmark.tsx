import { memo } from "react";
import Section from "../components/section";
import { selectSetupMap, selectSetupParameters } from "../features/selectors";
import { useAppSelector, useNthLastPlayer } from "../hooks";

interface SetUpLandmarkStepProps {
  number: 1 | 2;
}

const SetUpLandmarkStep: React.FC<SetUpLandmarkStepProps> = ({ number }) => {
  const landmark = useAppSelector(selectSetupParameters)[`landmark${number}`];
  const setupMap = useAppSelector(selectSetupMap);
  const nthLastPlayer = useNthLastPlayer();
  return (
    <Section
      subtitleKey={"landmark." + landmark + ".setupTitle"}
      textKey={"landmark." + landmark + ".setup"}
      translationOptions={{
        context: setupMap?.code,
        count: nthLastPlayer(number),
      }}
    />
  );
};

export default memo(SetUpLandmarkStep);
