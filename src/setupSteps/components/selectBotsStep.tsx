import type { SetupStepComponent } from '..'
import type { RootState } from '../../store'

import ComponentSetupSelect from '../../components/componentSetupSelect'
import Section from '../../components/section'
import { selectBotArray } from '../../store' // <-- Import this to get the images

const SelectBotsStep: SetupStepComponent = ({ flowSlice }) => {
  return (
    <Section
      subtitleKey="setupStep.selectBots.subtitle"
      textKey="setupStep.selectBots.body"
    >
      <ComponentSetupSelect
        flowSlice={flowSlice}
        selector={slice => (state: RootState) => {
          // Grab the fully merged bot data (which includes the images)
          const availableBots = selectBotArray(state)

          // Map over the pool and attach the image to satisfy GameComponent
          return slice.botPool.map(botEntry => ({
            ...botEntry,
            image: availableBots.find(b => b.code === botEntry.code)?.image || '',
          }))
        }}
        getLabelKey={bot => `bot.${bot.code}.name`}
        getSetupTitleKey={bot => `bot.${bot.code}.setupTitle`}
        getSetupKey={bot => `bot.${bot.code}.setup`}
      />
    </Section>
  )
}

export default SelectBotsStep
