import Checkbox from '../components/checkbox'
import ComponentToggle from '../components/componentToggle'
import Radiogroup from '../components/radiogroup'
import Section from '../components/section'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  selectCaptainArray,
  selectFactionArray,
  selectVagabondArray,
  setLimitCaptains,
  setLimitVagabonds,
  setUseDraft,
  toggleCaptain,
  toggleFaction,
  toggleVagabond,
} from '../store'

const ChooseFactionsStep: React.FC = () => {
  const playerCount = useAppSelector(state => state.setup.playerCount)
  const factions = useAppSelector(selectFactionArray)
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const limitVagabonds = useAppSelector(state => state.setup.limitVagabonds)
  const limitCaptains = useAppSelector(state => state.setup.limitCaptains)
  const dispatch = useAppDispatch()

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
      {useDraft ? (
        <>
          {factions.some(faction => faction.dealVagabond && faction.enabled) ? (
            <Radiogroup
              id="chooseVagabonds"
              defaultValue={limitVagabonds}
              onChange={checked => dispatch(setLimitVagabonds(checked))}
            />
          ) : null}
          {limitVagabonds ? (
            <ComponentToggle
              selector={selectVagabondArray}
              toggleComponent={toggleVagabond}
              getLabelKey={vagabond => `vagabond.${vagabond.code}.name`}
            />
          ) : null}
          {factions.some(faction => faction.dealCaptains && faction.enabled) ? (
            <Radiogroup
              id="chooseCaptains"
              defaultValue={limitCaptains}
              onChange={checked => dispatch(setLimitCaptains(checked))}
            />
          ) : null}
          {limitCaptains ? (
            <ComponentToggle
              selector={selectCaptainArray}
              toggleComponent={toggleCaptain}
              getLabelKey={captain => `captain.${captain.code}.name`}
            />
          ) : null}
        </>
      ) : null}
    </Section>
  )
}

export default ChooseFactionsStep
