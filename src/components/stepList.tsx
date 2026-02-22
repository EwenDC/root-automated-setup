import { useAppSelector } from '../hooks'
import { StepSwitch } from '../setupSteps'
import { selectFlowSlice } from '../store'
import LanguageSelect from './languageSelect'

const StepList: React.FC = () => {
  const pastSteps = useAppSelector(state => state.flow.pastSteps)
  const currentFlowSlice = useAppSelector(selectFlowSlice)
  const futureSteps = useAppSelector(state => state.flow.futureSteps)

  return (
    <main>
      <LanguageSelect />

      {...pastSteps.map((slice, index) => (
        <StepSwitch
          key={index}
          flowSlice={slice}
        />
      ))}

      <StepSwitch
        key={pastSteps.length}
        flowSlice={currentFlowSlice}
        active
      />

      {...futureSteps.map((slice, index) => (
        <StepSwitch
          key={pastSteps.length + index + 1}
          flowSlice={slice}
        />
      ))}
    </main>
  )
}

export default StepList
