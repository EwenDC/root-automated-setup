import type { SetupStepComponent } from '..'

import Checkbox from '../../components/checkbox'
import ComponentToggle from '../../components/componentToggle'
import Section from '../../components/section'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectExpansionArray, setIncludeBots, toggleExpansion } from '../../store'

const ChooseExpansionsStep: SetupStepComponent = () => {
  const includeBots = useAppSelector(state => state.setup.includeBots)
  const expansionArray = useAppSelector(selectExpansionArray)
  const botExpansions = ['clockwork', 'clockwork2']
  const botExpansionsEnabled = botExpansions.some(code =>
    expansionArray.some(expansion => expansion.code === code && expansion.enabled),
  )
  const dispatch = useAppDispatch()

  return (
    <Section textKey="setupStep.chooseExpansions.body">
      <ComponentToggle
        selector={selectExpansionArray}
        toggleComponent={toggleExpansion}
        getLabelKey={expansion => `expansion.${expansion.code}`}
        unsorted
      />
      {botExpansionsEnabled && (
        <Checkbox
          labelKey="label.includeBotStep"
          defaultValue={includeBots}
          onChange={checked => dispatch(setIncludeBots(checked))}
        />
      )}
    </Section>
  )
}

export default ChooseExpansionsStep
