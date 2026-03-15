import type { SetupStepComponent } from '..'

import ComponentToggle from '../../components/componentToggle'
import NumberSelector from '../../components/numberSelector'
import Section from '../../components/section'
import { MAX_LANDMARKS } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectLandmarkArray, selectSetupMap, setLandmarkCount, toggleLandmark } from '../../store'

const ChooseLandmarksStep: SetupStepComponent = () => {
  const landmarkCount = useAppSelector(state => state.setup.landmarkCount)
  const setupMap = useAppSelector(selectSetupMap)
  const useHouseRules = useAppSelector(state => state.setup.useHouserules)
  const landmarks = useAppSelector(selectLandmarkArray)
  const dispatch = useAppDispatch()

  if (!setupMap) return null
  const enabledLandmarkCount = landmarks.filter(landmark => landmark.enabled).length

  const maxAllowed = useHouseRules ? enabledLandmarkCount : MAX_LANDMARKS

  return (
    <Section
      titleKey="setupStep.chooseLandmarks.title"
      textKey="setupStep.chooseLandmarks.body"
      translationOptions={{ context: setupMap.useLandmark ? 'mapLandmark' : undefined }}
    >
      <NumberSelector
        labelKey="label.landmarkCount"
        value={landmarkCount}
        minVal={0}
        maxVal={maxAllowed}
        onChange={value => dispatch(setLandmarkCount(value))}
      />
      {landmarkCount > 0 ? (
        <ComponentToggle
          selector={selectLandmarkArray}
          toggleComponent={toggleLandmark}
          getLabelKey={landmark => `landmark.${landmark.code}.name`}
        />
      ) : null}
    </Section>
  )
}

export default ChooseLandmarksStep
