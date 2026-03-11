import type { SetupStepComponent } from '..'
import type { RootState } from '../../store'

import ComponentSetupSelect from '../../components/componentSetupSelect'
import Section from '../../components/section'
import { selectBotArray } from '../../store'

const SelectBotsStep: SetupStepComponent = ({ flowSlice }) => {
  const currentPickNumber = flowSlice.botPool.length + 1

  return (
    <Section
      // Move the key up here to the top level!
      // This forces React to hard-reset the entire view on each loop.
      key={flowSlice.botPool.length}
      subtitleKey="setupStep.selectBots.subtitle"
      textKey="setupStep.selectBots.body"
      translationOptions={{ count: currentPickNumber }}
    >
      <ComponentSetupSelect
        flowSlice={flowSlice}
        selector={slice => (state: RootState) => {
          const allBots = selectBotArray(state)
          return allBots.filter(b => !slice.botPool.some(poolBot => poolBot.code === b.code))
        }}
        getLabelKey={bot => `bot.${bot.code}.name`}
        getSetupTitleKey={bot => `bot.${bot.code}.name`}
        getSetupKey={() => 'label.selectThisBot'}
      />
    </Section>
  )
}

export default SelectBotsStep
