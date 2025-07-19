import Checkbox from '../components/checkbox'
import ComponentToggle from '../components/componentToggle'
import Section from '../components/section'
import { useAppDispatch, useAppSelector } from '../hooks'
import { savePersistedSetting, selectHirelingArray, skipSteps, toggleHireling } from '../store'
import { SetupStep } from '../types'

const ChooseHirelingsStep: React.FC = () => {
  const skippedSteps = useAppSelector(state => state.flow.skippedSteps)
  const dispatch = useAppDispatch()

  return (
    <Section
      titleKey="setupStep.chooseHirelings.title"
      textKey="setupStep.chooseHirelings.body"
    >
      <Checkbox
        id="includeHirelings"
        defaultValue={!skippedSteps[SetupStep.setUpHireling1]}
        onChange={checked => {
          dispatch(
            skipSteps(
              [
                SetupStep.setUpHireling1,
                SetupStep.setUpHireling2,
                SetupStep.setUpHireling3,
                SetupStep.postHirelingSetup,
              ],
              !checked,
            ),
          )
          savePersistedSetting('includeHirelings', checked)
        }}
      />
      {!skippedSteps[SetupStep.setUpHireling1] ? (
        <ComponentToggle
          selector={selectHirelingArray}
          toggleComponent={toggleHireling}
          getLabelKey={hireling => `hireling.${hireling.code}.name`}
        />
      ) : null}
    </Section>
  )
}

export default ChooseHirelingsStep
