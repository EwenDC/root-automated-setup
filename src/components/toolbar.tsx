import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '../hooks'
import NextIcon from '../images/icons/next.svg?react'
import RedoIcon from '../images/icons/redo.svg?react'
import ResetIcon from '../images/icons/reset.svg?react'
import UndoIcon from '../images/icons/undo.svg?react'
import { nextStep } from '../setupSteps'
import { redoStep, resetStep, undoStep } from '../store'
import { SetupStep } from '../types'
import Button from './button'
import LocaleText from './localeText'

type ButtonIndex = 0 | 1 | 2 | 3 | 4
const MIN_BUTTON_INDEX = 0
const MAX_BUTTON_INDEX = 4

const Toolbar: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [focusedIndex, setFocusedIndex] = useState<ButtonIndex>(0)
  const [copied, setCopied] = useState(false)
  const undoDisabled = useAppSelector(state => state.flow.pastSteps.length === 0)
  const redoDisabled = useAppSelector(state => state.flow.futureSteps.length === 0)
  const nextStepDisabled = useAppSelector(state => state.flow.currentStep >= SetupStep.setupEnd)
  const resetDisabled = useAppSelector(state => state.flow.pastSteps.length === 0)
  const [confirmReset, setConfirmReset] = useState(false)

  const undoButtonRef = useRef<HTMLButtonElement>(null)
  const redoButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const copyButtonRef = useRef<HTMLButtonElement>(null)
  const resetButtonRef = useRef<HTMLButtonElement>(null)

  const handleResetClick = () => {
    if (confirmReset) {
      //Make them press the reset button twice to set to initial state
      dispatch(resetStep())
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
      // Auto-revert back after 3 seconds if they don't confirm
      setTimeout(() => {
        setConfirmReset(false)
      }, 3000)
    }
  }

  const handleCopyUrl = async () => {
    //Copy the URL of the webapp
    const urlParams = new URLSearchParams() //Future feature to add URL parameters as a sort of 'save state'

    // -- NUMBERS -- //
    // -- BOOLEANS -- //
    // -- STRINGS -- //
    // -- ARRAYS / CODES -- //

    const queryString = urlParams.toString()
    const url = queryString
      ? `${window.location.origin}${window.location.pathname}?${queryString}`
      : `${window.location.origin}${window.location.pathname}`

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy URL to clipboard', err)
    }
  }

  const onKeyDownHandler =
    (focusedIndex: ButtonIndex) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const buttonRefs = [
        resetButtonRef,
        undoButtonRef,
        redoButtonRef,
        copyButtonRef,
        nextButtonRef,
      ] as const
      let newIndex: ButtonIndex | undefined

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        newIndex = focusedIndex + 1
        if (newIndex > MAX_BUTTON_INDEX) newIndex = MIN_BUTTON_INDEX
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        newIndex = focusedIndex - 1
        if (newIndex < MIN_BUTTON_INDEX) newIndex = MAX_BUTTON_INDEX
      } else if (event.key === 'Home') {
        newIndex = MIN_BUTTON_INDEX
      } else if (event.key === 'End') {
        newIndex = MAX_BUTTON_INDEX
      }

      if (newIndex != null) {
        event.preventDefault()
        setFocusedIndex(newIndex)
        buttonRefs[newIndex].current?.focus()
      }
    }

  return (
    <footer>
      <div
        className="toolbar"
        role="toolbar"
      >
        <Button
          Icon={ResetIcon}
          disabled={resetDisabled}
          className="left"
          ref={resetButtonRef}
          onClick={handleResetClick}
          title={t('label.reset')}
          tabIndex={focusedIndex === 3 ? 0 : -1}
          onKeyDown={onKeyDownHandler(3)}
        >
          {confirmReset ? t('label.confirmReset') : t('')}
        </Button>
        <Button
          Icon={UndoIcon}
          disabled={undoDisabled}
          className="left"
          ref={undoButtonRef}
          onClick={() => {
            dispatch(undoStep())
            setFocusedIndex(0)
          }}
          title={t('label.undo')}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 0 ? 0 : -1}
          onKeyDown={onKeyDownHandler(0)}
        />
        <Button
          Icon={RedoIcon}
          disabled={redoDisabled}
          className="left"
          ref={redoButtonRef}
          onClick={() => {
            dispatch(redoStep())
            setFocusedIndex(1)
          }}
          title={t('label.redo')}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 1 ? 0 : -1}
          onKeyDown={onKeyDownHandler(1)}
        />

        <Button
          Icon={NextIcon}
          className="left"
          ref={copyButtonRef}
          onClick={() => {
            void handleCopyUrl()
            setFocusedIndex(2)
          }}
          title={copied ? t('label.copied') : t('label.failCopy')}
          tabIndex={focusedIndex === 4 ? 0 : -1}
          onKeyDown={onKeyDownHandler(4)}
        >
          {copied ? t('label.copied') : null}
        </Button>

        <Button
          Icon={NextIcon}
          disabled={nextStepDisabled}
          className="right"
          ref={nextButtonRef}
          onClick={() => {
            dispatch(nextStep())
            setFocusedIndex(3)
          }}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 3 ? 0 : -1}
          onKeyDown={onKeyDownHandler(3)}
        >
          <LocaleText i18nKey="label.nextStep" />
        </Button>
      </div>
    </footer>
  )
}

export default Toolbar
