import { memo, useMemo } from "react";
import Section from "../components/section";
import { StepSwitchProps } from "../components/stepSwitch";

const PlaceScoreMarkersStep: React.FC<StepSwitchProps> = ({ flowSlice }) => {
  const translationOptions = useMemo(
    () => ({
      context: flowSlice.vagabondSetUp ? "vagabondSetUp" : undefined,
    }),
    [flowSlice.vagabondSetUp]
  );

  return (
    <Section
      titleKey="setupStep.placeScoreMarkers.title"
      textKey="setupStep.placeScoreMarkers.body"
      translationOptions={translationOptions}
    />
  );
};

export default memo(PlaceScoreMarkersStep);
