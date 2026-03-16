import type { SetupStepComponent } from '..'
import type { Expansion, Hireling, SetupClearing, SetupMapState } from '../../types'

import * as componentDefinitions from '../../componentDefinitions'
import LocaleText from '../../components/localeText'
import MapChart from '../../components/mapChart'
import Section from '../../components/section'
import { validateHirelingPlacement } from '../../functions/validation'
import { useAppDispatch, useAppSelector, usePlayerNumber } from '../../hooks'
import { placeHireling, selectSetupMap } from '../../store'

const SetUpHirelingStep: SetupStepComponent = ({ flowSlice }) => {
  const mapData = useAppSelector(selectSetupMap)
  const setupState = useAppSelector(state => state.setup)
  const useHouserules = setupState.useHouserules
  const playerNumber = usePlayerNumber(flowSlice)
  const dispatch = useAppDispatch()

  const { index, hirelingPool } = flowSlice

  const selectedHireling = index != null ? hirelingPool[index] : null
  if (!selectedHireling || !mapData) return null

  let hirelingDef: Hireling | null = null
  for (const exportValue of Object.values(componentDefinitions)) {
    if (typeof exportValue === 'object') {
      for (const expansion of Object.values(exportValue)) {
        const typedExpansion = expansion as Partial<Expansion>

        if (typedExpansion.hirelings && selectedHireling.code in typedExpansion.hirelings) {
          hirelingDef = typedExpansion.hirelings[selectedHireling.code] ?? null
          break
        }
      }
    }
    if (hirelingDef) break
  }

  const validClearings: number[] = []
  if (hirelingDef) {
    mapData.clearings.forEach((baseClearing, i) => {
      const dynamicClearingState = setupState.clearings[i] ?? {}
      const mergedClearing = {
        ...baseClearing,
        ...dynamicClearingState,
      } as unknown as SetupClearing

      const passesTagRules = validateHirelingPlacement(i, mergedClearing, hirelingDef, [])

      const passesCustomRules = hirelingDef.isValidPlacement
        ? hirelingDef.isValidPlacement(
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
    dispatch(placeHireling({ clearingIndex, code: selectedHireling.code }))
  }

  const noValidClearings = validClearings.length === 0

  const rules = hirelingDef?.placementRules ?? []
  const placementCount = hirelingDef?.placementCount ?? 1
  const disableMapChart =
    rules.includes('forest') ||
    rules.includes('path') ||
    placementCount > 1 ||
    rules.includes('allClearings') ||
    rules.includes('allRuins')

  const displayMapChart = disableMapChart ? (
    <Section>
      <MapChart
        onClearingClick={handleClearingClick}
        useHouserules={useHouserules}
        validClearings={validClearings}
      />
      <div>
        <p>
          <LocaleText
            i18nKey={`hireling.${selectedHireling.code}.setup`}
            tOptions={{
              context: selectedHireling.demoted ? 'demoted' : undefined,
              count: playerNumber,
            }}
          />
          <LocaleText i18nKey="error.disabledPlacement" />
        </p>
      </div>
    </Section>
  ) : (
    <Section subtitleKey={`hireling.${selectedHireling.code}.setupTitle`}>
      <MapChart
        onClearingClick={handleClearingClick}
        useHouserules={useHouserules}
        validClearings={validClearings}
      />

      <div>
        {noValidClearings ? (
          <p>
            <LocaleText i18nKey="error.noValidClearings" />
          </p>
        ) : (
          <p>
            <LocaleText
              i18nKey={`hireling.${selectedHireling.code}.setup`}
              tOptions={{
                context: selectedHireling.demoted ? 'demoted' : undefined,
                count: playerNumber,
              }}
            />
          </p>
        )}
      </div>
    </Section>
  )

  return displayMapChart
}

export default SetUpHirelingStep
