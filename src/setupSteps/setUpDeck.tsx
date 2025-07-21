import Section from '../components/section'
import { useAppSelector } from '../hooks'
import { selectSetupDeckCode, selectTwoPlayer } from '../store'
import { SetupStep } from '../types'

const SetUpDeckStep: React.FC = () => {
  const deck = useAppSelector(selectSetupDeckCode)
  const twoPlayer = useAppSelector(selectTwoPlayer)
  const skippedSteps = useAppSelector(state => state.flow.skippedSteps)

  return (
    <Section
      titleKey={skippedSteps[SetupStep.chooseDeck] ? 'setupStep.setUpDeck.title' : undefined}
      subtitleKey={skippedSteps[SetupStep.chooseDeck] ? undefined : `deck.${deck}.setupTitle`}
      textKey={`deck.${deck}.setup`}
      translationOptions={{
        context: twoPlayer ? 'twoPlayer' : undefined,
      }}
    />
  )
}

export default SetUpDeckStep
