import type { SetupStepDefinition } from '..'

import { setErrorMessage } from '../../store'
import { SetupStep } from '../../types'
import SetUpLandmarkStep from '../components/setUpLandmarkStep'

export const setUpLandmark: SetupStepDefinition = {
  component: SetUpLandmarkStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const { flow, setup } = state
    if (setup.useHouserules) {
      const selectedLandmark =
        flow.currentIndex != null ? flow.landmarkPool[flow.currentIndex] : null
      if (selectedLandmark && flow.placedLandmarks[selectedLandmark] == null) {
        dispatch(setErrorMessage('error.noLandmark'))
        return null
      }
    }
    return flow.landmarkPool.length === 1 ? SetupStep.chooseHirelings : SetupStep.selectLandmark
  },
}
