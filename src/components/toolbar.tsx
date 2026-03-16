import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '../hooks'
import NextIcon from '../images/icons/next.svg?react'
import CopyIcon from '../images/icons/next.svg?react'
import RedoIcon from '../images/icons/redo.svg?react'
import ResetIcon from '../images/icons/reset.svg?react'
import UndoIcon from '../images/icons/undo.svg?react'
import { nextStep } from '../setupSteps'
import {
  redoStep,
  resetStep,
  selectBotArray,
  selectExpansionArray,
  selectFactionArray,
  undoStep,
} from '../store'
import { SetupStep } from '../types'
import Button from './button'
import LocaleText from './localeText'
import Section from './section'

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
  const allBots = useAppSelector(selectBotArray)
  const selectedBots = useAppSelector(state => state.flow.selectedBots)

  const setupState = useAppSelector(state => state.setup)
  const expansions = useAppSelector(selectExpansionArray)
  const factions = useAppSelector(selectFactionArray)

  const botParams = selectedBots
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
      setFocusedIndex(1)
    }
  }

  const handleCopyUrl = async () => {
    const urlParams = new URLSearchParams()

    // -- NUMBERS -- //
    if (setupState.playerCount !== 4)
      urlParams.set('playerCount', setupState.playerCount.toString())
    if (setupState.botCount > 0) urlParams.set('botCount', setupState.botCount.toString())
    if (setupState.landmarkCount > 0)
      urlParams.set('landmarkCount', setupState.landmarkCount.toString())
    if (setupState.hirelingCount > 0)
      urlParams.set('hirelingCount', setupState.hirelingCount.toString())

    // -- BOOLEANS -- //
    if (setupState.fixedFirstPlayer) urlParams.set('fixedFirstPlayer', 'true')
    if (setupState.balancedSuits) urlParams.set('balancedSuits', 'true')
    if (setupState.limitCaptains) urlParams.set('limitCaptains', 'true')
    if (setupState.limitVagabonds) urlParams.set('limitVagabonds', 'true')

    // -- STRINGS -- //
    if (setupState.map) urlParams.set('map', setupState.map)
    if (setupState.deck) urlParams.set('deck', setupState.deck)

    // -- ARRAYS / CODES -- //
    const enabledExpansions = expansions
      .filter(e => e.enabled && e.code !== 'root')
      .map(e => e.code)

    if (enabledExpansions.length > 0) {
      urlParams.set('expansions', enabledExpansions.join(','))
    }

    const enabledFactions = factions.filter(f => f.enabled).map(f => f.code)

    if (enabledFactions.length > 0) {
      urlParams.set('factions', enabledFactions.join(','))
    }

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
          Icon={CopyIcon}
          className="left"
          ref={copyButtonRef}
          onClick={() => {
            void handleCopyUrl()
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
          // We have to override the tabbing logic to meet the standard of role "toolbar"
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
