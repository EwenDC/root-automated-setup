import { useTranslation } from 'react-i18next'

import type { SetupStepComponent, SetupStepDefinition } from '..'

import Checkbox from '../../components/checkbox'
import ComponentToggle from '../../components/componentToggle'
import Radiogroup from '../../components/radiogroup'
import Section from '../../components/section'
import { MIN_PLAYERS_NO_FLOOD } from '../../constants'
import { getEnabled } from '../../functions/filtering'
import { type SetupClearing, solveMapBalanced, solveMapRandom } from '../../functions/mapSolvers'
import { takeRandom } from '../../functions/random'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  balanceMapSuits,
  enableMapLandmark,
  lockMap,
  mapFixedSuits,
  massComponentLock,
  selectMapArray,
  setClearings,
  setErrorMessage,
  setMap,
  toggleMap,
} from '../../store'
import { SetupStep } from '../../types'

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
        className="map-toggle"
        selector={selectMapArray}
        toggleComponent={toggleMap}
        getLabelKey={map => `map.${map.code}.name`}
      />
      <Radiogroup
        id="balancedSuits"
        defaultValue={balancedSuits}
        onChange={value => dispatch(balanceMapSuits(value))}
      />
      {sortedMaps
        .filter(({ fixedSuits }) => fixedSuits != null)
        .map(({ code, fixedSuits }) => (
          <Checkbox
            key={code}
            id={`${code}FixedSuits`}
            labelKey={`map.${code}.fixedSuits`}
            defaultValue={fixedSuits}
            onChange={checked => dispatch(mapFixedSuits([code, checked]))}
          />
        ))}
      {sortedMaps
        .filter(({ useLandmark }) => useLandmark != null)
        .map(({ code, useLandmark }) => (
          <Checkbox
            key={code}
            id={`${code}UseLandmark`}
            labelKey={`map.${code}.useLandmark`}
            defaultValue={useLandmark}
            onChange={checked => dispatch(enableMapLandmark([code, checked]))}
          />
        ))}
    </Section>
  )
}

export const chooseMap: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { setup } = getState()
    // Exclude maps that don't support bots (if we wish to do bot setup)
    dispatch(
      massComponentLock(
        selectMapArray,
        ({ botPriorities }) => setup.includeBots && !botPriorities && 'error.mapBotsUnsupported',
        lockMap,
      ),
    )
    return null
  },

  component: ChooseMapStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const mapPool = getEnabled(selectMapArray(state))

    // Check that at least one map is available for selection
    if (mapPool.length < 1) {
      dispatch(setErrorMessage('error.noMap'))
      return null
    }

    // Choose a random map
    const map = takeRandom(mapPool)
    dispatch(setMap(map))

    // Assign the map suits based on player preferences
    const floodClearings = state.setup.playerCount < MIN_PLAYERS_NO_FLOOD
    let clearings: SetupClearing[]

    if (map.fixedSuits && map.defaultSuits) {
      clearings = map.clearings.map((clearing, index) => ({
        ...clearing,
        suit: map.defaultSuits![index]!,
      }))
    } else if (state.setup.balancedSuits) {
      clearings = solveMapBalanced(map, floodClearings)
    } else {
      clearings = solveMapRandom(map, floodClearings)
    }

    dispatch(setClearings(clearings))
    return SetupStep.setUpMap
  },
}
