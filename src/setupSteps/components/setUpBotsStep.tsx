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

  console.log(bot?.baseFactionCode)

  if (index == null) return null
  if (!selectedBotEntry) return null
  return (
    <Section
      titleKey={`bot.${botCode}.name`}
      textKey={`bot.${botCode}.setup`}
    ></Section>
  )
}

export default SetUpBotsStep
