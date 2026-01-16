import { useTranslation } from 'react-i18next'

import type { SetupStepComponent, SetupStepDefinition } from '..'

import LocaleText from '../../components/localeText'
import MapChart from '../../components/mapChart'
import Section from '../../components/section'
import { STANDARD_MAP_SIZE } from '../../constants'
import { useAppSelector } from '../../hooks'
import { selectSetupMap } from '../../store'
import { SetupStep } from '../../types'

const SetUpMapStep: SetupStepComponent = () => {
  const { t } = useTranslation()
  const setupMap = useAppSelector(selectSetupMap)
  const includeBots = useAppSelector(state => state.setup.includeBots)

  if (!setupMap) return null

  let markerKey = null
  if (setupMap.clearings.length > STANDARD_MAP_SIZE) {
    markerKey = setupMap.clearings.some(clearing => clearing.flooded) ? 'floodSuit' : 'landmarkSuit'
  } else if (!setupMap.fixedSuits || !setupMap.printedSuits) {
    markerKey = includeBots ? 'suitPriority' : 'suit'
  } else if (includeBots) {
    markerKey = 'priority'
  }

  return (
    <Section subtitleKey={`map.${setupMap.code}.setupTitle`}>
      <ol>
        <LocaleText i18nKey={`map.${setupMap.code}.setup`} />
        {setupMap.useLandmark ? (
          <LocaleText i18nKey={`map.${setupMap.code}.landmarkSetup`} />
        ) : null}
        {markerKey && (
          <LocaleText
            i18nKey={`label.placeMarkers.${markerKey}`}
            tOptions={
              setupMap.suitLandmarks && {
                fox: t(`landmark.${setupMap.suitLandmarks.fox}.name`),
                mouse: t(`landmark.${setupMap.suitLandmarks.mouse}.name`),
                rabbit: t(`landmark.${setupMap.suitLandmarks.rabbit}.name`),
              }
            }
          />
        )}
        <LocaleText i18nKey="setupStep.setUpMap.body" />
      </ol>
      <MapChart />
    </Section>
  )
}

export const setUpMap: SetupStepDefinition = {
  component: SetUpMapStep,
  afterStep: () => SetupStep.chooseDeck,
}
