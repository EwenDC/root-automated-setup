import type { SetupStepComponent } from '..'

import NumberSelector from '../../components/numberSelector'
import Radiogroup from '../../components/radiogroup'
import Section from '../../components/section'
import { MAX_BOT_COUNT } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  fixFirstPlayer,
  selectBotArray,
  selectFactionArray,
  setBotCount,
  setPlayerCount,
} from '../../store'

const SeatPlayersStep: SetupStepComponent = () => {
  const fixedFirstPlayer = useAppSelector(state => state.setup.fixedFirstPlayer)
  const playerCount = useAppSelector(state => state.setup.playerCount)
  const botCount = useAppSelector(state => state.setup.botCount)
  const factions = useAppSelector(selectFactionArray)
  const availableBots = useAppSelector(selectBotArray).length
  const dispatch = useAppDispatch()
  const botMaxVal = Math.min(availableBots, MAX_BOT_COUNT)

  return (
    <Section
      titleKey="setupStep.seatPlayers.title"
      textKey="setupStep.seatPlayers.body"
    >
      <NumberSelector
        labelKey="label.playerCount"
        value={playerCount}
        minVal={availableBots > 0 ? 1 : 2}
        maxVal={factions.length}
        onChange={value => dispatch(setPlayerCount(value))}
      />
      {availableBots > 0 ? (
        <NumberSelector
          labelKey="label.botCount"
          value={botCount}
          minVal={0}
          maxVal={botMaxVal}
          onChange={value => dispatch(setBotCount(value))}
        />
      ) : null}
      <Radiogroup
        falseLabelKey="label.fixedFirstPlayer.false"
        trueLabelKey="label.fixedFirstPlayer.true"
        defaultValue={fixedFirstPlayer}
        onChange={value => dispatch(fixFirstPlayer(value))}
      />
    </Section>
  )
}

export default SeatPlayersStep
