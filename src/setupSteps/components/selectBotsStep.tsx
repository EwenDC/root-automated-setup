import type { SetupStepComponent } from '..'

import ComponentSetupSelect from '../../components/componentSetupSelect'
import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectBotArray } from '../../store'

const SelectBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const currentPickNumber = flowSlice.botPool.length + 1

  // 1. Get dynamic array of available bots based on chosen expansions
  const allBots = useAppSelector(selectBotArray)

  // 2. Filter out bots already in the pool
  const availableBots = allBots.filter(
    b => !flowSlice.botPool.some(poolBot => poolBot.code === b.code),
  )

  return (
    <Section
      key={flowSlice.botPool.length}
      subtitleKey="setupStep.selectBots.subtitle"
      textKey="setupStep.selectBots.body"
      translationOptions={{ count: currentPickNumber }}
    >
      <div>
        <ComponentSetupSelect
          flowSlice={flowSlice}
          selector={() => () => availableBots}
          getLabelKey={bot => `bot.${bot.code}.name`}
          getSetupTitleKey={bot => `bot.${bot.code}.name`}
          getSetupKey={() => 'label.selectThisBot'}
        />
      </div>
    </Section>
  )
}

export default SelectBotsStep
