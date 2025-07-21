import classNames from 'classnames'
import { useContext } from 'react'

import { selectedFactionContext } from './factionSelect'
import LocaleText from './localeText'

interface StatBarProps {
  stat: 'aggression' | 'complexity' | 'crafting' | 'wealth'
}

const StatBar: React.FC<StatBarProps> = ({ stat }) => {
  const selectedFaction = useContext(selectedFactionContext)

  const statValue = selectedFaction != null ? selectedFaction.stats[stat] : 0
  return (
    <div className="stat">
      <span className="label">
        <LocaleText i18nKey={`label.${stat}`} />
      </span>
      <span
        className={classNames({
          low: statValue < 1,
          moderate: statValue === 1,
          high: statValue > 1,
        })}
      >
        <LocaleText i18nKey={`label.factionRating.${statValue}`} />
      </span>
    </div>
  )
}

export default StatBar
