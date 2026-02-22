import { useTranslation } from 'react-i18next'

import type { SetupStepComponent } from '..'

import Checkbox from '../../components/checkbox'
import ComponentToggle from '../../components/componentToggle'
import Radiogroup from '../../components/radiogroup'
import Section from '../../components/section'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  balanceMapSuits,
  enableMapLandmark,
  mapFixedSuits,
  selectMapArray,
  toggleMap,
} from '../../store'

const ChooseMapStep: SetupStepComponent = () => {
  const mapArray = useAppSelector(selectMapArray)
  const balancedSuits = useAppSelector(state => state.setup.balancedSuits)
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()

  const sortedMaps = mapArray
    .filter(
      ({ enabled, fixedSuits, useLandmark }) =>
        enabled && (fixedSuits != null || useLandmark != null),
    )
    .map(({ code, fixedSuits, useLandmark }) => ({
      code,
      label: t(`map.${code}.name`),
      fixedSuits,
      useLandmark,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, i18n.resolvedLanguage))

  return (
    <Section
      titleKey="setupStep.chooseMap.title"
      textKey="setupStep.chooseMap.body"
    >
      <ComponentToggle
        selector={selectMapArray}
        toggleComponent={toggleMap}
        getLabelKey={map => `map.${map.code}.name`}
      />
      <Radiogroup
        falseLabelKey="label.balancedSuits.false"
        trueLabelKey="label.balancedSuits.true"
        defaultValue={balancedSuits}
        onChange={value => dispatch(balanceMapSuits(value))}
      />
      {sortedMaps
        .filter(({ fixedSuits }) => fixedSuits != null)
        .map(({ code, fixedSuits }) => (
          <Checkbox
            key={`S_${code}`}
            labelKey={`map.${code}.fixedSuits`}
            defaultValue={fixedSuits}
            onChange={checked => dispatch(mapFixedSuits([code, checked]))}
          />
        ))}
      {sortedMaps
        .filter(({ useLandmark }) => useLandmark != null)
        .map(({ code, useLandmark }) => (
          <Checkbox
            key={`L_${code}`}
            labelKey={`map.${code}.useLandmark`}
            defaultValue={useLandmark}
            onChange={checked => dispatch(enableMapLandmark([code, checked]))}
          />
        ))}
    </Section>
  )
}

export default ChooseMapStep
