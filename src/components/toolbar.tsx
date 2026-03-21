import type React from 'react'

import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector, useToolbarActions } from '../hooks'
import NextIcon from '../images/icons/next.svg?react'
import RedoIcon from '../images/icons/redo.svg?react'
import ResetIcon from '../images/icons/reset.svg?react'
import UndoIcon from '../images/icons/undo.svg?react'
import { nextStep } from '../setupSteps'
import { redoStep, undoStep } from '../store'
import { SetupStep } from '../types'
import Button from './button'
import LocaleText from './localeText'

const Toolbar: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { confirmReset, handleResetClick } = useToolbarActions()

  const resetButtonRef = useRef<HTMLButtonElement>(null)
  const undoButtonRef = useRef<HTMLButtonElement>(null)
  const redoButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  const buttonRefs = [resetButtonRef, undoButtonRef, redoButtonRef, nextButtonRef] // Add buttons here for the key handlers
  const [focusedIndex, setFocusedIndex] = useState(0)

  const onKeyDownHandler = (focusedIndex: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let newIndex = focusedIndex
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      newIndex = (focusedIndex + 1) % buttonRefs.length
      event.preventDefault()
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      newIndex = (focusedIndex - 1 + buttonRefs.length) % buttonRefs.length
      event.preventDefault()
    } else if (event.key === 'Home') {
      newIndex = 0
      event.preventDefault()
    } else if (event.key === 'End') {
      newIndex = buttonRefs.length - 1
      event.preventDefault()
    }

    if (newIndex !== focusedIndex) {
      event.preventDefault()
      setFocusedIndex(newIndex)
      buttonRefs[newIndex]?.current?.focus()
    }
  }

  const undoDisabled = useAppSelector(state => state.flow.pastSteps.length === 0)
  const redoDisabled = useAppSelector(state => state.flow.futureSteps.length === 0)
  const nextStepDisabled = useAppSelector(state => state.flow.currentStep >= SetupStep.setupEnd)

  return (
    <footer>
      <div
        className="toolbar"
        role="toolbar"
      >
        <Button
          Icon={ResetIcon}
          className="left"
          ref={resetButtonRef}
          onClick={handleResetClick}
          title={t('label.confirmReset')}
          tabIndex={focusedIndex === 0 ? 0 : -1}
          onKeyDown={onKeyDownHandler(0)}
        >
          {confirmReset ? t('label.confirmReset') : ''}
        </Button>

        <Button
          Icon={UndoIcon}
          disabled={undoDisabled}
          className="left"
          ref={undoButtonRef}
          onClick={() => {
            dispatch(undoStep())
            setFocusedIndex(1)
          }}
          title={t('label.undo')}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 1 ? 0 : -1}
          onKeyDown={onKeyDownHandler(1)}
        />

        <Button
          Icon={RedoIcon}
          disabled={redoDisabled}
          className="left"
          ref={redoButtonRef}
          onClick={() => {
            dispatch(redoStep())
            setFocusedIndex(2)
          }}
          title={t('label.redo')}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 2 ? 0 : -1}
          onKeyDown={onKeyDownHandler(2)}
        />

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
