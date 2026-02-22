import { useContext } from 'react'

import type { SetupStepComponent } from '..'

import Button from '../../components/button'
import LocaleText from '../../components/localeText'
import Section from '../../components/section'
import { stepActiveContext, useAppDispatch, usePlayerNumber } from '../../hooks'
import RestartIcon from '../../images/icons/restart.svg?react'
import { resetFlow } from '../../store'

const SetupEndStep: SetupStepComponent = ({ flowSlice }) => {
  const dispatch = useAppDispatch()
  const stepActive = useContext(stepActiveContext)
  const playerNumber = usePlayerNumber(flowSlice)

  return (
    <Section
      titleKey="setupStep.setupEnd.title"
      textKey="setupStep.setupEnd.body"
      translationOptions={{ count: playerNumber }}
    >
      {stepActive ? (
        <Button
          Icon={RestartIcon}
          iconLeft
          onClick={() => dispatch(resetFlow())}
        >
          <LocaleText i18nKey="label.restartSetup" />
        </Button>
      ) : null}
    </Section>
  )
}

export default SetupEndStep
