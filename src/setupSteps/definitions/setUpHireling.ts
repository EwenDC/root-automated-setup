import type { SetupStepDefinition } from '..'

import { SetupStep } from '../../types'
import SetUpHirelingStep from '../components/setUpHirelingStep'

export const setUpHireling: SetupStepDefinition = {
  component: SetUpHirelingStep,

  afterStep(_dispatch, getState) {
    const { flow } = getState()
    // Set up the next hireling if the pool still has some left
    return flow.hirelingPool.length > 1 ? SetupStep.selectHireling : SetupStep.postHirelingSetup
  },
}
