import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectBotArray } from '../../store'

const SetUpBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const { selectedBots, index } = flowSlice
  const allBots = useAppSelector(selectBotArray)
  const selectedBotEntry = index != null ? selectedBots[index] : null
  const botCode = selectedBotEntry
  const bot = allBots.find(b => b.code === botCode)
  const ruinPlacer = useAppSelector(state => state.flow.ruinPlacer)
  const ruinFaction = bot?.baseFactionCode === 'warlord' || bot?.baseFactionCode === 'vagabond'

  console.log(bot?.baseFactionCode)

  if (index == null) return null
  if (!selectedBotEntry) return null

  const ruinTextKey = ruinFaction
    ? ruinPlacer === null || ruinPlacer === botCode
      ? 'setupStep.setupRuins.title'
      : 'setupStep.skipRuins.title'
    : ''
  return (
    <Section
      titleKey={`bot.${botCode}.name`}
      textKey={`bot.${botCode}.setup`}
    >
      <Section textKey={ruinTextKey} />
    </Section>
  )
}

export default SetUpBotsStep
