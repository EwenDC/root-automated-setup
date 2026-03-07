import type { SetupStepComponent } from '..'

import Checkbox from '../../components/checkbox'
import ComponentToggle from '../../components/componentToggle'
import Section from '../../components/section'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectBotArray, setUseDraft, toggleBot } from '../../store'

const ChooseBotsStep: SetupStepComponent = () => {
  const botCount = useAppSelector(state => state.setup.botCount)
  const bots = useAppSelector(selectBotArray)
  console.log('Bots', bots)
  const useDraft = useAppSelector(state => state.flow.useDraft)
  const dispatch = useAppDispatch()

  return (
    <Section
      titleKey="setupStep.chooseBots.title"
      textKey="setupStep.chooseBots.body"
    >
      {botCount < bots.length ? (
        <Checkbox
          labelKey="label.useDraft"
          defaultValue={useDraft}
          onChange={checked => dispatch(setUseDraft(checked))}
        />
      ) : null}
      <ComponentToggle
        selector={selectBotArray}
        toggleComponent={toggleBot}
        getLabelKey={bot => `bot.${bot.key}.name`}
      />
    </Section>
  )
}
//
export default ChooseBotsStep
