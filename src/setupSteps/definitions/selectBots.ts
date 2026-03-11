import type { SetupStepDefinition } from '..'

import { removeCurrentBotFromPool, setCurrentIndex, setErrorMessage } from '../../store'
import { SetupStep } from '../../types'
import SelectBotsStep from '../components/selectBotsStep'

export const selectBots: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    if (getState().flow.currentIndex != null) dispatch(removeCurrentBotFromPool())

    if (getState().flow.botPool.length < 2) {
      dispatch(setCurrentIndex(0))
      return SetupStep.setUpBots
    }
    return null
  },

  component: SelectBotsStep,

  afterStep(dispatch, getState) {
    const { flow } = getState()
    if (flow.currentIndex == null) {
      dispatch(setErrorMessage('error.noBot'))
      return null
    }
    return SetupStep.selectBots
  },
}
