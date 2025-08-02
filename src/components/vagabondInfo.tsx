import { useContext } from 'react'

import { selectedFactionContext } from '../hooks'
import IconList from './iconList'
import LocaleText from './localeText'

const VagabondInfo: React.FC = () => {
  const selectedFaction = useContext(selectedFactionContext)
  const vagabond = selectedFaction?.vagabond

  if (!vagabond) return null
  return (
    <>
      <p>
        <strong>
          <LocaleText i18nKey="label.startingItems" />.
        </strong>{' '}
        <LocaleText
          i18nKey={'label.startWith'}
          components={{ StartingItems: <IconList list={vagabond.startingItems} /> }}
        />
        .
      </p>
      <p>
        <strong>
          <LocaleText i18nKey="label.specialAction" />:{' '}
          <LocaleText i18nKey={`vagabond.${vagabond.code}.action`} />.
        </strong>{' '}
        <LocaleText i18nKey={`vagabond.${vagabond.code}.effect`} />
      </p>
    </>
  )
}

export default VagabondInfo
