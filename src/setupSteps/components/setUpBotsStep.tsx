import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectBotArray } from '../../store'

const SetUpBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const { botPool, index } = flowSlice
  const availableBots = useAppSelector(selectBotArray)

  const selectedBotEntry = index != null ? botPool[index] : null

  if (!selectedBotEntry) return null

  // 1. Cast the find result so TypeScript knows it contains the Bot properties
  const botDefinition = availableBots.find(b => b.code === selectedBotEntry.code)

  if (!botDefinition) return null

  return (
    <Section
      subtitleKey={`bot.${selectedBotEntry.code}.name`}
      textKey="setupStep.setUpBots.body"
    >
      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-lg">Setup Instructions:</h4>
        <ol className="list-decimal list-inside space-y-2">
          {/* 2. Add the question marks (?.) to safely chain the map function */}
          {botDefinition.setupSteps.map((step: string, idx: number) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

export default SetUpBotsStep
