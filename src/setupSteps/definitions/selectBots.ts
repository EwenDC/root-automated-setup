import type { SetupStepDefinition } from '..'

import {
  addToBotPool,
  //pushStateToPast,
  selectBotArray,
  setCurrentIndex,
  setErrorMessage,
} from '../../store'
import { SetupStep } from '../../types'
import SelectBotsStep from '../components/selectBotsStep'

export const selectBots: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const state = getState()

    if (!state.setup.includeBots || state.setup.botCount === 0) {
      return SetupStep.chooseLandmarks
    }

    if (state.flow.botPool.length >= state.setup.botCount) {
      dispatch(setCurrentIndex(null))
      return SetupStep.setUpBots
    }

    return null
  },

  component: SelectBotsStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const { flow, setup } = state

    if (flow.currentIndex == null) {
      dispatch(setErrorMessage('error.noBot'))
      return null
    }

    const availableBots = selectBotArray(state).filter(
      b => !flow.botPool.some(poolBot => poolBot.code === b.code),
    )

    const selectedBot = availableBots[flow.currentIndex]

    if (!selectedBot || flow.botPool.some(b => b.code === selectedBot.code)) {
      return null
    }

    //dispatch(pushStateToPast())
    dispatch(setCurrentIndex(null))
    dispatch(addToBotPool({ code: selectedBot.code }))

    // Clear index so the UI requires a fresh click on the next screen

    if (flow.botPool.length + 1 >= setup.botCount) {
      dispatch(setCurrentIndex(0))
      return SetupStep.setUpBots
    }

    return SetupStep.selectBots
  },
}
