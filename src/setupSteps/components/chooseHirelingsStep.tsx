import type { SetupStepComponent } from '..'

import Checkbox from '../../components/checkbox'
import ComponentToggle from '../../components/componentToggle'
import NumberSelector from '../../components/numberSelector'
import Section from '../../components/section'
import { HIRELING_SETUP_COUNT } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectHirelingArray, setHirelingCount, toggleHireling } from '../../store'

const ChooseHirelingsStep: SetupStepComponent = () => {
  const includeHirelings = useAppSelector(state => state.setup.hirelingCount > 0)
  const dispatch = useAppDispatch()
  const useHouseRules = useAppSelector(state => state.setup.useHouserules)
  const hirelingCount = useAppSelector(state => state.setup.hirelingCount)
  const hirelings = useAppSelector(selectHirelingArray)

  const enabledHirelingCount = hirelings.filter(hireling => hireling.enabled).length
  const maxAllowed = enabledHirelingCount

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
      {includeHirelings && useHouseRules ? (
        <NumberSelector
          labelKey="label.hirelingCount"
          value={hirelingCount}
          minVal={0}
          maxVal={maxAllowed}
          onChange={value => dispatch(setHirelingCount(value))}
        />
      ) : null}
      {hirelingCount > 0 ? (
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
