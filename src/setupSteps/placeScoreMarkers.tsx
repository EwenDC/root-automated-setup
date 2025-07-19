import type { StepSwitchProps } from '../components/stepSwitch'

import Section from '../components/section'

const PlaceScoreMarkersStep: React.FC<StepSwitchProps> = ({ flowSlice }) => (
  <Section
    titleKey="setupStep.placeScoreMarkers.title"
    textKey="setupStep.placeScoreMarkers.body"
    translationOptions={{
      context: flowSlice.vagabondSetUp ? 'vagabondSetUp' : undefined,
    }}
  />
)

export default PlaceScoreMarkersStep
