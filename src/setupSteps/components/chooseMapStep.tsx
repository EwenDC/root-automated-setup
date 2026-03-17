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
  toggleMountainLandmark,
} from '../../store'

const ChooseMapStep: SetupStepComponent = () => {
  const mapArray = useAppSelector(selectMapArray)
  const balancedSuits = useAppSelector(state => state.setup.balancedSuits)
  const useHouserules = useAppSelector(state => state.setup.useHouserules)
  const mountainLandmarkCode = useAppSelector(state => state.setup.mountainLandmarkCode)

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

  const mountainEnabled = sortedMaps.some(m => m.code === 'mountain')

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
      {useHouserules && mountainEnabled ? (
        <Checkbox
          labelKey={`map.mountain.useHouserule`}
          defaultValue={mountainLandmarkCode === 'city'}
          onChange={() => dispatch(toggleMountainLandmark())}
        />
      ) : (
        ''
      )}
    </Section>
  )
}

export default ChooseMapStep
