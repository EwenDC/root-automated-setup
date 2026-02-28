import { useContext, useId } from 'react'

import type { CodeObject, FlowSlice, GameComponent } from '../types'

import { useAppDispatch, useAppSelector, useInvalid } from '../hooks'
import { stepActiveContext } from '../hooks'
import { type RootState, setCurrentIndex } from '../store'
import LocaleText from './localeText'

interface ComponentSelectProps<T> {
  flowSlice: FlowSlice
  selector: (flowSlice: FlowSlice) => (state: RootState) => T[]
  getLabelKey: (component: T) => string
}

const ComponentSelect = (<T extends CodeObject & GameComponent>({
  flowSlice,
  selector,
  getLabelKey,
}: ComponentSelectProps<T>) => {
  const components = useAppSelector(selector(flowSlice))
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)
  const dispatch = useAppDispatch()
  const radioName = useId()

  return (
    <div
      className="component-select"
      role="radiogroup"
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
            <LocaleText i18nKey={getLabelKey(component)} />
          </div>
        </label>
      ))}
    </div>
  )
}) satisfies React.FC<ComponentSelectProps<CodeObject & GameComponent>>

export default ComponentSelect
