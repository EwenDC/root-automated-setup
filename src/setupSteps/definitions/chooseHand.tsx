import type { SetupStepComponent, SetupStepDefinition } from '..'

import Section from '../../components/section'
import { SetupStep } from '../../types'

const ChooseHandStep: SetupStepComponent = () => (
  <Section
    titleKey="setupStep.chooseHand.title"
    textKey="setupStep.chooseHand.body"
  />
)

export const chooseHand: SetupStepDefinition = {
  component: ChooseHandStep,
  afterStep: () => SetupStep.setupEnd,
}
