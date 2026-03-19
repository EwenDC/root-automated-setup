import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectBotArray } from '../../store'

const SetUpBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const { selectedBots } = flowSlice
  const allBots = useAppSelector(selectBotArray)

  const botCode = selectedBots.length > 0 ? selectedBots[selectedBots.length - 1] : null
  const bot = allBots.find(b => b.code === botCode)

  console.log(bot?.baseFactionCode)

  if (!botCode) return null

  return (
    <Section
      titleKey={`bot.${botCode}.name`}
      textKey={`bot.${botCode}.setup`}
    ></Section>
  )
}

export default SetUpBotsStep
