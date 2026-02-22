import type { SetupStepDefinition } from '..'

import { SetupStep } from '../../types'
import SetUpDeckStep from '../components/setUpDeckStep'

export const setUpDeck: SetupStepDefinition = {
  component: SetUpDeckStep,
  afterStep: () => SetupStep.setUpBots,
}
