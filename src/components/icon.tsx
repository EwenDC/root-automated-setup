import type { PropsWithChildren } from 'react'

import { useTranslation } from 'react-i18next'

import type { ClearingSuit, Item } from '../types'

import { ICON_DICTIONARY } from '../constants'

type ItemProps = PropsWithChildren<{
  icon: ClearingSuit | Item
}>

const Icon: React.FC<ItemProps> = ({ icon, children }) => {
  const { t } = useTranslation()
  const iconAlt = t(ICON_DICTIONARY[icon].key)
  return (
    <>
      <img
        className="icon"
        src={ICON_DICTIONARY[icon].image}
        alt={iconAlt}
        title={iconAlt}
      />
      {children}
    </>
  )
}

export default Icon
