import type { FlowSlice } from '../types'

import { stepActiveContext } from '../hooks'
import { stepMap } from './stepMap'

interface StepSwitchProps {
  flowSlice: FlowSlice
  active?: boolean
}

const StepSwitch: React.FC<StepSwitchProps> = ({ flowSlice, active = false }) => {
  const { component: Step } = stepMap[flowSlice.step]
  return (
    <stepActiveContext.Provider value={active}>
      <Step flowSlice={flowSlice} />
    </stepActiveContext.Provider>
  )
}

export default StepSwitch
