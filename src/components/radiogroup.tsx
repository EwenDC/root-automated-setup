import { useContext, useId } from 'react'

import { useInvalid } from '../hooks'
import { stepActiveContext } from '../hooks'
import LocaleText from './localeText'

interface RadiogroupProps {
  falseLabelKey: string
  trueLabelKey: string
  defaultValue?: boolean
  onChange: (value: boolean) => void
}

const Radiogroup: React.FC<RadiogroupProps> = ({
  falseLabelKey,
  trueLabelKey,
  defaultValue = false,
  onChange,
}) => {
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)
  const radioName = useId()

  return (
    <fieldset
      className="radio"
      role="radiogroup"
      name={radioName}
      disabled={!stepActive}
      aria-required="true"
      aria-invalid={invalid ? true : undefined}
      aria-errormessage={invalid ? 'appError' : undefined}
    >
      {!defaultValue || stepActive ? (
        <label>
          <input
            name={radioName}
            type="radio"
            checked={!defaultValue}
            onChange={() => {
              onChange(false)
            }}
          />
          <div className="text">
            <LocaleText i18nKey={falseLabelKey} />
          </div>
        </label>
      ) : null}
      {defaultValue || stepActive ? (
        <label>
          <input
            name={radioName}
            type="radio"
            checked={defaultValue}
            onChange={() => {
              onChange(true)
            }}
          />
          <div className="text">
            <LocaleText i18nKey={trueLabelKey} />
          </div>
        </label>
      ) : null}
    </fieldset>
  )
}

export default Radiogroup
