import type { FlowSlice } from '../types'

import { selectedFactionContext, useAppSelector } from '../hooks'
import { selectFactionPoolFull } from '../store'
import CaptainInfo from './captainInfo'
import ComponentCount from './componentCount'
import LocaleText from './localeText'
import StatBar from './statBar'
import VagabondInfo from './vagabondInfo'

interface FactionInfoProps {
  flowSlice: FlowSlice
}

const FactionInfo: React.FC<FactionInfoProps> = ({ flowSlice }) => {
  const { factionPool, factionIndex } = flowSlice
  const factionPoolFull = useAppSelector(selectFactionPoolFull(factionPool))
  const selectedFaction = factionIndex != null ? factionPoolFull[factionIndex] : undefined
  return (
    selectedFaction && (
      <div className="faction-info">
        <selectedFactionContext.Provider value={selectedFaction}>
          <div className="stat-list">
            <div className="group">
              <StatBar stat="complexity" />
              <StatBar stat="wealth" />
            </div>
            <div className="group">
              <StatBar stat="aggression" />
              <StatBar stat="crafting" />
            </div>
          </div>
          <div>
            <div className="count-list">
              <ComponentCount component="warriors" />
              <ComponentCount component="buildings" />
              <ComponentCount component="tokens" />
            </div>
            <VagabondInfo />
            {selectedFaction.captains.length > 0 ? (
              <>
                <h4 className="section-title">
                  <LocaleText i18nKey="label.captainSelection" />
                </h4>
                <div className="captain-list">
                  <div className="group">
                    <CaptainInfo index={0} />
                    <CaptainInfo index={1} />
                  </div>
                  <div className="group">
                    <CaptainInfo index={2} />
                    <CaptainInfo index={3} />
                  </div>
                </div>
              </>
            ) : null}
            <h4 className="section-title">
              <LocaleText i18nKey={`faction.${selectedFaction.key}.summaryTitle`} />
            </h4>
            <LocaleText i18nKey={`faction.${selectedFaction.key}.summary`} />
          </div>
        </selectedFactionContext.Provider>
      </div>
    )
  )
}

export default FactionInfo
