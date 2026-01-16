import { useTranslation } from 'react-i18next'

import type { SetupStepComponent, SetupStepDefinition } from '..'

import Icon from '../../components/icon'
import IconList from '../../components/iconList'
import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import {
  removeCurrentFactionFromPool,
  selectFactionPoolFull,
  selectTwoPlayer,
  setCurrentIndex,
} from '../../store'
import { SetupStep } from '../../types'

const SetUpFactionStep: SetupStepComponent = ({ flowSlice }) => {
  const { index, factionPool, vagabondSetUp } = flowSlice
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const twoPlayer = useAppSelector(selectTwoPlayer)
  const factionPoolFull = useAppSelector(selectFactionPoolFull(factionPool))
  const { t } = useTranslation()

  if (index == null) return null

  const { key, vagabond, captains } = factionPoolFull[index]!

  // Use array so text can fall back to "default" if there is no "vagabondSetUp" variation
  const baseTextKey = `faction.${key}.${useDraft ? 'advancedSetup' : 'setup'}`
  const textKey = [`${baseTextKey}.default`]
  if (vagabondSetUp) {
    textKey.unshift(`${baseTextKey}.vagabondSetUp`)
  }

  const components = vagabond && {
    InitialStartingItems: <IconList list={vagabond.startingItems.slice(0, -1)} />,
    FinalStartingItem: <Icon icon={vagabond.startingItems[vagabond.startingItems.length - 1]!} />,
  }

  return (
    <Section
      subtitleKey={`faction.${key}.setupTitle`}
      textKey={textKey}
      translationOptions={{
        context: twoPlayer ? 'twoPlayer' : undefined,
        vagabond: vagabond && t(`vagabond.${vagabond.code}.name`),
        captain: captains.map(captain => t(`captain.${captain.code}.name`)),
      }}
      components={components}
    />
  )
}

export const setUpFaction: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const { flow } = getState()
    if (!flow.useDraft) {
      // Clear the faction we just set up (if there was one)
      if (flow.currentIndex != null) dispatch(removeCurrentFactionFromPool())
      // Automatically set up the first faction in the list of remaining factions
      dispatch(setCurrentIndex(0))
    }
    return null
  },

  component: SetUpFactionStep,

  afterStep(_dispatch, getState) {
    const state = getState()
    const { currentPlayerIndex, useDraft, factionPool } = state.flow

    if (useDraft) {
      // Keep going if we have players who haven't set up their faction yet
      return currentPlayerIndex != null && currentPlayerIndex > 0
        ? SetupStep.selectFaction
        : SetupStep.placeScoreMarkers
    } else {
      // Move on to setting up the next faction if there are any after the current one
      return factionPool.length > 1 ? SetupStep.setUpFaction : SetupStep.placeScoreMarkers
    }
  },
}
