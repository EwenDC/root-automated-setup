import ComponentToggle from "../components/componentToggle";
import NumberSelector from "../components/numberSelector";
import Section from "../components/section";
import { toggleLandmark } from "../features/componentsSlice";
import { selectLandmarkArray, selectSetupMap } from "../features/selectors";
import { setLandmarkCount } from "../features/setupSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { CodeObject } from "../types";

const getLandmarkLabelKey = (landmark: CodeObject) => `landmark.${landmark.code}.name`;

const ChooseLandmarksStep: React.FC = () => {
  const landmarkCount = useAppSelector((state) => state.setup.landmarkCount);
  const setupMap = useAppSelector(selectSetupMap);
  const dispatch = useAppDispatch();

  if (!setupMap) return null;
  return (
    <Section
      titleKey="setupStep.chooseLandmarks.title"
      textKey="setupStep.chooseLandmarks.body"
      translationOptions={{
        context: setupMap.useLandmark ? "mapLandmark" : undefined,
      }}
    >
      <NumberSelector
        id="landmarkCount"
        value={landmarkCount}
        minVal={0}
        maxVal={2}
        onChange={(value) => dispatch(setLandmarkCount(value))}
      />
      {landmarkCount > 0 ? (
        <ComponentToggle
          selector={selectLandmarkArray}
          toggleComponent={toggleLandmark}
          getLabelKey={getLandmarkLabelKey}
        />
      ) : null}
    </Section>
  );
};

export default ChooseLandmarksStep;
