import type { SetupStepComponent } from '..'

import Checkbox from '../../components/checkbox'
import ComponentToggle from '../../components/componentToggle'
import Section from '../../components/section'
import { HIRELING_SETUP_COUNT } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectHirelingArray, setHirelingCount, toggleHireling } from '../../store'

const ChooseHirelingsStep: SetupStepComponent = () => {
  const includeHirelings = useAppSelector(state => state.setup.hirelingCount > 0)
  const dispatch = useAppDispatch()

  return (
    <Section
      titleKey="setupStep.chooseHirelings.title"
      textKey="setupStep.chooseHirelings.body"
    >
      <Checkbox
        labelKey="label.includeHirelings"
        defaultValue={includeHirelings}
        onChange={checked => dispatch(setHirelingCount(checked ? HIRELING_SETUP_COUNT : 0))}
      />
      {includeHirelings ? (
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
