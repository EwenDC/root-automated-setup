import type { SetupStepDefinition } from '..'

import { MIN_PLAYERS_NO_FLOOD } from '../../constants'
import { getEnabled } from '../../functions/filtering'
import { takeRandom } from '../../functions/random'
import {
  lockLandmark,
  massComponentLock,
  selectLandmarkArray,
  selectSetupMap,
  setCurrentIndex,
  setCurrentPlayerIndex,
  setErrorMessage,
  setLandmarkPool,
} from '../../store'
import { type LandmarkCode, SetupStep } from '../../types'
import ChooseLandmarksStep from '../components/chooseLandmarksStep'

export const chooseLandmarks: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const state = getState()

    // Are there any landmarks that can be set up?
    if (selectLandmarkArray(state).length < 1) {
      return SetupStep.chooseHirelings
    }

    // Ensure that any landmarks not supported at this player count or used by map setup are disabled
    const setupMap = selectSetupMap(state)
    dispatch(
      massComponentLock(
        selectLandmarkArray,
        ({ code, minPlayers }) => {
          // Lock this landmark if it requires more players to include
          if (minPlayers > state.setup.playerCount) return 'error.landmarkNotEnoughPlayers'
          // Lock this landmark if it was used in map setup
          if (
            (setupMap?.useLandmark && code === setupMap.landmark?.code) ||
            (setupMap?.suitLandmarks &&
              state.setup.playerCount >= MIN_PLAYERS_NO_FLOOD &&
              Object.values(setupMap.suitLandmarks).includes(code))
          ) {
            return 'error.mapLandmarkUsed'
          }
          return false
        },
        lockLandmark,
      ),
    )

    return null
  },

  component: ChooseLandmarksStep,

  afterStep(dispatch, getState) {
    const state = getState()

    // Get our list of landmarks which are available for selection
    const landmarks = getEnabled(selectLandmarkArray(state))

    // Check that there are enough enabled landmarks for how many we want to set up
    if (landmarks.length < state.setup.landmarkCount) {
      dispatch(setErrorMessage('error.tooFewLandmark'))
      return null
    }

    // Select the landmarks
    const landmarkPool: LandmarkCode[] = []
    for (let index = 0; index < state.setup.landmarkCount; index++) {
      landmarkPool.push(takeRandom(landmarks).code)
    }
    dispatch(setLandmarkPool(landmarkPool))
    dispatch(setCurrentPlayerIndex(null))
    dispatch(setCurrentIndex(null))

    return landmarkPool.length > 0 ? SetupStep.selectLandmark : SetupStep.chooseHirelings
  },
}
