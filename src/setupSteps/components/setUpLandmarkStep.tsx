import type { SetupStepComponent } from '..'

import LocaleText from '../../components/localeText'
import MapChart from '../../components/mapChart'
import Section from '../../components/section'
import { useAppDispatch, useAppSelector, usePlayerNumber } from '../../hooks'
import { placeLandmark, selectSetupMapCode } from '../../store'

const SetUpLandmarkStep: SetupStepComponent = ({ flowSlice }) => {
  const map = useAppSelector(selectSetupMapCode)
  const useHouserules = useAppSelector(state => state.setup.useHouserules)
  const playerNumber = usePlayerNumber(flowSlice)
  const dispatch = useAppDispatch()
  const { landmarkPool, index } = flowSlice

  const selectedLandmark = index != null ? landmarkPool[index] : null
  if (!selectedLandmark) return null

  const handleClearingClick = (clearingIndex: number) => {
    dispatch(placeLandmark({ code: selectedLandmark, clearingIndex }))
  }

  // INTERACTIVE HOUSERULES UI
  if (useHouserules) {
    return (
      <Section subtitleKey={`landmark.${selectedLandmark}.setupTitle`}>
        <MapChart onClearingClick={handleClearingClick} />
        <p>
          <LocaleText
            i18nKey={`landmark.${selectedLandmark}.setup`}
            tOptions={{
              context: map,
              count: playerNumber,
            }}
          />
        </p>
      </Section>
    )
  }

  // STANDARD RULES UI (Fallback)
  return (
    <Section
      subtitleKey={`landmark.${selectedLandmark}.setupTitle`}
      textKey={`landmark.${selectedLandmark}.setup`}
      translationOptions={{
        context: map,
        count: playerNumber,
      }}
    />
  )
}

export default SetUpLandmarkStep
