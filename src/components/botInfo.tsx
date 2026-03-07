import type { FlowSlice } from '../types'

import { selectedBotContext, useAppSelector } from '../hooks'
import { selectBotPoolFull } from '../store'
import ComponentCount from './componentCount'
import LocaleText from './localeText'

interface BotInfoProps {
  flowSlice: FlowSlice
}

const BotInfo: React.FC<BotInfoProps> = ({ flowSlice }) => {
  const botPoolFull = useAppSelector(selectBotPoolFull(flowSlice))

  const selectedBot = flowSlice.index != null && botPoolFull[flowSlice.index]
  if (!selectedBot) return null

  return (
    <div className="bot-info">
      <selectedBotContext.Provider value={selectedBot}>
        <div className="count-list">
          <ComponentCount component="warriors" />
          <ComponentCount component="buildings" />
          <ComponentCount component="tokens" />
        </div>
        <h4>
          <LocaleText i18nKey={`bot.${selectedBot.key}.summaryTitle`} />
        </h4>
        <LocaleText i18nKey={`bot.${selectedBot.key}.summary`} />
      </selectedBotContext.Provider>
    </div>
  )
}

export default BotInfo
