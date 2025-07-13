import Section from '../components/section'
import { useAppSelector, useNthLastPlayer } from '../hooks'

interface SetUpHirelingStepProps {
  number: 1 | 2 | 3
}

const SetUpHirelingStep: React.FC<SetUpHirelingStepProps> = ({ number }) => {
  const hireling = useAppSelector(state => state.setup[`hireling${number}`])
  const nthLastPlayer = useNthLastPlayer()

  if (!hireling) return null
  return (
    <Section
      subtitleKey={`hireling.${hireling.code}.setupTitle`}
      textKey={`hireling.${hireling.code}.setup`}
      translationOptions={{
        context: hireling.demoted ? 'demoted' : undefined,
        count: nthLastPlayer(number),
      }}
    />
  )
}

export default SetUpHirelingStep
