import type { SetupStepDefinition } from '..'

import { setCurrentIndex } from '../../store'
import { SetupStep } from '../../types'
import SetUpBotsStep from '../components/setUpBotsStep'

export const setUpBots: SetupStepDefinition = {
  component: SetUpBotsStep,

  afterStep(dispatch, _getState) {
    dispatch(setCurrentIndex(null))
    return SetupStep.selectBots
  },
}
