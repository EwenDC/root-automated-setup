import type { SetupStepComponent } from '..'

import Checkbox from '../../components/checkbox'
import ComponentToggle from '../../components/componentToggle'
import Section from '../../components/section'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectExpansionArray, setIncludeBots, toggleExpansion } from '../../store'

const ChooseExpansionsStep: SetupStepComponent = () => {
  const includeBots = useAppSelector(state => state.setup.includeBots)
  const dispatch = useAppDispatch()

  return (
    <Section textKey="setupStep.chooseExpansions.body">
      <ComponentToggle
        selector={selectExpansionArray}
        toggleComponent={toggleExpansion}
        getLabelKey={expansion => `expansion.${expansion.code}`}
        unsorted
      />
      <Checkbox
        labelKey="label.includeBotStep"
        defaultValue={includeBots}
        onChange={checked => dispatch(setIncludeBots(checked))}
      />
    </Section>
  )
}

export default ChooseExpansionsStep
