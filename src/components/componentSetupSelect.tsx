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
}

const ComponentSetupSelect = (<T extends CodeObject & GameComponent>({
  flowSlice,
  selector,
  getLabelKey,
  getSetupTitleKey,
  getSetupKey,
  getTranslationOptions,
}: ComponentSelectProps<T>) => {
  const playerNumber = usePlayerNumber(flowSlice)
  const components = useAppSelector(selector(flowSlice))
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)
  const dispatch = useAppDispatch()
  const radioName = useId()

  const setupComponent = flowSlice.index != null ? components[flowSlice.index] : undefined
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
              checked={index === flowSlice.index}
              disabled={!stepActive}
              onChange={() => dispatch(setCurrentIndex(index))}
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
