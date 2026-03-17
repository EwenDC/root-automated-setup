import type { SetupStepDefinition } from '..'

import {
  addToSelectedBots,
  clearExcludedFactions,
  lockBot,
  massComponentLock,
  pushExcludedFactions,
  removeFromBotPool,
  resetBotPool,
  resetSelectedBots,
  selectBotArray,
  selectFactionCodes,
  setCurrentIndex,
  setErrorMessage,
} from '../../store'
import { SetupStep } from '../../types'
import SelectBotsStep from '../components/selectBotsStep'

export const selectBots: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const state = getState()

    if (!state.setup.includeBots || state.setup.botCount === 0) {
      return SetupStep.chooseLandmarks
    }

    if (state.flow.selectedBots.length >= state.setup.botCount) {
      dispatch(setCurrentIndex(null))
      return SetupStep.chooseLandmarks
    }

    if (selectBotArray(state).length < 1) {
      // Clear state of any potential stale data
      if (state.setup.excludedFactions.length > 0) dispatch(clearExcludedFactions())
      if (state.flow.botPool.length > 0) dispatch(resetBotPool())
      if (state.flow.selectedBots.length > 0) dispatch(resetSelectedBots())
      return SetupStep.drawCards
    }

    const factionCodes = selectFactionCodes(state)
    const noSpareFactions = state.setup.playerCount >= factionCodes.size

    dispatch(
      massComponentLock(
        selectBotArray,
        ({ excludeFactions }) =>
          noSpareFactions && excludeFactions?.some(faction => factionCodes.has(faction))
            ? 'error.factionHirelingExcluded'
            : false,
        lockBot,
      ),
    )

    return null
  },

  component: SelectBotsStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const { flow } = state

    if (flow.currentIndex == null) {
      dispatch(setErrorMessage('error.noBot'))
      return null
    }

    const allBots = selectBotArray(state)
    const availableBots = allBots.filter(b => flow.botPool.includes(b.code))
    const selectedBot = availableBots[flow.currentIndex]

    if (!selectedBot) {
      return null
    }

    dispatch(addToSelectedBots(selectedBot.code))
    dispatch(
      removeFromBotPool({
        code: selectedBot.code,
        baseFactionCode: selectedBot.baseFactionCode,
      }),
    )

    if (selectedBot.excludeFactions && selectedBot.excludeFactions.length > 0) {
      dispatch(pushExcludedFactions(selectedBot.excludeFactions))
    }

    dispatch(setCurrentIndex(flow.selectedBots.length))
    return SetupStep.setUpBots
  },
}
