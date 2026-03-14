import type { SetupStepComponent } from '..'

import Section from '../../components/section'

const SetUpBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const { botPool, index } = flowSlice

  const selectedBotEntry = index != null ? botPool[index] : null

  if (!selectedBotEntry) return null

  // Extract the code directly from the current pool entry
  const botCode = selectedBotEntry

  return (
    <Section
      titleKey={`bot.${botCode}.name`}
      textKey={`bot.${botCode}.setup`}
    />
  )
}

export default SetUpBotsStep
