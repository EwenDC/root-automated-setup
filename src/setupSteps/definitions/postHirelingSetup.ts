import type { SetupStepDefinition } from '..'

import { SetupStep } from '../../types'
import PostHirelingSetupStep from '../components/postHirelingSetupStep'

export const postHirelingSetup: SetupStepDefinition = {
  component: PostHirelingSetupStep,
  afterStep: () => SetupStep.drawCards,
}
