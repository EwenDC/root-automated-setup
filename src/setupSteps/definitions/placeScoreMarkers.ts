import type { SetupStepDefinition } from '..'

import { SetupStep } from '../../types'
import PlaceScoreMarkersStep from '../components/placeScoreMarkersStep'

export const placeScoreMarkers: SetupStepDefinition = {
  component: PlaceScoreMarkersStep,
  afterStep: () => SetupStep.chooseHand,
}
