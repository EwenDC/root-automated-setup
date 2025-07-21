import { useTranslation } from 'react-i18next'

import type { StepSwitchProps } from '../components/stepSwitch'

import Icon from '../components/icon'
import IconList from '../components/iconList'
import Section from '../components/section'
import { useAppSelector, useSelectFactionPool } from '../hooks'
import { selectTwoPlayer } from '../store'

const SetUpFactionStep: React.FC<StepSwitchProps> = ({ flowSlice }) => {
  const { factionIndex, factionPool, vagabondSetUp } = flowSlice
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const twoPlayer = useAppSelector(selectTwoPlayer)
  const selectFactionPool = useSelectFactionPool(factionPool)
  const factionPoolEntry = useAppSelector(state => selectFactionPool(state)[factionIndex ?? 0]!)
  const { t } = useTranslation()

  // Use array so text can fall back to "default" if there is no "vagabondSetUp" variation
  const baseTextKey = `faction.${factionPoolEntry.key}.${useDraft ? 'advancedSetup' : 'setup'}`
  const textKey = [`${baseTextKey}.default`]
  if (vagabondSetUp) {
    textKey.unshift(`${baseTextKey}.vagabondSetUp`)
  }

  const components = factionPoolEntry.vagabond && {
    InitialStartingItems: <IconList list={factionPoolEntry.vagabond.startingItems.slice(0, -1)} />,
    FinalStartingItem: (
      <Icon
        icon={
          factionPoolEntry.vagabond.startingItems[
            factionPoolEntry.vagabond.startingItems.length - 1
          ]!
        }
      />
    ),
  }

  return (
    <Section
      subtitleKey={`faction.${factionPoolEntry.key}.setupTitle`}
      textKey={textKey}
      translationOptions={{
        context: twoPlayer ? 'twoPlayer' : undefined,
        vagabond: factionPoolEntry.vagabond && t(`vagabond.${factionPoolEntry.vagabond.code}.name`),
      }}
      components={components}
    />
  )
}

export default SetUpFactionStep
