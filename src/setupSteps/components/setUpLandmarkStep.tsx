import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { useAppSelector, usePlayerNumber } from '../../hooks'
import { selectSetupMapCode } from '../../store'

const SetUpLandmarkStep: SetupStepComponent = ({ flowSlice }) => {
  const map = useAppSelector(selectSetupMapCode)
  const playerNumber = usePlayerNumber(flowSlice)
  const { landmarkPool, index } = flowSlice

  const selectedLandmark = index != null && landmarkPool[index]
  if (!selectedLandmark) return null

  return (
    <Section
      subtitleKey={`landmark.${selectedLandmark}.setupTitle`}
      textKey={`landmark.${selectedLandmark}.setup`}
      translationOptions={{
        context: map,
        count: playerNumber,
      }}
    />
  )
}

export default SetUpLandmarkStep
