import { useContext } from 'react'

import { selectedFactionContext } from '../hooks'
import IconList from './iconList'
import LocaleText from './localeText'

interface CaptainInfoProps {
  index: number
}

const CaptainInfo: React.FC<CaptainInfoProps> = ({ index }) => {
  const selectedFaction = useContext(selectedFactionContext)
  const captain = selectedFaction?.captains[index]

  if (!captain) return null
  return (
    <section className="captain-info">
      <div className="name">
        <img
          src={captain.image}
          alt=""
          aria-hidden="true"
        />
        <h5>
          <LocaleText i18nKey={`captain.${captain.code}.name`} />
        </h5>
      </div>
      <p>
        <strong>
          <LocaleText i18nKey="label.startingItems" />.
        </strong>
        <br />
        <LocaleText
          i18nKey={'label.startWith'}
          components={{ StartingItems: <IconList list={captain.startingItems} /> }}
        />
        .
      </p>
      <p>
        <strong>
          <LocaleText i18nKey="label.ability" />.
        </strong>
        <br />
        <LocaleText i18nKey={`captain.${captain.code}.effect`} />
      </p>
    </section>
  )
}

export default CaptainInfo
