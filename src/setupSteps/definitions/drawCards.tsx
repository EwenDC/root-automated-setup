import type { SetupStepComponent, SetupStepDefinition } from '..'

import Section from '../../components/section'
import { SetupStep } from '../../types'

const DrawCardsStep: SetupStepComponent = () => (
  <Section
    titleKey="setupStep.drawCards.title"
    textKey="setupStep.drawCards.body"
  />
)

export const drawCards: SetupStepDefinition = {
  component: DrawCardsStep,
  afterStep: () => SetupStep.chooseFactions,
}
