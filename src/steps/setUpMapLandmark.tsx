import { memo } from "react";
import Section from "../components/section";
import { selectSetupMap } from "../features/selectors";
import { useAppSelector } from "../hooks";

const SetUpMapLandmarkStep: React.FC = () => {
  const setupMap = useAppSelector(selectSetupMap);
  return (
    <Section
      subtitleKey={"landmark." + setupMap?.landmark + ".setupTitle"}
      textKey={"map." + setupMap?.code + ".landmarkSetup"}
      translationOptions={{ context: setupMap?.code }}
    />
  );
};

export default memo(SetUpMapLandmarkStep);
