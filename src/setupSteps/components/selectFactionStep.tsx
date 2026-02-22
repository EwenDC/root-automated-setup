import type { SetupStepComponent } from '..'

import FactionInfo from '../../components/factionInfo'
import FactionSelect from '../../components/factionSelect'
import Section from '../../components/section'
import { useAppSelector, usePlayerNumber } from '../../hooks'

const SelectFactionStep: SetupStepComponent = ({ flowSlice }) => {
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const playerNumber = usePlayerNumber(flowSlice)

  return (
    <Section
      subtitleKey="setupStep.selectFaction.subtitle"
      textKey="setupStep.selectFaction.body"
      translationOptions={{
        count: playerNumber,
        context: useDraft ? 'useDraft' : undefined,
      }}
    >
      <FactionSelect flowSlice={flowSlice} />
      <FactionInfo flowSlice={flowSlice} />
    </Section>
  )
}

export default SelectFactionStep
