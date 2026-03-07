import type { SetupStepComponent } from '..'

import BotInfo from '../../components/botInfo'
import BotSelect from '../../components/botSelect'
import Section from '../../components/section'
import { useAppSelector, usePlayerNumber } from '../../hooks'

const SelectBotStep: SetupStepComponent = ({ flowSlice }) => {
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const playerNumber = usePlayerNumber(flowSlice)

  return (
    <Section
      subtitleKey="setupStep.selectBot.subtitle"
      textKey="setupStep.selectBot.body"
      translationOptions={{
        count: playerNumber,
        context: useDraft ? 'useDraft' : undefined,
      }}
    >
      <BotSelect flowSlice={flowSlice} />
      <BotInfo flowSlice={flowSlice} />
    </Section>
  )
}

export default SelectBotStep
