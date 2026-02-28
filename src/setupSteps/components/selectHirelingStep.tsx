import type { SetupStepComponent } from '..'

import ComponentSelect from '../../components/componentSelect'
import Section from '../../components/section'
import { usePlayerNumber } from '../../hooks'
import { selectHirelingPoolFull } from '../../store'

const SelectHirelingStep: SetupStepComponent = ({ flowSlice }) => {
  const playerNumber = usePlayerNumber(flowSlice)

  return (
    <Section
      subtitleKey="setupStep.selectHireling.subtitle"
      textKey="setupStep.selectHireling.body"
      translationOptions={{ count: playerNumber }}
    >
      <ComponentSelect
        flowSlice={flowSlice}
        selector={selectHirelingPoolFull}
        getLabelKey={hireling =>
          `hireling.${hireling.code}.name${hireling.demoted ? '_demoted' : ''}`
        }
      />
    </Section>
  )
}

export default SelectHirelingStep
