import type { SetupStepComponent } from '..'

import Checkbox from '../../components/checkbox'
import ComponentToggle from '../../components/componentToggle'
import NumberSelector from '../../components/numberSelector'
import Section from '../../components/section'
import { useAppDispatch, useAppSelector } from '../../hooks'
// Ensure setBotCount is imported from your store
import { selectBotArray, setBotCount, setIncludeBots, toggleBot } from '../../store'

const ChooseBotsStep: SetupStepComponent = () => {
  const includeBots = useAppSelector(state => state.setup.includeBots)
  const botCount = useAppSelector(state => state.setup.botCount)
  const dispatch = useAppDispatch()

  return (
    <Section
      titleKey="setupStep.chooseBots.title"
      textKey="setupStep.chooseBots.body"
    >
      <Checkbox
        labelKey="label.includeBotStep"
        defaultValue={includeBots}
        onChange={checked => dispatch(setIncludeBots(checked))}
      />

      {includeBots ? (
        <>
          <NumberSelector
            labelKey="label.botCount"
            value={botCount}
            minVal={1}
            maxVal={4} // Adjust max based on how many bots your game supports
            onChange={value => dispatch(setBotCount(value))}
          />
          <ComponentToggle
            selector={selectBotArray}
            toggleComponent={toggleBot}
            getLabelKey={bot => `bot.${bot.code}.name`}
          />
        </>
      ) : null}
    </Section>
  )
}

export default ChooseBotsStep
