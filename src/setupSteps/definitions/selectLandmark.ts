import type { SetupStepDefinition } from '..'

import {
  goBackInPlayerTurnOrder,
  removeCurrentLandmarkFromPool,
  setCurrentIndex,
  setErrorMessage,
} from '../../store'
import { SetupStep } from '../../types'
import SelectLandmarkStep from '../components/selectLandmarkStep'

export const selectLandmark: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    // Remove the landmark we just set up from the pool
    if (getState().flow.currentIndex != null) dispatch(removeCurrentLandmarkFromPool())

    // Move on to the next player
    dispatch(goBackInPlayerTurnOrder())

    // Skip straight to setup if there is no choice to be made
    if (getState().flow.landmarkPool.length < 2) {
      dispatch(setCurrentIndex(0))
      return SetupStep.setUpLandmark
    }
    return null
  },

  component: SelectLandmarkStep,

  afterStep(dispatch, getState) {
    const { flow } = getState()

    // Ensure the user has actually selected a landmark
    if (flow.currentIndex == null) {
      dispatch(setErrorMessage('error.noLandmark'))
      return null
    }

    return SetupStep.setUpLandmark
  },
}
