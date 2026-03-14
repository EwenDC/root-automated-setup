import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '../hooks'
import NextIcon from '../images/icons/next.svg?react'
import CopyIcon from '../images/icons/next.svg?react'
import RedoIcon from '../images/icons/redo.svg?react'
import ResetIcon from '../images/icons/reset.svg?react'
import UndoIcon from '../images/icons/undo.svg?react'
// Note: Substitute this with your preferred copy icon
import { nextStep } from '../setupSteps'
import { redoStep, resetStep, undoStep, selectBotArray, selectExpansionArray } from '../store'
import { SetupStep } from '../types'
import Button from './button'
import LocaleText from './localeText'
import Section from './section'

// Increased max index to 4 to accommodate the new 5th button
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
  const resetDisabled = useAppSelector(state => state.flow.pastSteps.length === 0)
  const nextStepDisabled = useAppSelector(state => state.flow.currentStep >= SetupStep.setupEnd)

  const botCount = useAppSelector(state => state.setup.botCount)
  const botPool = useAppSelector(state => state.flow.botPool)
  const allBots = useAppSelector(selectBotArray)

  // Grab state slices needed for generating the URL
  const setupState = useAppSelector(state => state.setup)
  const flowState = useAppSelector(state => state.flow)
  const expansions = useAppSelector(selectExpansionArray)

  const botParams = botPool
    .map(code => {
      const bot = allBots.find(b => b.code === code)
      return bot?.clockroot || code
    })
    .join(',')

  const undoButtonRef = useRef<HTMLButtonElement>(null)
  const redoButtonRef = useRef<HTMLButtonElement>(null)
  const copyButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const resetButtonRef = useRef<HTMLButtonElement>(null)

  const handleResetClick = () => {
    const confirmReset = window.confirm(t('label.confirmReset'))
    if (confirmReset) {
      dispatch(resetStep())
      // Reset defaults to moving focus to Redo
      setFocusedIndex(1)
    }
  }

  const handleCopyUrl = () => {
    const params = new URLSearchParams()

    // Setup basic settings
    if (setupState.playerCount) params.set('playerCount', setupState.playerCount.toString())
    if (setupState.botCount) params.set('botCount', setupState.botCount.toString())
    if (setupState.map) params.set('map', setupState.map)
    if (setupState.deck) params.set('deck', setupState.deck)

    // Setup active expansions
    const enabledExpansions = expansions.filter(ex => ex.enabled).map(ex => ex.code)
    if (enabledExpansions.length > 0) {
      params.set('expansions', enabledExpansions.join(','))
    }

    // Setup active factions, bots, and hirelings
    // ESLint fix: Arrays are guaranteed by Redux, no need for existence checks
    if (flowState.factionPool.length > 0) {
      params.set('factions', flowState.factionPool.map(f => f.code).join(','))
    }
    if (flowState.botPool.length > 0) {
      params.set('botsSelected', flowState.botPool.join(','))
    }
    if (flowState.hirelingPool.length > 0) {
      params.set('hirelings', flowState.hirelingPool.map(h => h.code).join(','))
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`

    // ESLint fix: Use `void` to explicitly mark the unawaited promise, add a `.catch()`,
    // and use curly braces inside the setTimeout callback.
    void navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 3000)
      })
      .catch((err: unknown) => {
        console.error('Failed to copy to clipboard:', err)
      })
  }

  const onKeyDownHandler =
    (focusedIndex: ButtonIndex) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      // Re-ordered to exactly match the index flow: Undo (0), Redo (1), Copy (2), Next (3), Reset (4)
      const buttonRefs = [
        undoButtonRef,
        redoButtonRef,
        copyButtonRef,
        nextButtonRef,
        resetButtonRef,
      ] as const
      let newIndex: ButtonIndex | undefined

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        newIndex = (focusedIndex + 1) as ButtonIndex
        if (newIndex > MAX_BUTTON_INDEX) newIndex = MIN_BUTTON_INDEX
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        newIndex = (focusedIndex - 1) as ButtonIndex
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
          className="reset"
          ref={resetButtonRef}
          onClick={handleResetClick}
          title={t('label.reset')}
          tabIndex={focusedIndex === 4 ? 0 : -1}
          onKeyDown={onKeyDownHandler(4)}
        />
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
          tabIndex={focusedIndex === 1 ? 0 : -1}
          onKeyDown={onKeyDownHandler(1)}
        />

        {/* NEW COPY BUTTON (Positioned between Redo and Next) */}
        <Button
          Icon={CopyIcon}
          className="left"
          ref={copyButtonRef}
          onClick={() => {
            handleCopyUrl()
            setFocusedIndex(2)
          }}
          title={copied ? t('label.copied') : t('label.failCopy')}
          tabIndex={focusedIndex === 2 ? 0 : -1}
          onKeyDown={onKeyDownHandler(2)}
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
          tabIndex={focusedIndex === 3 ? 0 : -1}
          onKeyDown={onKeyDownHandler(3)}
        >
          <LocaleText i18nKey="label.nextStep" />
        </Button>

        {botCount > 0 && botParams ? (
          <Section
            textKey="label.bots"
            components={{
              BotLink: (
                <a
                  className="clockroot"
                  href={`https://clockroot.seiyria.com/?bots=${botParams}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
            }}
          />
        ) : null}
      </div>
    </footer>
  )
}

export default Toolbar
