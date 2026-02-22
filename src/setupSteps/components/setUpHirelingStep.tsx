import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { useAppSelector, usePlayerNumber } from '../../hooks'

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

export default SetUpHirelingStep
