import classNames from 'classnames'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import type { FlowSlice } from '../types'

import { useAppDispatch, useAppSelector, useInvalid } from '../hooks'
import MilitantIcon from '../images/icons/militant.svg?react'
import { selectFactionPoolFull, setCurrentIndex, setErrorMessage } from '../store'
import { stepActiveContext } from './stepList'

interface FactionSelectProps {
  flowSlice: FlowSlice
}

const FactionSelect: React.FC<FactionSelectProps> = ({ flowSlice }) => {
  const { factionPool, index, lastFactionLocked } = flowSlice
  const factionPoolFull = useAppSelector(selectFactionPoolFull(factionPool))
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  // Prepare the faction name in advance as we need to incorporate the vagabond character name (if there is one)
  const labelledFactionPool = factionPoolFull.map(
    ({ code, key, image, militant, vagabond, captains }) => {
      let factionName = t(`faction.${key}.name`)
      if (vagabond) factionName = `${t(`vagabond.${vagabond.code}.name`)} (${factionName})`

      // Swap out the faction image for the vagabond image (if we have one)
      const factionImage = vagabond ? vagabond.image : image

      return { code, factionImage, factionName, militant, captains }
    },
  )

  // We use this event handler to simulate the keyboard behavior of a real radio group, to comply with accessibility requirements
  const onKeyDownHandler: React.KeyboardEventHandler<HTMLButtonElement> = event => {
    const focusedIndex = index ?? 0
    const maxIndex = factionPoolFull.length - (lastFactionLocked ? 2 : 1)
    let newIndex: number | undefined

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      newIndex = focusedIndex + 1
      if (newIndex > maxIndex) newIndex = 0
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      newIndex = focusedIndex - 1
      if (newIndex < 0) newIndex = maxIndex
    }

    if (newIndex != null) {
      event.preventDefault()
      dispatch(setCurrentIndex(newIndex))

      if (event.currentTarget.parentNode) {
        const selectedElement = event.currentTarget.parentNode.children[newIndex]
        if (selectedElement instanceof HTMLElement) selectedElement.focus()
      }
    }
  }

  const lastIndex = factionPoolFull.length - 1
  return (
    <div
      className="faction-select"
      role="radiogroup"
      aria-label={t('setupStep.selectFaction.subtitle')}
      aria-required="true"
      aria-invalid={invalid ? true : undefined}
      aria-errormessage={invalid ? 'appError' : undefined}
      aria-disabled={!stepActive}
    >
      {labelledFactionPool.map(
        ({ code, factionImage, factionName, militant, captains }, factionIndex) => (
          <button
            key={code}
            className={classNames({
              militant: militant,
              selected: factionIndex === index,
              locked: lastFactionLocked && factionIndex === lastIndex,
            })}
            onClick={() => {
              if (factionIndex !== index) {
                if (!lastFactionLocked || factionIndex < lastIndex) {
                  dispatch(setCurrentIndex(factionIndex))
                } else {
                  dispatch(setErrorMessage('error.lockedFaction'))
                }
              }
            }}
            disabled={!stepActive}
            title={
              stepActive && lastFactionLocked && factionIndex === lastIndex
                ? t('error.lockedFaction')
                : undefined
            }
            role="radio"
            aria-checked={factionIndex === index}
            aria-disabled={stepActive ? lastFactionLocked && factionIndex === lastIndex : undefined}
            aria-label={
              stepActive
                ? `${factionName}${militant ? ` (${t('label.militant')})` : ''}`
                : undefined
            }
            // We have to override the tabbing logic to meet the standard of role "radio"
            tabIndex={stepActive ? (factionIndex === (index ?? 0) ? 0 : -1) : undefined}
            onKeyDown={onKeyDownHandler}
          >
            <div className="image-frame">
              <img
                className="warrior"
                src={factionImage}
                alt="" // We're including the alt text in the button itself so don't bother reading out the image
                aria-hidden="true"
              />
              {captains.map(({ code: captainCode, image }) => (
                // Give a preview of the captain options (accessible users will need to select the faction to see this info)
                <img
                  className="captain"
                  key={captainCode}
                  src={image}
                  alt=""
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="title">
              <span className="label">
                {militant ? (
                  <>
                    <MilitantIcon
                      className="militant-icon"
                      title={t('label.militant')}
                    />{' '}
                  </>
                ) : null}
                {factionName}
              </span>
            </div>
          </button>
        ),
      )}
    </div>
  )
}

export default FactionSelect
