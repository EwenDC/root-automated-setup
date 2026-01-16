import { useContext } from 'react'

import { useInvalid } from '../hooks'
import LocaleText from './localeText'
import { stepActiveContext } from './stepList'

interface NumberSelectorProps {
  id: string
  value: number
  minVal: number
  maxVal: number
  onChange: (value: number) => void
}

// This used to be dynamic but we've effectively constrained this via CSS
const INPUT_SIZE = 2

const NumberSelector: React.FC<NumberSelectorProps> = ({ id, value, minVal, maxVal, onChange }) => {
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)

  const buttonHandler = (amount: number) => {
    const newValue = value + amount
    if (newValue >= minVal && newValue <= maxVal) onChange(newValue)
  }

  const typingHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    let newValue = Number(rawValue)
    // Only continue processing if the user entered a numeric value
    if (!isNaN(newValue)) {
      // Trim off any extra numbers at the start of the input to allow numbers to be freely typed in
      // We do this in a loop so we keep cutting off leading digits until we get a valid value
      for (let digits = INPUT_SIZE; digits > 0; digits--) {
        newValue = Number(rawValue.substring(rawValue.length - digits))
        // Stop the loop once the value is small enough
        if (newValue <= maxVal) {
          // Only make the change if the value isn't too small
          if (newValue >= minVal) onChange(newValue)
          break
        }
      }
    }
  }

  return (
    <div className="number">
      <label htmlFor={id}>
        <LocaleText i18nKey={`label.${id}`} />
      </label>
      {stepActive ? (
        <>
          <button
            onClick={() => {
              buttonHandler(-1)
            }}
          >
            -
          </button>
          <input
            id={id}
            inputMode="numeric"
            value={value}
            size={INPUT_SIZE}
            onChange={typingHandler}
            aria-invalid={invalid ? true : undefined}
            aria-errormessage={invalid ? 'appError' : undefined}
          />
          <button
            onClick={() => {
              buttonHandler(1)
            }}
          >
            +
          </button>
        </>
      ) : (
        <span
          id={id}
          className="value"
        >
          {value}
        </span>
      )}
    </div>
  )
}

export default NumberSelector
