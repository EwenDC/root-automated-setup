import type { SetupStepComponent } from '..'

import Section from '../../components/section'

const PlaceScoreMarkersStep: SetupStepComponent = ({ flowSlice }) => (
  <Section
    titleKey="setupStep.placeScoreMarkers.title"
    textKey="setupStep.placeScoreMarkers.body"
    translationOptions={{
      context: flowSlice.vagabondSetUp ? 'vagabondSetUp' : undefined,
    }}
  />
)

export default PlaceScoreMarkersStep
