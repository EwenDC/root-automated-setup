import { useTranslation } from 'react-i18next'
import type { SetupStepComponent } from '..'

import LocaleText from '../../components/localeText'
import MapChart from '../../components/mapChart'
import Section from '../../components/section'
import { STANDARD_MAP_SIZE } from '../../constants'
import { useAppSelector } from '../../hooks'
import { selectSetupMap } from '../../store'

const SetUpMapStep: SetupStepComponent = () => {
  const { t } = useTranslation()
  const setupMap = useAppSelector(selectSetupMap)
  const includeBots = useAppSelector(state => state.setup.botCount > 0)
  const useHouserules = useAppSelector(state => state.setup.useHouserules)
  const mountainLandmarkCode = useAppSelector(state => state.setup.mountainLandmarkCode)

  if (!setupMap) return null

  let markerKey = null
  if (setupMap.clearings.length > STANDARD_MAP_SIZE) {
    markerKey = setupMap.clearings.some(clearing => 'flooded' in clearing && clearing.flooded)
      ? 'floodSuit'
      : 'landmarkSuit'
  } else if (!setupMap.fixedSuits || !setupMap.printedSuits) {
    markerKey = includeBots ? 'suitPriority' : 'suit'
  } else if (includeBots) {
    markerKey = 'priority'
  }

  let landmarkTextKey = null
  if (setupMap.useLandmark) {
    if (setupMap.code === 'mountain') {
      landmarkTextKey = `map.mountain.${mountainLandmarkCode}`
    } else {
      landmarkTextKey = `map.${setupMap.code}.landmarkSetup`
    }
  }

  return (
    <Section subtitleKey={`map.${setupMap.code}.setupTitle`}>
      <ol>
        <LocaleText i18nKey={`map.${setupMap.code}.setup`} />
        {landmarkTextKey && <LocaleText i18nKey={landmarkTextKey} />}
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
      <MapChart useHouserules={useHouserules} />
    </Section>
  )
}

export default SetUpMapStep
