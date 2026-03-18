import { useTranslation } from 'react-i18next'

import type { SetupStepComponent } from '..'

import Icon from '../../components/icon'
import IconList from '../../components/iconList'
import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectFactionPoolFull, selectTwoPlayer } from '../../store'

const SetUpFactionStep: SetupStepComponent = ({ flowSlice }) => {
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const twoPlayer = useAppSelector(selectTwoPlayer)
  const factionPoolFull = useAppSelector(selectFactionPoolFull(flowSlice))
  const { t } = useTranslation()

  const { index, vagabondSetUp } = flowSlice
  if (index == null) return null

  const { key, vagabond, captains } = factionPoolFull[index]!

  // Use array so text can fall back to "default" if there is no "vagabondSetUp" variation
  const baseTextKey = `faction.${key}.${useDraft ? 'advancedSetup' : 'setup'}`
  const textKey = [`${baseTextKey}.default`]
  if (vagabondSetUp) {
    textKey.unshift(`${baseTextKey}.vagabondSetUp`)
  }

  const components = vagabond && {
    InitialStartingItems: <IconList list={vagabond.startingItems.slice(0, -1)} />,
    FinalStartingItem: <Icon icon={vagabond.startingItems[vagabond.startingItems.length - 1]!} />,
  }

  return (
    <Section
      subtitleKey={`faction.${key}.setupTitle`}
      textKey={textKey}
      translationOptions={{
        context: twoPlayer ? 'twoPlayer' : undefined,
        vagabond: vagabond && t(`vagabond.${vagabond.code}.name`),
        captain: captains.map(captain => t(`captain.${captain.code}.name`)),
      }}
      components={components}
    />
  )
}

export default SetUpFactionStep
