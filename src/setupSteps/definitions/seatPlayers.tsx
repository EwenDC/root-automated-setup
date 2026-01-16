import type { SetupStepComponent, SetupStepDefinition } from '..'

import NumberSelector from '../../components/numberSelector'
import Radiogroup from '../../components/radiogroup'
import Section from '../../components/section'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fixFirstPlayer, selectFactionArray, setFirstPlayer, setPlayerCount } from '../../store'
import { SetupStep } from '../../types'

const SeatPlayersStep: SetupStepComponent = () => {
  const fixedFirstPlayer = useAppSelector(state => state.setup.fixedFirstPlayer)
  const playerCount = useAppSelector(state => state.setup.playerCount)
  const includeBots = useAppSelector(state => state.setup.includeBots)
  const factions = useAppSelector(selectFactionArray)
  const dispatch = useAppDispatch()

  return (
    <Section
      titleKey="setupStep.seatPlayers.title"
      textKey="setupStep.seatPlayers.body"
    >
      <NumberSelector
        id="playerCount"
        value={playerCount}
        minVal={includeBots ? 1 : 2}
        maxVal={factions.length}
        onChange={value => dispatch(setPlayerCount(value))}
      />
      <Radiogroup
        id="fixedFirstPlayer"
        defaultValue={fixedFirstPlayer}
        onChange={value => dispatch(fixFirstPlayer(value))}
      />
    </Section>
  )
}

export const seatPlayers: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    // Correct our current player count if it is too low or high (this can occur with undo/redo)
    const state = getState()
    if (state.setup.playerCount < 2 && !state.setup.includeBots) {
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

    return SetupStep.chooseMap
  },
}
