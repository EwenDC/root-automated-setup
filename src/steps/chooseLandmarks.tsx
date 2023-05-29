import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
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
  // Ensure the component re-renders when the language changes
  useTranslation();

  const translationOptions = useMemo(
    () => ({
      context: setupMap && setupMap.useLandmark ? "mapLandmark" : undefined,
    }),
    [setupMap]
  );
  const onLandmarkCountChange = useCallback(
    (value: number) => dispatch(setLandmarkCount(value)),
    [dispatch]
  );

  if (!setupMap) return null;
  return (
    <Section
      titleKey="setupStep.chooseLandmarks.title"
      textKey="setupStep.chooseLandmarks.body"
      translationOptions={translationOptions}
    >
      <NumberSelector
        id="landmarkCount"
        value={landmarkCount}
        minVal={0}
        maxVal={2}
        onChange={onLandmarkCountChange}
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

export default memo(ChooseLandmarksStep);
