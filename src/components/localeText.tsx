import type { TOptions } from 'i18next'

import { useEffect, useReducer } from 'react'
import { TransWithoutContext, useTranslation } from 'react-i18next'

import Icon from './icon'

const iconComponents = {
  Bag: <Icon icon="bag" />,
  Boot: <Icon icon="boot" />,
  Coin: <Icon icon="coin" />,
  Crossbow: <Icon icon="crossbow" />,
  Fox: <Icon icon="fox" />,
  Hammer: <Icon icon="hammer" />,
  Mouse: <Icon icon="mouse" />,
  Rabbit: <Icon icon="rabbit" />,
  Sword: <Icon icon="sword" />,
  Tea: <Icon icon="tea" />,
  Torch: <Icon icon="torch" />,
}

interface LocaleTextProps {
  i18nKey?: string | string[]
  count?: number
  tOptions?: TOptions
  components?: Record<string, React.ReactElement>
}

/**
 * Wrapper component around `react-i18next`'s `Trans` component to ensure it rerenders whenever
 * `react-i18next` detects a change.
 */
const LocaleText: React.FC<LocaleTextProps> = ({ i18nKey, count, tOptions, components }) => {
  // Ensure the component re-renders when the language changes
  const { i18n } = useTranslation()
  const [version, incrementVersion] = useReducer(v => v + 1, 0)

  // Listen for i18next events as per react-i18next's code
  useEffect(() => {
    i18n.on('languageChanged', incrementVersion)
    if (import.meta.hot) i18n.store.on('added', incrementVersion)

    return () => {
      i18n.off('languageChanged', incrementVersion)
      if (import.meta.hot) i18n.store.off('added', incrementVersion)
    }
  }, [i18n])

  return (
    <TransWithoutContext
      key={version}
      i18n={i18n}
      i18nKey={i18nKey}
      // For the Trans component "count" cannot be passed in with options
      count={count ?? tOptions?.count}
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      -- Bad react-i18next types force our hand here */
      tOptions={tOptions as any}
      components={components ? { ...iconComponents, ...components } : iconComponents}
    />
  )
}

export default LocaleText
