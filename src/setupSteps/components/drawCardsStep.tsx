import type { SetupStepComponent } from '..'

import Section from '../../components/section'

const DrawCardsStep: SetupStepComponent = () => (
  <Section
    titleKey="setupStep.drawCards.title"
    textKey="setupStep.drawCards.body"
  />
)

export default DrawCardsStep
