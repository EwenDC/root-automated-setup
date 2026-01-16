import type { AppThunk } from '../store'
import type { FlowSlice, SetupStep } from '../types'

export type SetupStepComponent = React.FC<{ flowSlice: FlowSlice }>

export interface SetupStepDefinition {
  /**
   * Code that fires before the step is rendered. Can be used to set up state required by the step,
   * and even skip the step if it is not required.
   *
   * @returns A step to skip to if this step is not required, or `null` to proceed with showing this
   *   step.
   */
  beforeStep?: AppThunk<SetupStep | null>

  /** A React component definition for what the step renders when it's visible. */
  component: SetupStepComponent

  /**
   * Code that fires after the step is rendered. Used to validate user input, and dictate the next
   * step to render.
   *
   * @returns The next step to render, or `null` if setup should not proceed.
   */
  afterStep: AppThunk<SetupStep | null>
}

export { nextStep } from './nextStep'
export { default as StepSwitch } from './stepSwitch'
