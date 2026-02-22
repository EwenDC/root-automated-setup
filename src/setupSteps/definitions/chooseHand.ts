import type { SetupStepDefinition } from '..'

import { SetupStep } from '../../types'
import ChooseHandStep from '../components/chooseHandStep'

export const chooseHand: SetupStepDefinition = {
  component: ChooseHandStep,
  afterStep: () => SetupStep.setupEnd,
}
