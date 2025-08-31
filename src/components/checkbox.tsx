import { useContext } from 'react'

import { useInvalid } from '../hooks'
import LocaleText from './localeText'
import { stepActiveContext } from './stepList'

interface CheckboxProps {
  id: string
  labelKey?: string
  defaultValue?: boolean
  onChange: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ id, labelKey, defaultValue, onChange }) => {
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)

  return defaultValue || stepActive ? (
    <div className="checkbox">
      <input
        id={id}
        type="checkbox"
        checked={defaultValue ?? false}
        disabled={!stepActive}
        onChange={e => {
          onChange(e.target.checked)
        }}
        aria-invalid={invalid ? true : undefined}
        aria-errormessage={invalid ? 'appError' : undefined}
      />
      <label htmlFor={id}>
        <LocaleText i18nKey={labelKey ?? `label.${id}`} />
      </label>
    </div>
  ) : null
}

export default Checkbox
