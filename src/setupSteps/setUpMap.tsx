import { useTranslation } from 'react-i18next'

import LocaleText from '../components/localeText'
import MapChart from '../components/mapChart'
import Section from '../components/section'
import { STANDARD_MAP_SIZE } from '../constants'
import { useAppSelector } from '../hooks'
import { selectSetupMap } from '../store'
import { SetupStep } from '../types'

const SetUpMapStep: React.FC = () => {
  const { t } = useTranslation()
  const setupMap = useAppSelector(selectSetupMap)
  const skippedSteps = useAppSelector(state => state.flow.skippedSteps)

  if (!setupMap) return null

  let markerKey = null
  if (setupMap.clearings.length > STANDARD_MAP_SIZE) {
    markerKey = setupMap.clearings.some(clearing => clearing.flooded) ? 'floodSuit' : 'landmarkSuit'
  } else if (!setupMap.fixedSuits || !setupMap.printedSuits) {
    markerKey = skippedSteps[SetupStep.setUpBots] ? 'suit' : 'suitPriority'
  } else if (!skippedSteps[SetupStep.setUpBots]) {
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

export default SetUpMapStep
