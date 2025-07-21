import { useContext } from 'react'

import Button from '../components/button'
import LocaleText from '../components/localeText'
import Section from '../components/section'
import { stepActiveContext } from '../components/stepList'
import { useAppDispatch, useAppSelector } from '../hooks'
import RestartIcon from '../images/icons/restart.svg?react'
import { resetFlow } from '../store'

const SetupEndStep: React.FC = () => {
  const playerOrder = useAppSelector(state => state.setup.playerOrder)
  const dispatch = useAppDispatch()
  const stepActive = useContext(stepActiveContext)

  return (
    <Section
      titleKey="setupStep.setupEnd.title"
      textKey="setupStep.setupEnd.body"
      translationOptions={{ count: playerOrder[0] }}
    >
      {stepActive ? (
        <Button
          Icon={RestartIcon}
          iconLeft={true}
          onClick={() => dispatch(resetFlow())}
        >
          <LocaleText i18nKey="label.restartSetup" />
        </Button>
      ) : null}
    </Section>
  )
}

export default SetupEndStep
