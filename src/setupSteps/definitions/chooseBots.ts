import type { SetupStepDefinition } from '..'

import { MAX_CORNER_SETUPS } from '../../constants'
import { takeRandom } from '../../functions/random'
import {
  addToBotPool,
  lockBot,
  massComponentLock,
  resetBotPool,
  selectBotArray,
  selectBotCodes,
  setCurrentIndex,
  setCurrentPlayerIndex,
  setErrorMessage,
  setUseDraft,
} from '../../store'
import { type BotCode, SetupStep } from '../../types'
import ChooseBotsStep from '../components/chooseBotsStep'

export const chooseBots: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    const state = getState()
    const playerCount = state.setup.playerCount

    // Don't allow draft setup if we can't spare an extra Bot
    if (state.flow.useDraft) {
      const botCodes = selectBotCodes(state)
      const noSpareBots = playerCount >= botCodes.size
      if (noSpareBots) dispatch(setUseDraft(false))
    }

    // Disable the factions that are mutually exclusive with the selected hirelings
    // Also disable insurgent factions if we're only playing with 2 people and no bots or hirelings
    dispatch(
      massComponentLock(
        selectBotArray,
        ({ code, militant }) => {
          // Disable insurgent Bots if we're only playing with 2 people and no bots or hirelings
          if (
            playerCount < 3 &&
            !militant &&
            state.setup.hirelingCount < 1 &&
            !state.setup.includeBots
          ) {
            return 'error.tooFewPlayerInsurgent'
          }
          // Disable a Bot if it was replaced by an equivalent hireling
          if (state.setup.excludedBots.includes(code)) return 'error.hirelingSelected'
          return false
        },
        lockBot,
      ),
    )

    return null
  },

  component: ChooseBotsStep,

  afterStep(dispatch, getState) {
    const state = getState()
    const useDraft = state.flow.useDraft
    const playerCount = state.setup.playerCount

    // Clear the faction pool of any potential stale data from previous setups
    if (state.flow.botPool.length > 0) dispatch(resetBotPool())

    // Get our list of militant and insurgent Bots which are available for selection
    const workingBotPool = selectBotArray(state).filter(
      ({ enabled, militant }) => enabled && militant,
    )
    const insurgentBots = selectBotArray(state).filter(
      ({ enabled, militant }) => enabled && !militant,
    )

    // Set the appropriate number of Bots for setup
    const botCount = useDraft ? playerCount + 1 : playerCount

    // Check that there are enough Bots available for setup
    if (workingBotPool.length < 1 || workingBotPool.length + insurgentBots.length < botCount) {
      // Set the correct error message
      dispatch(
        setErrorMessage(workingBotPool.length < 1 ? 'error.noMilitantBot' : 'error.tooFewBot'),
      )
      return null
    }

    // Start by adding a random militant Bot
    const firstBot = takeRandom(workingBotPool)
    dispatch(addToBotPool(firstBot))
    // Add the insurgent Bots to the mix
    workingBotPool.push(...insurgentBots)

    let botsSetUp = 1
    // Keep track of if we've already used a corner in standard setup
    let cornerSetupCount = !useDraft && firstBot.standardSetup.cornerSetup ? 1 : 0
    const incompatibleBots = new Set<BotCode>(firstBot.excludeBots)

    // Add enough factions to make the total pool equal factionCount
    while (botsSetUp < botCount && workingBotPool.length > 0) {
      const candidateBot = takeRandom(workingBotPool)

      if (
        // Make sure we don't include more than 4 corner clearing Bots in standard setup
        (useDraft ||
          !candidateBot.standardSetup.cornerSetup ||
          cornerSetupCount < MAX_CORNER_SETUPS) &&
        // Don't include any Bots that are incompatible with ones already chosen
        !incompatibleBots.has(candidateBot.code)
      ) {
        dispatch(addToBotPool(candidateBot))
        botsSetUp++
        if (!useDraft && candidateBot.standardSetup.cornerSetup) cornerSetupCount++
        if (candidateBot.excludeBots) {
          candidateBot.excludeBots.forEach(bot => incompatibleBots.add(bot))
        }
      }
    }

    // Check if we were able to set up
    if (botsSetUp < botCount) {
      // Show appropriate error message
      dispatch(
        setErrorMessage(
          cornerSetupCount >= MAX_CORNER_SETUPS ? 'error.tooManyCornerSetup' : 'error.tooFewBot',
        ),
      )
      return null
    }

    dispatch(setCurrentPlayerIndex(null))
    dispatch(setCurrentIndex(null))
    return SetupStep.selectBots
  },
}
