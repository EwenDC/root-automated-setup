import type { SetupStepComponent } from '..'

import Section from '../../components/section'

const ChooseHandStep: SetupStepComponent = () => (
  <Section
    titleKey="setupStep.chooseHand.title"
    textKey="setupStep.chooseHand.body"
  />
)

export default ChooseHandStep
