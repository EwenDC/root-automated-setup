import type { SetupStepComponent } from '..'

import componentDefinitions from '../../componentDefinitions'
import Checkbox from '../../components/checkbox'
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
  setUseHouserules,
} from '../../store'

const SeatPlayersStep: SetupStepComponent = () => {
  const fixedFirstPlayer = useAppSelector(state => state.setup.fixedFirstPlayer)
  const playerCount = useAppSelector(state => state.setup.playerCount)
  const botCount = useAppSelector(state => state.setup.botCount)
  const useHouserules = useAppSelector(state => state.setup.useHouserules)
  const factions = useAppSelector(selectFactionArray)
  const dispatch = useAppDispatch()

  const includeBots = useAppSelector(state => state.setup.includeBots)
  const expansionArray = useAppSelector(selectExpansionArray)
  const botExpansions = ['clockwork', 'clockwork2', 'betaClockwork']
  const botExpansionsEnabled = botExpansions.some(code =>
    expansionArray.some(expansion => expansion.code === code && expansion.enabled),
  )

  const availableBots = expansionArray.reduce((totalCount, expansion) => {
    // If the expansion is enabled and is one of our recognized bot expansions
    if (expansion.enabled && botExpansions.includes(expansion.code)) {
      // Look up the expansion in component definitions (typecast as needed for your TS setup)
      const expansionConfig = componentDefinitions[expansion.code]

      // If the expansion has bots defined, add the number of bots to our total
      if (expansionConfig && 'bots' in expansionConfig && expansionConfig.bots) {
        return totalCount + Object.keys(expansionConfig.bots).length
      }
    }
    return totalCount
  }, 0)

  const botMaxVal = availableBots === 1 ? 1 : availableBots === 2 ? 2 : 3

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
          maxVal={botMaxVal}
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

      <Checkbox
        labelKey="label.useHouserules"
        defaultValue={useHouserules}
        onChange={checked => dispatch(setUseHouserules(checked))}
      />
    </Section>
  )
}

export default SeatPlayersStep
