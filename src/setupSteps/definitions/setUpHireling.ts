import type { SetupStepDefinition } from '..'

import { setErrorMessage } from '../../store'
import { SetupStep } from '../../types'
import SetUpHirelingStep from '../components/setUpHirelingStep'

export const setUpHireling: SetupStepDefinition = {
  component: SetUpHirelingStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const { flow, setup } = state

    if (setup.useHouserules) {
      const selectedHireling =
        flow.currentIndex != null ? flow.hirelingPool[flow.currentIndex] : null
      if (selectedHireling && flow.placedHirelings[selectedHireling.code] == null) {
        dispatch(setErrorMessage('error.noHireling'))
        return null
      }
    }

    // Set up the next hireling if the pool still has some left
    return flow.hirelingPool.length === 1 ? SetupStep.postHirelingSetup : SetupStep.selectHireling
  },
}
