import type { SetupStepComponent } from '..'

import Section from '../../components/section'
import { useAppSelector } from '../../hooks'
import { selectDeckArray, selectSetupDeckCode, selectTwoPlayer } from '../../store'

const SetUpDeckStep: SetupStepComponent = () => {
  const deck = useAppSelector(selectSetupDeckCode)
  const twoPlayer = useAppSelector(selectTwoPlayer)
  const chooseDeckSkipped = useAppSelector(state => selectDeckArray(state).length < 2)

  return (
    <Section
      titleKey={chooseDeckSkipped ? 'setupStep.setUpDeck.title' : undefined}
      subtitleKey={chooseDeckSkipped ? undefined : `deck.${deck}.setupTitle`}
      textKey={`deck.${deck}.setup`}
      translationOptions={{
        context: twoPlayer ? 'twoPlayer' : undefined,
      }}
    />
  )
}

export default SetUpDeckStep
