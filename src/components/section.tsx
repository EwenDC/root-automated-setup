import type { TOptions } from 'i18next'
import type { PropsWithChildren } from 'react'

import { useContext, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { stepActiveContext } from '../hooks'
import LocaleText from './localeText'

type SectionProps = PropsWithChildren<{
  active?: boolean
  titleKey?: string | string[]
  subtitleKey?: string | string[]
  textKey?: string | string[]
  textBelowChildren?: boolean | undefined
  translationOptions?: TOptions
  components?: Record<string, React.ReactElement>
}>

const Section: React.FC<SectionProps> = ({
  titleKey,
  subtitleKey,
  textKey,
  textBelowChildren = false,
  translationOptions,
  components,
  children,
}) => {
  const active = useContext(stepActiveContext)
  const { t } = useTranslation()
  const sectionElement = useRef<HTMLElement>(null)

  // Trigger a scroll-to effect when we become active
  useEffect(() => {
    if (active && sectionElement.current)
      sectionElement.current.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion)').matches ? 'auto' : 'smooth',
      })
  })

  // Generate the (sub)title text in advance so we can use it to rename the window (if required)
  const titleText = titleKey && t(titleKey, translationOptions)
  const subtitleText = subtitleKey && t(subtitleKey, translationOptions)

  // Rename the window to match our step (if we are the active step)
  useEffect(() => {
    if (active) {
      const stepTitle = titleText || subtitleText
      // Prepend the step title or subtitle if our step has one
      document.title = `${stepTitle ? `${stepTitle} - ` : ''}${t('label.pageTitle')}`
    }
  }, [active, titleText, subtitleText, t])

  return (
    <section
      className={active ? 'active' : 'inactive'}
      ref={sectionElement}
    >
      {titleText && <h2>{titleText}</h2>}
      {subtitleText && <h3>{subtitleText}.</h3>}
      {textBelowChildren ? children : null}
      {textKey && (
        <div>
          <LocaleText
            i18nKey={textKey}
            tOptions={translationOptions}
            components={components}
          />
        </div>
      )}
      {!textBelowChildren ? children : null}
    </section>
  )
}

export default Section
