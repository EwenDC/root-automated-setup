import type { SetupStepDefinition } from '..'

import {
  addToSelectedBots,
  pushExcludedFactions,
  removeFromBotPool,
  selectBotArray,
  setCurrentIndex,
} from '../../store'
import { SetupStep } from '../../types'
import SetUpBotsStep from '../components/setUpBotsStep'

export const setUpBots: SetupStepDefinition = {
  component: SetUpBotsStep,

  beforeStep(dispatch, getState) {
    const state = getState()
    const { flow } = state

    // If index is not null this is the first instance of selecting a bot
    if (flow.currentIndex != null) {
      const allBots = selectBotArray(state)
      const availableBots = allBots.filter(b => flow.botPool.includes(b.code))
      const selectedBot = availableBots[flow.currentIndex]

      if (selectedBot) {
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
      }
      dispatch(setCurrentIndex(null))
    }
    return null
  },

  afterStep(dispatch, _getState) {
    dispatch(setCurrentIndex(null))
    return SetupStep.selectBots
  },
}
