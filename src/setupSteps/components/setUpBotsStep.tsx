import type { SetupStepComponent } from '..'

import Section from '../../components/section'

const SetUpBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const { botPool, index } = flowSlice

  const selectedBotEntry = index != null ? botPool[index] : null

  if (!selectedBotEntry) return null

  // Extract the code directly from the current pool entry
  const botCode = selectedBotEntry.code

  return (
    <Section
      subtitleKey={`bot.${botCode}.name`}
      textKey="setupStep.setUpBots.body"
    >
      <div>
        <Section
          titleKey="setupStep.setUpBots.instructionTitle"
          textKey={`bot.${botCode}.setup`}
        />
      </div>
    </Section>
  )
}

export default SetUpBotsStep
