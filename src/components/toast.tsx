import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '../hooks'
import CloseIcon from '../images/icons/close.svg?react'
import { setErrorMessage } from '../store'

const Toast: React.FC = () => {
  const errorMessage = useAppSelector(state => state.setup.errorMessage)
  // Cache the error message to allow us to continue displaying it as we transition
  const [cachedMessage, setCachedMessage] = useState(errorMessage)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  // Update the cached message if a new one came through
  if (errorMessage != null && cachedMessage !== errorMessage) setCachedMessage(errorMessage)

  return (
    <div
      className="toast"
      inert={!errorMessage}
      aria-live="assertive"
    >
      <div className="container">
        <span
          id="appError"
          className="message"
        >
          {cachedMessage && t(cachedMessage)}.
        </span>
        <button
          type="button"
          title={t('label.closeMessage')}
          onClick={() => dispatch(setErrorMessage(null))}
        >
          <CloseIcon className="close-icon" />
        </button>
      </div>
    </div>
  )
}

export default Toast
