import classNames from 'classnames'
import { useContext, useId } from 'react'
import { useTranslation } from 'react-i18next'

import type { FlowSlice } from '../types'

import { useAppDispatch, useAppSelector, useInvalid } from '../hooks'
import { stepActiveContext } from '../hooks'
import MilitantIcon from '../images/icons/militant.svg?react'
import { selectFactionPoolFull, setCurrentIndex, setErrorMessage } from '../store'

interface FactionSelectProps {
  flowSlice: FlowSlice
}

const FactionSelect: React.FC<FactionSelectProps> = ({ flowSlice }) => {
  const factionPoolFull = useAppSelector(selectFactionPoolFull(flowSlice))
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)
  const radioName = useId()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  // Prepare the faction name in advance as we need to incorporate the vagabond character name (if there is one)
  const labelledFactionPool = factionPoolFull.map(
    ({ code, key, image, militant, vagabond, captains }) => {
      let factionName = t(`faction.${key}.name`)
      if (vagabond) factionName = `${t(`vagabond.${vagabond.code}.name`)} (${factionName})`

      // Swap out the faction image for the vagabond image (if we have one)
      const factionImage = vagabond ? vagabond.image : image

      return [code, factionImage, factionName, militant, captains] as const
    },
  )

  const { index: selectedIndex, lastFactionLocked } = flowSlice
  const lastIndex = factionPoolFull.length - 1
  return (
    // Unfortunately we can't use fieldset as it prevents scroll shadow styling from working due to how it renders it's children
    <div
      className="faction-select"
      role="radiogroup"
      aria-required={useDraft}
      aria-invalid={invalid ? true : undefined}
      aria-errormessage={invalid ? 'appError' : undefined}
      aria-disabled={!stepActive}
    >
      {labelledFactionPool.map(
        ([code, factionImage, factionName, militant, captains], factionIndex) => {
          const factionLocked = lastFactionLocked && factionIndex === lastIndex
          return (
            <label
              key={code}
              className={classNames({
                militant: militant,
                locked: factionLocked,
              })}
              title={stepActive && factionLocked ? t('error.lockedFaction') : undefined}
              onClick={
                stepActive && factionLocked
                  ? () => dispatch(setErrorMessage('error.lockedFaction'))
                  : undefined
              }
            >
              <input
                type="radio"
                name={radioName}
                checked={factionIndex === selectedIndex}
                disabled={!stepActive || factionLocked}
                onChange={() => dispatch(setCurrentIndex(factionIndex))}
              />
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
            </label>
          )
        },
      )}
    </div>
  )
}

export default FactionSelect
