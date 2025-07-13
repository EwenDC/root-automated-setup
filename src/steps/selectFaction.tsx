import type { StepSwitchProps } from '../components/stepSwitch'

import FactionSelect from '../components/factionSelect'
import Section from '../components/section'
import { useAppSelector } from '../hooks'

const SelectFactionStep: React.FC<StepSwitchProps> = ({ flowSlice }) => {
  const playerOrder = useAppSelector(state => state.setup.playerOrder)
  const useDraft = useAppSelector(state => state.flow.useDraft)

  return (
    <Section
      subtitleKey="setupStep.selectFaction.subtitle"
      textKey="setupStep.selectFaction.body"
      translationOptions={{
        count: playerOrder[flowSlice.playerIndex],
        context: useDraft ? 'useDraft' : undefined,
      }}
    >
      <FactionSelect flowSlice={flowSlice} />
    </Section>
  )
}

export default SelectFactionStep
