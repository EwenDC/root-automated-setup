import { memo } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";
import ComponentToggle from "../components/componentToggle";
import NumberSelector from "../components/numberSelector";
import Section from "../components/section";
import { toggleLandmark } from "../features/componentsSlice";
import { selectLandmarkArray, selectSetupMap } from "../features/selectors";
import { setLandmarkCount } from "../features/setupSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const ChooseLandmarksStep: React.FC = () => {
  const landmarkCount = useAppSelector((state) => state.setup.landmarkCount);
  const playerCount = useAppSelector((state) => state.setup.playerCount);
  const setupMap = useAppSelector(selectSetupMap, shallowEqual);
  const dispatch = useAppDispatch();
  // Ensure the component re-renders when the language changes
  useTranslation();

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
          getLabelKey={(landmark) => "landmark." + landmark.code + ".name"}
          getLockedKey={(landmark) =>
            // Disable this landmark if it requires more players to include
            landmark.minPlayers > playerCount
              ? "error.landmarkNotEnoughPlayers"
              : // Disable this landmark if it was already used in map setup
              setupMap.useLandmark && setupMap.landmark && landmark.code === setupMap.landmark.code
              ? "error.mapLandmarkUsed"
              : null
          }
        />
      ) : null}
    </Section>
  );
};

export default memo(ChooseLandmarksStep);
