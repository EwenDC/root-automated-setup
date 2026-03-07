import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectBotPoolFull, selectTwoPlayer } from '../../store'

const SetUpBotStep: SetupStepComponent = ({ flowSlice }) => {
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const twoPlayer = useAppSelector(selectTwoPlayer)
  const botPoolFull = useAppSelector(selectBotPoolFull(flowSlice))

  const { index } = flowSlice
  if (index == null) return null

  const { key } = botPoolFull[index]!

  // Use array so text can fall back to "default" if there is no "vagabondSetUp" variation
  const baseTextKey = `bot.${key}.${useDraft ? 'advancedSetup' : 'setup'}`
  const textKey = [`${baseTextKey}.default`]

  return (
    <Section
      subtitleKey={`bot.${key}.setupTitle`}
      textKey={textKey}
      translationOptions={{
        context: twoPlayer ? 'twoPlayer' : undefined,
      }}
    />
  )
}

export default SetUpBotStep
