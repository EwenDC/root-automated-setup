import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { usePlayerNumber } from '../../hooks'

const SetUpHirelingStep: SetupStepComponent = ({ flowSlice }) => {
  const playerNumber = usePlayerNumber(flowSlice)
  const { hirelingPool, index } = flowSlice

  const selectedHireling = index != null && hirelingPool[index]
  if (!selectedHireling) return null

  return (
    <Section
      subtitleKey={`hireling.${selectedHireling.code}.setupTitle`}
      textKey={`hireling.${selectedHireling.code}.setup`}
      translationOptions={{
        context: selectedHireling.demoted ? 'demoted' : undefined,
        count: playerNumber,
      }}
    />
  )
}

export default SetUpHirelingStep
