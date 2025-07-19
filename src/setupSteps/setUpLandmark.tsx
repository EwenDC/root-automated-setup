import Section from '../components/section'
import { useAppSelector, useNthLastPlayer } from '../hooks'
import { selectSetupMapCode } from '../store'

interface SetUpLandmarkStepProps {
  number: 1 | 2
}

const SetUpLandmarkStep: React.FC<SetUpLandmarkStepProps> = ({ number }) => {
  const landmark = useAppSelector(state => state.setup[`landmark${number}`])
  const map = useAppSelector(selectSetupMapCode)
  const nthLastPlayer = useNthLastPlayer()

  return (
    <Section
      subtitleKey={`landmark.${landmark}.setupTitle`}
      textKey={`landmark.${landmark}.setup`}
      translationOptions={{
        context: map,
        count: nthLastPlayer(number),
      }}
    />
  )
}

export default SetUpLandmarkStep
