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
  let desiredStep = dispatch(afterStep)
  // Exit early if the post-step logic aborted the step progression
  if (desiredStep == null) return

  // Snapshot the current state to the undo queue then progress to the next step
  dispatch(pushStateToPast())
  let nextStep
  do {
    nextStep = desiredStep
    // Perform the pre-step logic for the new step, potentially skipping to other steps
    const beforeStep: SetupStepDefinition['beforeStep'] = stepMap[desiredStep].beforeStep
    desiredStep = beforeStep ? dispatch(beforeStep) : null
  } while (desiredStep != null)

  if (flow.currentStep !== nextStep) dispatch(setCurrentStep(nextStep))
}
