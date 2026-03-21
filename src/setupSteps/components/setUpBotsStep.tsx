import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectBotArray } from '../../store'

const SetUpBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const { selectedBots } = flowSlice
  const allBots = useAppSelector(selectBotArray)

  const botCode = selectedBots.length > 0 ? selectedBots[selectedBots.length - 1] : null
  const bot = allBots.find(b => b.code === botCode)
  const ruinPlacer = useAppSelector(state => state.flow.ruinPlacer)
  const ruinFaction = bot?.baseFactionCode === 'warlord' || bot?.baseFactionCode === 'vagabond'

  if (!botCode) return null

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
