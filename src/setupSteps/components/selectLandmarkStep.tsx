import type { SetupStepComponent } from '..'

import ComponentSetupSelect from '../../components/componentSetupSelect'
import Section from '../../components/section'
import { useAppSelector, usePlayerNumber } from '../../hooks'
import { selectLandmarkPoolFull, selectSetupMapCode } from '../../store'

const SelectLandmarkStep: SetupStepComponent = ({ flowSlice }) => {
  const map = useAppSelector(selectSetupMapCode)
  const playerNumber = usePlayerNumber(flowSlice)

  return (
    <Section
      subtitleKey="setupStep.selectLandmark.subtitle"
      textKey="setupStep.selectLandmark.body"
      translationOptions={{ count: playerNumber }}
    >
      <ComponentSetupSelect
        flowSlice={flowSlice}
        selector={selectLandmarkPoolFull}
        getLabelKey={landmark => `landmark.${landmark.code}.name`}
        getSetupTitleKey={landmark => `landmark.${landmark.code}.setupTitle`}
        getSetupKey={landmark => `landmark.${landmark.code}.setup`}
        getTranslationOptions={() => ({ context: map })}
      />
    </Section>
  )
}

export default SelectLandmarkStep
