import type { SetupStepComponent } from '..'

import Section from '../../components/section'

const SetUpBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const { selectedBots } = flowSlice

  const botCode = selectedBots.length > 0 ? selectedBots[selectedBots.length - 1] : null

  if (!botCode) return null

  return (
    <Section
      titleKey={`bot.${botCode}.name`}
      textKey={`bot.${botCode}.setup`}
    />
  )
}

export default SetUpBotsStep
