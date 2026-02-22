import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { useAppSelector, usePlayerNumber } from '../../hooks'
import { selectSetupMapCode } from '../../store'

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

export default SetUpLandmarkStep
