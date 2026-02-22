import type { SetupStepDefinition } from '..'

import { setCurrentPlayerIndex } from '../../store'
import SetupEndStep from '../components/setupEndStep'

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
