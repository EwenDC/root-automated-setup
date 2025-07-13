import classNames from 'classnames'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { selectedFactionContext } from './factionSelect'

interface StatBarProps {
  stat: 'aggression' | 'complexity' | 'crafting' | 'wealth'
}

const StatBar: React.FC<StatBarProps> = ({ stat }) => {
  const selectedFaction = useContext(selectedFactionContext)
  const { t } = useTranslation()

  const statValue = selectedFaction != null ? selectedFaction[stat] : 0
  return (
    <div className="stat">
      <span className="label">{t(`label.${stat}`)}</span>
      <span
        className={classNames({
          low: statValue < 1,
          moderate: statValue === 1,
          high: statValue > 1,
        })}
      >
        {t(`label.factionRating.${statValue}`)}
      </span>
    </div>
  )
}

export default StatBar
