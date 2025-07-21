import classNames from 'classnames'
import { createContext, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import type { Faction, FlowSlice } from '../types'

import { useAppDispatch, useAppSelector, useInvalid, useSelectFactionPool } from '../hooks'
import MilitantIcon from '../images/icons/militant.svg?react'
import { setCurrentFactionIndex, setErrorMessage } from '../store'
import ComponentCount from './componentCount'
import IconList from './iconList'
import LocaleText from './localeText'
import StatBar from './statBar'
import { stepActiveContext } from './stepList'

export const selectedFactionContext = createContext<Faction | null>(null)

interface FactionSelectProps {
  flowSlice: FlowSlice
}

const FactionSelect: React.FC<FactionSelectProps> = ({ flowSlice }) => {
  const selectFactionPool = useSelectFactionPool(flowSlice.factionPool)
  const factionPool = useAppSelector(selectFactionPool)
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  // Prepare the faction name in advance as we need to incorporate the vagabond character name (if there is one)
  const labelledFactionPool = factionPool.map(({ code, key, image, militant, vagabond }) => {
    let factionName = t(`faction.${key}.name`)
    if (vagabond) factionName = `${t(`vagabond.${vagabond.code}.name`)} (${factionName})`

    // Swap out the faction image for the vagabond image (if we have one)
    const factionImage = vagabond ? vagabond.image : image

    return { code, factionImage, factionName, militant }
  })
  const largeLabels = labelledFactionPool.some(faction => faction.factionName.length > 22)

  // We use this event handler to simulate the keyboard behaviour of a real radio group, to comply with accessibility requirements
  const onKeyDownHandler: React.KeyboardEventHandler<HTMLButtonElement> = event => {
    const focusedIndex = flowSlice.factionIndex ?? 0
    const maxIndex = factionPool.length - (flowSlice.lastFactionLocked ? 2 : 1)
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
      dispatch(setCurrentFactionIndex(newIndex))

      if (event.currentTarget.parentNode) {
        // TypeScript types incorrectly types this as just "Element" instead of "HTMLElement"
        const selectedHTMLElement = event.currentTarget.parentNode.children[newIndex] as HTMLElement
        selectedHTMLElement.focus()
      }
    }
  }

  const lastIndex = factionPool.length - 1
  const selectedFaction =
    flowSlice.factionIndex != null ? factionPool[flowSlice.factionIndex] : null
  return (
    <>
      <div
        className={classNames('faction-select', { 'large-labels': largeLabels })}
        role="radiogroup"
        aria-label={t('setupStep.selectFaction.subtitle')}
        aria-required="true"
        aria-invalid={invalid ? true : undefined}
        aria-errormessage={invalid ? 'appError' : undefined}
        aria-disabled={!stepActive}
      >
        {labelledFactionPool.map(({ code, factionImage, factionName, militant }, index) => (
          <button
            key={code}
            className={classNames({
              militant: militant,
              selected: index === flowSlice.factionIndex,
              locked: flowSlice.lastFactionLocked && index === lastIndex,
            })}
            onClick={() => {
              if (index !== flowSlice.factionIndex) {
                if (!flowSlice.lastFactionLocked || index < lastIndex) {
                  dispatch(setCurrentFactionIndex(index))
                } else {
                  dispatch(setErrorMessage('error.lockedFaction'))
                }
              }
            }}
            disabled={!stepActive}
            title={
              stepActive && flowSlice.lastFactionLocked && index === lastIndex
                ? t('error.lockedFaction')
                : undefined
            }
            role="radio"
            aria-checked={index === flowSlice.factionIndex}
            aria-disabled={
              stepActive ? flowSlice.lastFactionLocked && index === lastIndex : undefined
            }
            aria-label={
              stepActive
                ? `${factionName}${militant ? ` (${t('label.militant')})` : ''}`
                : undefined
            }
            // We have to override the tabbing logic to meet the standard of role "radio"
            tabIndex={stepActive ? (index === (flowSlice.factionIndex ?? 0) ? 0 : -1) : undefined}
            onKeyDown={onKeyDownHandler}
          >
            <img
              src={factionImage}
              alt="" // We're including the alt text in the button itself so don't bother reading out the image
              aria-hidden="true"
            />
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
        ))}
      </div>
      {selectedFaction && (
        <div className="faction-info">
          <selectedFactionContext.Provider value={selectedFaction}>
            <div className="stat-list">
              <StatBar stat="complexity" />
              <StatBar stat="wealth" />
              <StatBar stat="aggression" />
              <StatBar stat="crafting" />
            </div>
            <div>
              <div className="count-list">
                <ComponentCount component="warriors" />
                <ComponentCount component="buildings" />
                <ComponentCount component="tokens" />
              </div>
              {selectedFaction.vagabond && (
                <>
                  <p>
                    <strong>
                      <LocaleText i18nKey="label.startingItems" />.
                    </strong>{' '}
                    <IconList list={selectedFaction.vagabond.startingItems} />.
                  </p>
                  <p>
                    <strong>
                      <LocaleText i18nKey="label.specialAction" />:{' '}
                      <LocaleText i18nKey={`vagabond.${selectedFaction.vagabond.code}.action`} />.
                    </strong>{' '}
                    <LocaleText i18nKey={`vagabond.${selectedFaction.vagabond.code}.effect`} />
                  </p>
                </>
              )}
              <h4 className="summary-title">
                <LocaleText i18nKey={`faction.${selectedFaction.key}.summaryTitle`} />
              </h4>
              <LocaleText i18nKey={`faction.${selectedFaction.key}.summary`} />
            </div>
          </selectedFactionContext.Provider>
        </div>
      )}
    </>
  )
}

export default FactionSelect
