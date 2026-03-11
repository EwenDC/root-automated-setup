import type { SetupStepDefinition } from '..'

import { SetupStep } from '../../types'
import SetUpBotStep from '../components/setUpBotsStep'

export const setUpBots: SetupStepDefinition = {
  component: SetUpBotStep,

  afterStep(_dispatch, getState) {
    const { flow } = getState()

    // If there are more bots in the pool, go back to the selection screen
    return flow.botPool.length > 1 ? SetupStep.selectBots : SetupStep.chooseLandmarks
  },
}
