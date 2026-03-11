import type { SetupStepComponent } from '..'
//import type { RootState } from '../../store'

import ComponentSetupSelect from '../../components/componentSetupSelect'
import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectBotArray } from '../../store'

const SelectBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const currentPickNumber = flowSlice.botPool.length + 1

  // 1. Get flat array of available bots
  const allBots = useAppSelector(selectBotArray)
  const availableBots = allBots.filter(
    b => !flowSlice.botPool.some(poolBot => poolBot.code === b.code),
  )

  // 2. Calculate how many blocks of 4 we need
  const chunkCount = Math.ceil(availableBots.length / 4)

  return (
    <Section
      key={flowSlice.botPool.length}
      subtitleKey="setupStep.selectBots.subtitle"
      textKey="setupStep.selectBots.body"
      translationOptions={{ count: currentPickNumber }}
    >
      <div className="flex flex-col gap-6 mt-4">
        {Array.from({ length: chunkCount }).map((_, i) => {
          // 3. Calculate the starting global index for this specific block
          const startIndex = i * 4
          const endIndex = startIndex + 4

          return (
            <ComponentSetupSelect
              key={startIndex}
              flowSlice={flowSlice}
              // Slice the array so this component only renders its 4 specific bots
              selector={() => () => availableBots.slice(startIndex, endIndex)}
              getLabelKey={bot => `bot.${bot.code}.name`}
              getSetupTitleKey={bot => `bot.${bot.code}.name`}
              getSetupKey={() => 'label.selectThisBot'}
              // 4. CRITICAL: Pass the startIndex as the offset!
              // This stops block 2 from thinking its first item is index 0.
              indexOffset={startIndex}
            />
          )
        })}
      </div>
    </Section>
  )
}

export default SelectBotsStep
