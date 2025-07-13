import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '../hooks'
import NextIcon from '../images/icons/next.svg?react'
import RedoIcon from '../images/icons/redo.svg?react'
import UndoIcon from '../images/icons/undo.svg?react'
import { nextStep, redoStep, undoStep } from '../store'
import { SetupStep } from '../types'
import Button from './button'

type ButtonIndex = 0 | 1 | 2
const MIN_BUTTON_INDEX = 0
const MAX_BUTTON_INDEX = 2

const Toolbar: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [focusedIndex, setFocusedIndex] = useState<ButtonIndex>(0)
  const undoDisabled = useAppSelector(state => state.flow.pastSteps.length === 0)
  const redoDisabled = useAppSelector(state => state.flow.futureSteps.length === 0)
  const nextStepDisabled = useAppSelector(state => state.flow.currentStep >= SetupStep.setupEnd)

  const undoButtonRef = useRef<HTMLButtonElement>(null)
  const redoButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  const onKeyDownHandler =
    (focusedIndex: ButtonIndex) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const buttonRefs = [undoButtonRef, redoButtonRef, nextButtonRef] as const
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
          disabled={nextStepDisabled}
          className="right"
          ref={nextButtonRef}
          onClick={() => {
            dispatch(nextStep())
            setFocusedIndex(2)
          }}
          // We have to override the tabbing logic to meet the standard of role "toolbar"
          tabIndex={focusedIndex === 2 ? 0 : -1}
          onKeyDown={onKeyDownHandler(2)}
        >
          {t('label.nextStep')}
        </Button>
      </div>
    </footer>
  )
}

export default Toolbar
