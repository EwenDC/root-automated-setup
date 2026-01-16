import type { SetupStepComponent } from '.'

import { stepMap } from './stepMap'

const StepSwitch: SetupStepComponent = ({ flowSlice }) => {
  const { component: Step } = stepMap[flowSlice.step]
  return <Step flowSlice={flowSlice} />
}

export default StepSwitch
