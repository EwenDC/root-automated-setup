import type { SetupStepDefinition } from '..'

import { placeLandmark, selectSetupMap } from '../../store'
import { SetupStep } from '../../types'
import SetUpMapStep from '../components/setUpMapStep'

export const setUpMap: SetupStepDefinition = {
  component: SetUpMapStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const setupMap = selectSetupMap(state)
    const useHouserules = state.setup.useHouserules
    const mountainLandmarkCode = state.setup.mountainLandmarkCode

    // Automatically register the map-specific landmark as "placed"
    if (setupMap?.useLandmark && setupMap.landmark) {
      const isMountain = setupMap.code === 'mountain'
      const landmarkCode = //Pulls the code for the mountain or lake map landmark
        isMountain && useHouserules ? mountainLandmarkCode : setupMap.landmark.code
      const landmarkIndex = //Reference the clearing index of the mountain/lake map
        isMountain ? 4 : 11

      dispatch(
        placeLandmark({
          code: landmarkCode,
          clearingIndex: landmarkIndex,
        }),
      )
    }

    return SetupStep.chooseDeck
  },
}
