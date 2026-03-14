import type { SetupStepComponent } from '..'

import NumberSelector from '../../components/numberSelector'
import Radiogroup from '../../components/radiogroup'
import Section from '../../components/section'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  fixFirstPlayer,
  selectExpansionArray,
  selectFactionArray,
  setBotCount,
  setPlayerCount,
} from '../../store'

const SeatPlayersStep: SetupStepComponent = () => {
  const fixedFirstPlayer = useAppSelector(state => state.setup.fixedFirstPlayer)
  const playerCount = useAppSelector(state => state.setup.playerCount)
  const botCount = useAppSelector(state => state.setup.botCount)
  const factions = useAppSelector(selectFactionArray)
  const dispatch = useAppDispatch()

  const includeBots = useAppSelector(state => state.setup.includeBots)
  const expansionArray = useAppSelector(selectExpansionArray)
  const botExpansions = ['clockwork', 'clockwork2']
  const botExpansionsEnabled = botExpansions.some(code =>
    expansionArray.some(expansion => expansion.code === code && expansion.enabled),
  )

  return (
    <Section
      titleKey="setupStep.seatPlayers.title"
      textKey="setupStep.seatPlayers.body"
    >
      <NumberSelector
        labelKey="label.playerCount"
        value={playerCount}
        minVal={includeBots ? 1 : 2}
        maxVal={factions.length}
        onChange={value => dispatch(setPlayerCount(value))}
      />
      {botExpansionsEnabled ? (
        <NumberSelector
          labelKey="label.botCount"
          value={botCount}
          minVal={0}
          maxVal={3}
          onChange={value => dispatch(setBotCount(value))}
        />
      ) : (
        ''
      )}
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
