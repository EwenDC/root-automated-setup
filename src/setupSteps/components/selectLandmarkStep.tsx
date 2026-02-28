import type { SetupStepComponent } from '..'

import ComponentSelect from '../../components/componentSelect'
import LocaleText from '../../components/localeText'
import Section from '../../components/section'
import { useAppSelector, usePlayerNumber } from '../../hooks'
import { selectLandmarkPoolFull, selectSetupMapCode } from '../../store'

const SelectLandmarkStep: SetupStepComponent = ({ flowSlice }) => {
  const map = useAppSelector(selectSetupMapCode)
  const playerNumber = usePlayerNumber(flowSlice)
  const { landmarkPool, index } = flowSlice

  const selectedLandmark = index != null ? landmarkPool[index] : undefined
  return (
    <Section
      subtitleKey="setupStep.selectLandmark.subtitle"
      textKey="setupStep.selectLandmark.body"
      translationOptions={{ count: playerNumber }}
    >
      <ComponentSelect
        flowSlice={flowSlice}
        selector={selectLandmarkPoolFull}
        getLabelKey={landmark => `landmark.${landmark.code}.name`}
      />
      {selectedLandmark && (
        <div>
          <LocaleText
            i18nKey={`landmark.${selectedLandmark}.effect`}
            tOptions={{ context: map }}
          />
        </div>
      )}
    </Section>
  )
}

export default SelectLandmarkStep
