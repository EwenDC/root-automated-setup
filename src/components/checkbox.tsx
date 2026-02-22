import { useContext } from 'react'

import { useInvalid } from '../hooks'
import { stepActiveContext } from '../hooks'
import LocaleText from './localeText'

interface CheckboxProps {
  labelKey: string
  defaultValue?: boolean
  onChange: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ labelKey, defaultValue, onChange }) => {
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)

  return defaultValue || stepActive ? (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={defaultValue ?? false}
        disabled={!stepActive}
        onChange={e => {
          onChange(e.target.checked)
        }}
        aria-invalid={invalid ? true : undefined}
        aria-errormessage={invalid ? 'appError' : undefined}
      />
      <div className="text">
        <LocaleText i18nKey={labelKey} />
      </div>
    </label>
  ) : null
}

export default Checkbox
