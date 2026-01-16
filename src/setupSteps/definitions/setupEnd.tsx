import { useContext } from 'react'

import type { SetupStepComponent, SetupStepDefinition } from '..'

import Button from '../../components/button'
import LocaleText from '../../components/localeText'
import Section from '../../components/section'
import { stepActiveContext } from '../../components/stepList'
import { useAppDispatch, usePlayerNumber } from '../../hooks'
import RestartIcon from '../../images/icons/restart.svg?react'
import { resetFlow, setCurrentPlayerIndex } from '../../store'

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

export const setupEnd: SetupStepDefinition = {
  beforeStep(dispatch, getState) {
    // Make sure we select the first player in turn order
    if (getState().flow.currentPlayerIndex !== 0) dispatch(setCurrentPlayerIndex(0))
    return null
  },

  component: SetupEndStep,

  // Do not allow proceeding past the final step
  afterStep: () => null,
}
