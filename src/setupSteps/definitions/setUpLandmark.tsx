import type { SetupStepComponent, SetupStepDefinition } from '..'

import Section from '../../components/section'
import { useAppSelector, usePlayerNumber } from '../../hooks'
import { goBackInPlayerTurnOrder, selectSetupMapCode, setCurrentIndex } from '../../store'
import { SetupStep } from '../../types'

const SetUpLandmarkStep: SetupStepComponent = ({ flowSlice }) => {
  const landmark = useAppSelector(state => state.setup.landmarks[flowSlice.index ?? 0])
  const map = useAppSelector(selectSetupMapCode)
  const playerNumber = usePlayerNumber(flowSlice)

  return (
    <Section
      subtitleKey={`landmark.${landmark}.setupTitle`}
      textKey={`landmark.${landmark}.setup`}
      translationOptions={{
        context: map,
        count: playerNumber,
      }}
    />
  )
}

export const setUpLandmark: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { flow } = getState()
    // Move on to the next player and landmark
    dispatch(goBackInPlayerTurnOrder())
    dispatch(setCurrentIndex(flow.currentIndex == null ? 0 : flow.currentIndex + 1))
    return null
  },

  component: SetUpLandmarkStep,

  afterStep(_dispatch, getState) {
    const state = getState()

    // Setup the next landmark, if there is one
    const nextIndex = (state.flow.currentIndex ?? 0) + 1
    return nextIndex < state.setup.landmarkCount
      ? SetupStep.setUpLandmark
      : SetupStep.chooseHirelings
  },
}
