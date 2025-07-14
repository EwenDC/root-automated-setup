import Checkbox from '../components/checkbox'
import ComponentToggle from '../components/componentToggle'
import Section from '../components/section'
import { useAppDispatch, useAppSelector } from '../hooks'
import { savePersistedSetting, selectExpansionArray, skipSteps, toggleExpansion } from '../store'
import { SetupStep } from '../types'

const ChooseExpansionsStep: React.FC = () => {
  const skippedSteps = useAppSelector(state => state.flow.skippedSteps)
  const dispatch = useAppDispatch()

  return (
    <Section textKey="setupStep.chooseExpansions.body">
      <ComponentToggle
        selector={selectExpansionArray}
        toggleComponent={toggleExpansion}
        getLabelKey={expansion => `expansion.${expansion.code}`}
        unsorted={true}
      />
      <Checkbox
        id="includeBotStep"
        defaultValue={!skippedSteps[SetupStep.setUpBots]}
        onChange={checked => {
          dispatch(skipSteps(SetupStep.setUpBots, !checked))
          savePersistedSetting('includeBotStep', checked)
        }}
      />
    </Section>
  )
}

export default ChooseExpansionsStep
