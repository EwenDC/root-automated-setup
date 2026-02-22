import type { SetupStepDefinition } from '..'

import { SetupStep } from '../../types'
import SetUpBotsStep from '../components/setUpBotsStep'

export const setUpBots: SetupStepDefinition = {
  beforeStep: (_dispatch, getState) =>
    getState().setup.includeBots ? null : SetupStep.chooseLandmarks,

  component: SetUpBotsStep,

  afterStep: () => SetupStep.chooseLandmarks,
}
