import type { TOptions } from 'i18next'

import { useContext, useId } from 'react'

import type { CodeObject, FlowSlice, GameComponent } from '../types'

import { useAppDispatch, useAppSelector, useInvalid, usePlayerNumber } from '../hooks'
import { stepActiveContext } from '../hooks'
import { type RootState, setCurrentIndex } from '../store'
import LocaleText from './localeText'

interface ComponentSelectProps<T> {
  flowSlice: FlowSlice
  selector: (flowSlice: FlowSlice) => (state: RootState) => T[]
  getLabelKey: (component: T) => string
  getSetupTitleKey: (component: T) => string
  getSetupKey: (component: T) => string
  getTranslationOptions?: (component: T) => TOptions
  /**
   * Optional offset to apply to the global Redux index. Useful when rendering multiple Select
   * components on the same screen!
   */
  indexOffset?: number
}

const ComponentSetupSelect = (<T extends CodeObject & GameComponent>({
  flowSlice,
  selector,
  getLabelKey,
  getSetupTitleKey,
  getSetupKey,
  getTranslationOptions,
  indexOffset = 0, // Defaults to 0 so it doesn't break other lists!
}: ComponentSelectProps<T>) => {
  const playerNumber = usePlayerNumber(flowSlice)
  const components = useAppSelector(selector(flowSlice))
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)
  const dispatch = useAppDispatch()
  const radioName = useId()

  // Apply the offset in reverse to find the local index for this specific chunk
  const localIndex = flowSlice.index != null ? flowSlice.index - indexOffset : -1

  // Only grab the component if the local index actually falls inside this chunk!
  const setupComponent =
    localIndex >= 0 && localIndex < components.length ? components[localIndex] : undefined

  const setupComponentTOptions = setupComponent && {
    ...getTranslationOptions?.(setupComponent),
    count: playerNumber,
  }

  return (
    <div className="component-setup-select">
      <div
        className="component-select"
        role="radiogroup"
        aria-required="true"
        aria-invalid={invalid ? true : undefined}
        aria-errormessage={invalid ? 'appError' : undefined}
        aria-disabled={!stepActive}
      >
        {components.map((component, index) => (
          <label key={component.code}>
            <input
              type="radio"
              name={radioName}
              // Add the offset to the local index to check if it's the selected one
              checked={index + indexOffset === flowSlice.index}
              disabled={!stepActive}
              // Dispatch the local index PLUS the offset to get the true global index!
              onChange={() => dispatch(setCurrentIndex(index + indexOffset))}
            />
            <img
              src={component.image}
              alt="" // Not required as the input already has a label
              aria-hidden="true"
            />
            <div className="name">
              <LocaleText
                i18nKey={getLabelKey(component)}
                tOptions={getTranslationOptions?.(component)}
              />
            </div>
          </label>
        ))}
      </div>
      {setupComponent && (
        <>
          <h4>
            <LocaleText
              i18nKey={getSetupTitleKey(setupComponent)}
              tOptions={setupComponentTOptions}
            />
            .
          </h4>
          <div className="setup">
            <LocaleText
              i18nKey={getSetupKey(setupComponent)}
              tOptions={setupComponentTOptions}
            />
          </div>
        </>
      )}
    </div>
  )
}) satisfies React.FC<ComponentSelectProps<CodeObject & GameComponent>>

export default ComponentSetupSelect
