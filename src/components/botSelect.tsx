import classNames from 'classnames'
import { useContext, useId } from 'react'
import { useTranslation } from 'react-i18next'

import type { FlowSlice } from '../types'

import { useAppDispatch, useAppSelector, useInvalid } from '../hooks'
import { stepActiveContext } from '../hooks'
import MilitantIcon from '../images/icons/militant.svg?react'
import { selectBotPoolFull, setCurrentIndex, setErrorMessage } from '../store'

interface BotSelectProps {
  flowSlice: FlowSlice
}

const BotSelect: React.FC<BotSelectProps> = ({ flowSlice }) => {
  const botPoolFull = useAppSelector(selectBotPoolFull(flowSlice))
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const stepActive = useContext(stepActiveContext)
  const invalid = useInvalid(stepActive)
  const radioName = useId()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  // Prepare the bot name in advance as we need to incorporate the vagabond character name (if there is one)
  const labelledBotPool = botPoolFull.map(({ code, key, image, militant }) => {
    const botName = t(`bot.${key}.name`)
    const botImage = image

    return [code, botImage, botName, militant] as const
  })

  const { index: selectedIndex, lastBotLocked } = flowSlice
  const lastIndex = botPoolFull.length - 1
  return (
    // Unfortunately we can't use fieldset as it prevents scroll shadow styling from working due to how it renders it's children
    <div
      className="bot-select"
      role="radiogroup"
      aria-required={useDraft}
      aria-invalid={invalid ? true : undefined}
      aria-errormessage={invalid ? 'appError' : undefined}
      aria-disabled={!stepActive}
    >
      {labelledBotPool.map(([code, botImage, botName, militant], botIndex) => {
        const botLocked = lastBotLocked && botIndex === lastIndex
        return (
          <label
            key={code}
            className={classNames({
              militant: militant,
              locked: botLocked,
            })}
            title={stepActive && botLocked ? t('error.lockedBot') : undefined}
            onClick={
              stepActive && botLocked
                ? () => dispatch(setErrorMessage('error.lockedBot'))
                : undefined
            }
          >
            <input
              type="radio"
              name={radioName}
              checked={botIndex === selectedIndex}
              disabled={!stepActive || botLocked}
              onChange={() => dispatch(setCurrentIndex(botIndex))}
            />
            <div className="image-frame">
              <img
                className="warrior"
                src={botImage}
                alt="" // We're including the alt text in the button itself so don't bother reading out the image
                aria-hidden="true"
              />
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
                {botName}
              </span>
            </div>
          </label>
        )
      })}
    </div>
  )
}

export default BotSelect
