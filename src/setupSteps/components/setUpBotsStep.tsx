import type { SetupStepComponent } from '..'

import Section from '../../components/section'

const SetUpBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const { selectedBots, index } = flowSlice

  const selectedBotEntry = index != null ? selectedBots[index] : null

  if (!selectedBotEntry) return null

  const botCode = selectedBotEntry

  return (
    <Section
      titleKey={`bot.${botCode}.name`}
      textKey={`bot.${botCode}.setup`}
    />
  )
}

export default SetUpBotsStep
