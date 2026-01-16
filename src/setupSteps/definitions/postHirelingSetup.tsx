import type { SetupStepComponent, SetupStepDefinition } from '..'

import Section from '../../components/section'
import { SetupStep } from '../../types'

const PostHirelingSetupStep: SetupStepComponent = () => (
  <Section
    subtitleKey="setupStep.postHirelingSetup.subtitle"
    textKey="setupStep.postHirelingSetup.body"
  />
)

export const postHirelingSetup: SetupStepDefinition = {
  component: PostHirelingSetupStep,
  afterStep: () => SetupStep.drawCards,
}
