import type { SetupStepComponent } from '..'
import type { Expansion, Landmark, SetupClearing, SetupMapState } from '../../types'

import * as componentDefinitions from '../../componentDefinitions'
import LocaleText from '../../components/localeText'
import MapChart from '../../components/mapChart'
import Section from '../../components/section'
import { validateLandmarkPlacement } from '../../functions/validation'
import { useAppDispatch, useAppSelector, usePlayerNumber } from '../../hooks'
import { placeLandmark, selectSetupMap, selectSetupMapCode } from '../../store'

const SetUpLandmarkStep: SetupStepComponent = ({ flowSlice }) => {
  const mapCode = useAppSelector(selectSetupMapCode)
  const mapData = useAppSelector(selectSetupMap)
  const setupState = useAppSelector(state => state.setup)
  const placedLandmarks = useAppSelector(state => state.flow.placedLandmarks)
  const useHouserules = setupState.useHouserules
  const playerNumber = usePlayerNumber(flowSlice)
  const dispatch = useAppDispatch()

  const { index, landmarkPool } = flowSlice

  const selectedLandmark = index != null ? landmarkPool[index] : null
  if (!selectedLandmark || !mapData) return null

  let landmarkDef: Landmark | null = null
  for (const exportValue of Object.values(componentDefinitions)) {
    if (typeof exportValue === 'object') {
      for (const expansion of Object.values(exportValue)) {
        const typedExpansion = expansion as Partial<Expansion>

        if (typedExpansion.landmarks && selectedLandmark in typedExpansion.landmarks) {
          landmarkDef = typedExpansion.landmarks[selectedLandmark]!
          break
        }
      }
    }
    if (landmarkDef) break
  }

  const validClearings: number[] = []
  if (landmarkDef) {
    mapData.clearings.forEach((baseClearing, i) => {
      const dynamicClearingState = setupState.clearings[i] ?? {}
      const mergedClearing = {
        ...baseClearing,
        ...dynamicClearingState,
      } as unknown as SetupClearing

      const passesTagRules = validateLandmarkPlacement(
        i,
        mergedClearing,
        placedLandmarks,
        landmarkDef,
      )

      const passesCustomRules = landmarkDef.isValidPlacement
        ? landmarkDef.isValidPlacement(
            i,
            mergedClearing,
            mapData as unknown as SetupMapState,
            setupState,
          )
        : true

      if (passesTagRules && passesCustomRules) {
        validClearings.push(i)
      }
    })
  }

  const handleClearingClick = (clearingIndex: number) => {
    if (!useHouserules && !validClearings.includes(clearingIndex)) {
      return
    }
    dispatch(placeLandmark({ clearingIndex, code: selectedLandmark }))
  }

  const noValidClearings = validClearings.length === 0

  return (
    <Section subtitleKey={`landmark.${selectedLandmark}.setupTitle`}>
      <MapChart
        onClearingClick={handleClearingClick}
        activeLandmark={selectedLandmark}
        useHouserules={useHouserules}
        validClearings={validClearings}
      />

      <div>
        {noValidClearings ? (
          <p>
            <LocaleText i18nKey="error.noValidClearings" />
            {useHouserules ? <LocaleText i18nKey="error.noValidClearingsHouserule" /> : ''}
          </p>
        ) : (
          <p>
            <LocaleText
              i18nKey={`landmark.${selectedLandmark}.setup`}
              tOptions={{ context: mapCode, count: playerNumber }}
            />
          </p>
        )}
      </div>
    </Section>
  )
}

export default SetUpLandmarkStep
