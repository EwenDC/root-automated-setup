import type { SetupStepComponent, SetupStepDefinition } from '..'

import Section from '../../components/section'
import { useAppSelector, usePlayerNumber } from '../../hooks'
import { goBackInPlayerTurnOrder, setCurrentIndex } from '../../store'
import { SetupStep } from '../../types'

const SetUpHirelingStep: SetupStepComponent = ({ flowSlice }) => {
  const hireling = useAppSelector(state => state.setup.hirelings[flowSlice.index ?? 0])
  const playerNumber = usePlayerNumber(flowSlice)

  if (!hireling) return null
  return (
    <Section
      subtitleKey={`hireling.${hireling.code}.setupTitle`}
      textKey={`hireling.${hireling.code}.setup`}
      translationOptions={{
        context: hireling.demoted ? 'demoted' : undefined,
        count: playerNumber,
      }}
    />
  )
}

export const setUpHireling: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { flow } = getState()
    // Move on to the next player and hireling
    dispatch(goBackInPlayerTurnOrder())
    dispatch(setCurrentIndex(flow.currentIndex == null ? 0 : flow.currentIndex + 1))
    return null
  },

  component: SetUpHirelingStep,

  afterStep(_dispatch, getState) {
    const state = getState()

    // Setup the next hireling, if there is one
    const nextIndex = (state.flow.currentIndex ?? 0) + 1
    return nextIndex < state.setup.hirelingCount
      ? SetupStep.setUpHireling
      : SetupStep.postHirelingSetup
  },
}
