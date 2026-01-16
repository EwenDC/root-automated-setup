import type { SetupStepDefinition } from '.'

import { type AppThunk, pushStateToPast, setCurrentStep, setErrorMessage } from '../store'
import { stepMap } from './stepMap'

/**
 * Advances to the next step in setup, performing all validation logic and state changes required
 * for each step.
 */
export const nextStep = (): AppThunk => (dispatch, getState) => {
  const { flow, setup } = getState()

  // Clear any existing error message
  if (setup.errorMessage) dispatch(setErrorMessage(null))

  // Perform the post-step logic for the current step
  const { afterStep } = stepMap[flow.currentStep]
  let nextStep = dispatch(afterStep)
  // Exit early if the post-step logic aborted the step progression
  if (nextStep == null) return

  // Snapshot the current state to the undo queue then progress to the next step
  dispatch(pushStateToPast())
  do {
    if (flow.currentStep !== nextStep) dispatch(setCurrentStep(nextStep))
    // Perform the pre-step logic for the new step, potentially skipping to other steps
    const beforeStep: SetupStepDefinition['beforeStep'] = stepMap[nextStep].beforeStep
    nextStep = beforeStep ? dispatch(beforeStep) : null
  } while (nextStep != null)
}
