import type { SetupStepDefinition } from '..'

import { getEnabled } from '../../functions/filtering'
// Make sure to import setErrorMessage
import { selectBotArray, setBotPool, setCurrentIndex, setErrorMessage } from '../../store'
import { SetupStep } from '../../types'
import ChooseBotsStep from '../components/chooseBotsStep'

export const chooseBots: SetupStepDefinition = {
  component: ChooseBotsStep,

  afterStep(dispatch, getState) {
    const state = getState()

    // Skip if bots are disabled or count is 0
    if (!state.setup.includeBots || state.setup.botCount === 0) {
      return SetupStep.chooseLandmarks
    }

    const selectedBots = getEnabled(selectBotArray(state))

    // Validation: Block progression if toggled bots don't match the botCount
    if (selectedBots.length !== state.setup.botCount) {
      dispatch(setErrorMessage('error.botCountMismatch'))
      return null
    }

    const botPool = selectedBots.map(bot => ({
      code: bot.code,
      difficulty: 'Normal' as const,
      selectedTraits: [],
    }))

    dispatch(setBotPool(botPool))
    dispatch(setCurrentIndex(null))

    return botPool.length > 1 ? SetupStep.selectBots : SetupStep.setUpBots
  },
}
