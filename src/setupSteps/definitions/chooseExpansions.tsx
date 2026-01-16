import type { SetupStepComponent, SetupStepDefinition } from '..'

import Checkbox from '../../components/checkbox'
import ComponentToggle from '../../components/componentToggle'
import Section from '../../components/section'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  selectDeckArray,
  selectExpansionArray,
  selectFactionArray,
  selectMapArray,
  setErrorMessage,
  setIncludeBots,
  toggleExpansion,
} from '../../store'
import { SetupStep } from '../../types'

const ChooseExpansionsStep: SetupStepComponent = () => {
  const includeBots = useAppSelector(state => state.setup.includeBots)
  const dispatch = useAppDispatch()

  return (
    <Section textKey="setupStep.chooseExpansions.body">
      <ComponentToggle
        className="expansion-toggle"
        selector={selectExpansionArray}
        toggleComponent={toggleExpansion}
        getLabelKey={expansion => `expansion.${expansion.code}`}
        unsorted
      />
      <Checkbox
        id="includeBotStep"
        defaultValue={includeBots}
        onChange={checked => dispatch(setIncludeBots(checked))}
      />
    </Section>
  )
}

export const chooseExpansions: SetupStepDefinition = {
  component: ChooseExpansionsStep,

  afterStep(dispatch, getState) {
    // We need to validate if we have enough components for setup, since it's *technically*
    // possible to play without the base game (using the Homeland expansion)
    const state = getState()

    // Is there at least one faction?
    if (selectFactionArray(state).length < 1) {
      dispatch(setErrorMessage('error.missingFaction'))
      return null
    }

    // Is there at least one map?
    if (selectMapArray(state).length < 1) {
      dispatch(setErrorMessage('error.missingMap'))
      return null
    }

    // Is there at least one deck?
    if (selectDeckArray(state).length < 1) {
      dispatch(setErrorMessage('error.missingDeck'))
      return null
    }

    return SetupStep.seatPlayers
  },
}
