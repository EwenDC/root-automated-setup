import type { SetupStepComponent } from '..'

import ComponentToggle from '../../components/componentToggle'
import Section from '../../components/section'
import { selectExpansionArray, toggleExpansion } from '../../store'

const ChooseExpansionsStep: SetupStepComponent = () => {
  return (
    <Section textKey="setupStep.chooseExpansions.body">
      <ComponentToggle
        selector={selectExpansionArray}
        toggleComponent={toggleExpansion}
        getLabelKey={expansion => `expansion.${expansion.code}`}
        unsorted
      />
    </Section>
  )
}

export default ChooseExpansionsStep
