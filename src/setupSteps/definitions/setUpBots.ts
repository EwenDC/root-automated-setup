import type { SetupStepDefinition } from '..'

// Added pushStateToPast to the import
import { pushStateToPast, setCurrentIndex } from '../../store'
import { SetupStep } from '../../types'
import SetUpBotsStep from '../components/setUpBotsStep'

export const setUpBots: SetupStepDefinition = {
  component: SetUpBotsStep,

  afterStep(dispatch, getState) {
    const { flow } = getState()

    if (flow.currentIndex != null && flow.currentIndex + 1 < flow.botPool.length) {
      // 1. Drop a breadcrumb in Redux history BEFORE moving to the next bot
      dispatch(pushStateToPast())

      // 2. Increment the index
      dispatch(setCurrentIndex(flow.currentIndex + 1))
      return SetupStep.setUpBots
    }

    dispatch(setCurrentIndex(null))
    return SetupStep.chooseLandmarks
  },
}
