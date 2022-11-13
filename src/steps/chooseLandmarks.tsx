import ComponentToggle from "../components/componentToggle";
import NumberSelector from "../components/numberSelector";
import Section from "../components/section";
import { toggleLandmark } from "../features/componentsSlice";
import { selectLandmarkArray, selectSetupMap, selectSetupParameters } from "../features/selectors";
import { setLandmarkCount } from "../features/setupSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const ChooseLandmarksStep: React.FC = () => {
  const { playerCount, landmarkCount } = useAppSelector(selectSetupParameters);
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
          getLabelKey={(landmark) => "landmark." + landmark.code + ".name"}
          getLockedKey={(landmark) =>
            // Disable this landmark if it requires more players to include
            landmark.minPlayers > playerCount
              ? "error.landmarkNotEnoughPlayers"
              : // Disable this landmark if it was already used in map setup
              setupMap.useLandmark && landmark.code === setupMap.landmark
              ? "error.mapLandmarkUsed"
              : null
          }
        />
      ) : null}
    </Section>
  );
};

// Memo intentionally omitted due to rendering bugs with switch language
export default ChooseLandmarksStep;
