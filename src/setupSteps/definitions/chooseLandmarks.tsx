import type { SetupStepComponent, SetupStepDefinition } from '..'

import ComponentToggle from '../../components/componentToggle'
import NumberSelector from '../../components/numberSelector'
import Section from '../../components/section'
import { MAX_LANDMARKS, MIN_PLAYERS_NO_FLOOD } from '../../constants'
import { getEnabled } from '../../functions/filtering'
import { takeRandom } from '../../functions/random'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  lockLandmark,
  massComponentLock,
  selectLandmarkArray,
  selectSetupMap,
  setCurrentIndex,
  setCurrentPlayerIndex,
  setErrorMessage,
  setLandmarkCount,
  setLandmarks,
  toggleLandmark,
} from '../../store'
import { type LandmarkCode, SetupStep } from '../../types'

const ChooseLandmarksStep: SetupStepComponent = () => {
  const landmarkCount = useAppSelector(state => state.setup.landmarkCount)
  const setupMap = useAppSelector(selectSetupMap)
  const dispatch = useAppDispatch()

  if (!setupMap) return null
  return (
    <Section
      titleKey="setupStep.chooseLandmarks.title"
      textKey="setupStep.chooseLandmarks.body"
      translationOptions={{ context: setupMap.useLandmark ? 'mapLandmark' : undefined }}
    >
      <NumberSelector
        id="landmarkCount"
        value={landmarkCount}
        minVal={0}
        maxVal={MAX_LANDMARKS}
        onChange={value => dispatch(setLandmarkCount(value))}
      />
      {landmarkCount > 0 ? (
        <ComponentToggle
          className="landmark-toggle"
          selector={selectLandmarkArray}
          toggleComponent={toggleLandmark}
          getLabelKey={landmark => `landmark.${landmark.code}.name`}
        />
      ) : null}
    </Section>
  )
}

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
    const landmarkPool = getEnabled(selectLandmarkArray(state))

    // Check that there are enough enabled landmarks for how many we want to set up
    if (landmarkPool.length < state.setup.landmarkCount) {
      // Set the correct error message
      dispatch(
        setErrorMessage(landmarkPool.length < 1 ? 'error.noLandmark' : 'error.tooFewLandmark'),
      )
      return null
    }

    // Select the landmarks
    const landmarks: LandmarkCode[] = []
    for (let index = 0; index < state.setup.landmarkCount; index++) {
      const chosenLandmark = takeRandom(landmarkPool)
      landmarks[index] = chosenLandmark.code
    }
    dispatch(setLandmarks(landmarks))
    dispatch(setCurrentPlayerIndex(null))
    dispatch(setCurrentIndex(null))

    return landmarks.length > 0 ? SetupStep.setUpLandmark : SetupStep.chooseHirelings
  },
}
