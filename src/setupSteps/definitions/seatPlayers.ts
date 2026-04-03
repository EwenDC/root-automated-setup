import type { SetupStepDefinition } from '..'

import { selectFactionArray, setErrorMessage, setFirstPlayer, setPlayerCount } from '../../store'
import { SetupStep } from '../../types'
import SeatPlayersStep from '../components/seatPlayersStep'

export const seatPlayers: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    // Correct our current player count if it is too low or high (this can occur with undo/redo)
    const state = getState()
    if (state.setup.playerCount < 2 && !(state.setup.botCount > 0)) {
      dispatch(setPlayerCount(2))
    } else {
      const maxPlayerCount = selectFactionArray(state).length
      if (state.setup.playerCount > maxPlayerCount) {
        dispatch(setPlayerCount(maxPlayerCount))
      }
    }
    return null
  },

  component: SeatPlayersStep,

  afterStep(dispatch, getState) {
    const { setup } = getState()
    let firstPlayer: number

    // Do we need to randomize the first player
    if (setup.fixedFirstPlayer) {
      // First player is always "1" as the player number represents turn order
      firstPlayer = 1
    } else {
      // Randomly pick a first player between 1 and playerCount, as the player number represents table seating order
      firstPlayer = Math.floor(Math.random() * setup.playerCount) + 1
    }
    dispatch(setFirstPlayer(firstPlayer))
    // Check if somebody snuck in with 1 player and no bots (Choose 1 bot, choose 1 player, choose 0 bots, remains at 1 player)
    if (setup.botCount < 1 && setup.playerCount < 2) {
      dispatch(setErrorMessage('error.tooFewPlayerBots'))
      return null
    }

    return SetupStep.chooseMap
  },
}
