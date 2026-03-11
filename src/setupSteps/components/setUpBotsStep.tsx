import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectBotArray } from '../../store'

const SetUpBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const { botPool, index } = flowSlice
  const availableBots = useAppSelector(selectBotArray)

  const selectedBotEntry = index != null ? botPool[index] : null

  if (!selectedBotEntry) return null

  const botDefinition = availableBots.find(b => b.code === selectedBotEntry.code)
  if (!botDefinition) return null

  return (
    <Section
      subtitleKey={`bot.${selectedBotEntry.code}.name`}
      textKey="setupStep.setUpBots.body"
    >
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-gray-100 rounded">
          <p>
            <strong>Difficulty:</strong> {selectedBotEntry.difficulty}
          </p>
          <p>
            <strong>Traits:</strong>{' '}
            {selectedBotEntry.selectedTraits.length > 0
              ? selectedBotEntry.selectedTraits.join(', ')
              : 'None'}
          </p>
        </div>

        <h4 className="font-bold text-lg">Setup Instructions:</h4>
        <ol className="list-decimal list-inside space-y-2">
          {botDefinition.setupSteps.map((step, idx) => (
            // You can wrap this in a translation function if your app uses i18n
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

export default SetUpBotsStep
