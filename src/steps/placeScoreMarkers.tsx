import Section from "../components/section";
import { StepSwitchProps } from "../components/stepSwitch";

const PlaceScoreMarkersStep: React.FC<StepSwitchProps> = ({ flowSlice }) => (
  <Section
    titleKey="setupStep.placeScoreMarkers.title"
    textKey="setupStep.placeScoreMarkers.body"
    translationOptions={{
      context: flowSlice.vagabondSetUp ? "vagabondSetUp" : undefined,
    }}
  />
);

export default PlaceScoreMarkersStep;
