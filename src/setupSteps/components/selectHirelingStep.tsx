import type { SetupStepComponent } from '..'

import ComponentSetupSelect from '../../components/componentSetupSelect'
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
      <ComponentSetupSelect
        flowSlice={flowSlice}
        selector={selectHirelingPoolFull}
        getLabelKey={hireling => `hireling.${hireling.code}.name`}
        getSetupTitleKey={hireling => `hireling.${hireling.code}.setupTitle`}
        getSetupKey={hireling => `hireling.${hireling.code}.setup`}
        getTranslationOptions={hireling => ({ context: hireling.demoted ? 'demoted' : undefined })}
      />
    </Section>
  )
}

export default SelectHirelingStep
