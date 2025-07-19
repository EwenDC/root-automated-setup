import { useTranslation } from 'react-i18next'

import Checkbox from '../components/checkbox'
import ComponentToggle from '../components/componentToggle'
import Section from '../components/section'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  selectFactionArray,
  selectVagabondArray,
  setUseDraft,
  toggleFaction,
  toggleVagabond,
} from '../store'

const ChooseFactionsStep: React.FC = () => {
  const playerCount = useAppSelector(state => state.setup.playerCount)
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const factions = useAppSelector(selectFactionArray)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  return (
    <Section
      titleKey="setupStep.chooseFactions.title"
      textKey="setupStep.chooseFactions.body"
    >
      {playerCount < factions.length ? (
        <Checkbox
          id="useDraft"
          defaultValue={useDraft}
          onChange={checked => dispatch(setUseDraft(checked))}
        />
      ) : null}
      <ComponentToggle
        selector={selectFactionArray}
        toggleComponent={toggleFaction}
        getLabelKey={faction => `faction.${faction.key}.name`}
      />
      {useDraft && factions.some(faction => faction.dealVagabond && faction.enabled) ? (
        <>
          {t('label.selectVagabonds')}
          <ComponentToggle
            selector={selectVagabondArray}
            toggleComponent={toggleVagabond}
            getLabelKey={vagabond => `vagabond.${vagabond.code}.name`}
          />
        </>
      ) : null}
    </Section>
  )
}

export default ChooseFactionsStep
