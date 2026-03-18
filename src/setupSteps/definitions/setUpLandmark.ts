import type { SetupStepDefinition } from '..'

import { SetupStep } from '../../types'
import SetUpLandmarkStep from '../components/setUpLandmarkStep'

export const setUpLandmark: SetupStepDefinition = {
  component: SetUpLandmarkStep,

  afterStep(_dispatch, getState) {
    const { flow } = getState()
    // Set up the next landmark if the pool still has some left
    return flow.landmarkPool.length > 1 ? SetupStep.selectLandmark : SetupStep.chooseHirelings
  },
}
