import type { SetupStepDefinition } from '..'

import {
  addToBotPool,
  clearExcludedFactions,
  lockBot,
  massComponentLock,
  pushExcludedFactions,
  removeCurrentBotFromPool,
  resetBotPool,
  //pushStateToPast,
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

    if (selectBotArray(state).length < 1) {
      // Clear state of any potential stale data
      if (state.setup.excludedFactions.length > 0) dispatch(clearExcludedFactions())
      if (state.flow.botPool.length > 0) dispatch(resetBotPool())
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

    if (state.flow.botPool.length >= state.setup.botCount) {
      dispatch(setCurrentIndex(null))
      return SetupStep.setUpBots
    }

    return null
  },

  component: SelectBotsStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const { flow, setup } = state

    if (flow.currentIndex == null) {
      dispatch(setErrorMessage('error.noBot'))
      return null
    }

    const selectedBot = selectBotArray(state)[flow.currentIndex]

    if (!selectedBot || flow.botPool.some(b => b === selectedBot.code)) {
      return null
    }

    //dispatch(pushStateToPast())
    dispatch(setCurrentIndex(null))
    dispatch(addToBotPool(selectedBot.code))
    dispatch(removeCurrentBotFromPool())
    if (selectedBot.excludeFactions && selectedBot.excludeFactions.length > 0) {
      dispatch(pushExcludedFactions(selectedBot.excludeFactions))
    }

    if (flow.botPool.length + 1 >= setup.botCount) {
      dispatch(setCurrentIndex(0))
    }

    if (flow.botPool.length + 1 >= setup.botCount) {
      dispatch(setCurrentIndex(0))
      return SetupStep.setUpBots
    }

    return SetupStep.selectBots
  },
}
