import type { SetupStepComponent } from '..'

import ComponentSetupSelect from '../../components/componentSetupSelect'
import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectBotArray } from '../../store'

const SelectBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const currentPickNumber = flowSlice.botPool.length + 1

  const allBots = useAppSelector(selectBotArray)

  const availableBots = allBots.filter(b => !flowSlice.botPool.some(poolBot => poolBot === b.code))

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
          getSetupKey={() => ''}
        />
      </div>
    </Section>
  )
}

export default SelectBotsStep
