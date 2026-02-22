import type { SetupStepDefinition } from '..'

import { SetupStep } from '../../types'
import SetUpMapStep from '../components/setUpMapStep'

export const setUpMap: SetupStepDefinition = {
  component: SetUpMapStep,
  afterStep: () => SetupStep.chooseDeck,
}
