import { createContext } from 'react'

import { useAppSelector } from '../hooks'
import { selectFlowSlice } from '../store'
import LanguageSelect from './languageSelect'
import StepSwitch from './stepSwitch'

export const stepActiveContext = createContext(false)

const StepList: React.FC = () => {
  const pastSteps = useAppSelector(state => state.flow.pastSteps)
  const currentFlowSlice = useAppSelector(selectFlowSlice)
  const futureSteps = useAppSelector(state => state.flow.futureSteps)

  return (
    <main>
      <LanguageSelect />

      {pastSteps.map((slice, index) => (
        // Key on index as entries are added and removed from the end
        <StepSwitch
          flowSlice={slice}
          key={index}
        />
      ))}

      <stepActiveContext.Provider value={true}>
        <StepSwitch flowSlice={currentFlowSlice} />
      </stepActiveContext.Provider>

      {futureSteps.map((slice, index, array) => (
        // Key on the negative index as entries are added and removed from the start
        <StepSwitch
          flowSlice={slice}
          key={array.length - index}
        />
      ))}
    </main>
  )
}

export default StepList
