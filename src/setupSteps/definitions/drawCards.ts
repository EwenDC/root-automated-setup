import type { SetupStepDefinition } from '..'

import { SetupStep } from '../../types'
import DrawCardsStep from '../components/drawCardsStep'

export const drawCards: SetupStepDefinition = {
  component: DrawCardsStep,
  afterStep: () => SetupStep.chooseFactions,
}
