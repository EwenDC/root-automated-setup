import type { SetupStepComponent, SetupStepDefinition } from '..'

import Section from '../../components/section'
import { SetupStep } from '../../types'

const SetUpBotsStep: SetupStepComponent = () => (
  <Section
    titleKey="setupStep.setUpBots.title"
    textKey="setupStep.setUpBots.body"
  />
)

export const setUpBots: SetupStepDefinition = {
  beforeStep: (_dispatch, getState) =>
    getState().setup.includeBots ? null : SetupStep.chooseLandmarks,

  component: SetUpBotsStep,

  afterStep: () => SetupStep.chooseLandmarks,
}
