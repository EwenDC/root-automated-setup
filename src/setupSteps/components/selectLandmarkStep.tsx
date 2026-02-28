import type { SetupStepComponent } from '..'

import ComponentSelect from '../../components/componentSelect'
import Section from '../../components/section'
import { usePlayerNumber } from '../../hooks'
import { selectLandmarkPoolFull } from '../../store'

const SelectLandmarkStep: SetupStepComponent = ({ flowSlice }) => {
  const playerNumber = usePlayerNumber(flowSlice)
  return (
    <Section
      subtitleKey="setupStep.selectLandmark.subtitle"
      textKey="setupStep.selectLandmark.body"
      translationOptions={{ count: playerNumber }}
    >
      <ComponentSelect
        flowSlice={flowSlice}
        selector={selectLandmarkPoolFull}
        getLabelKey={landmark => `landmark.${landmark.code}.name`}
      />
    </Section>
  )
}

export default SelectLandmarkStep
