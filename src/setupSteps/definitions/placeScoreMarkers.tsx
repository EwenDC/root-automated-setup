import type { SetupStepComponent, SetupStepDefinition } from '..'

import Section from '../../components/section'
import { SetupStep } from '../../types'

const PlaceScoreMarkersStep: SetupStepComponent = ({ flowSlice }) => (
  <Section
    titleKey="setupStep.placeScoreMarkers.title"
    textKey="setupStep.placeScoreMarkers.body"
    translationOptions={{
      context: flowSlice.vagabondSetUp ? 'vagabondSetUp' : undefined,
    }}
  />
)

export const placeScoreMarkers: SetupStepDefinition = {
  component: PlaceScoreMarkersStep,
  afterStep: () => SetupStep.chooseHand,
}
