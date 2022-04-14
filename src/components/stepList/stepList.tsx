import {
  enableMapLandmark,
  fixFirstPlayer,
  selectExpansionArray,
  selectFactionArray,
  selectFlowState,
  selectLandmarkArray,
  selectLandmarkMaps,
  selectMapArray,
  selectSetupParameters,
  setLandmarkCount,
  setPlayerCount,
  skipSteps,
  toggleExpansion,
  toggleLandmark,
  toggleMap,
} from "../../features";
import { SetupStep } from "../../types";
import Checkbox from "../checkbox";
import ComponentList from "../componentList";
import { useAppDispatch, useAppSelector } from "../hooks";
import NumberSelector from "../numberSelector";
import Radiogroup from "../radiogroup";
import Step from "../step";
import styles from "./stepList.module.css";

export const StepList: React.FC = () => {
  const { skippedSteps } = useAppSelector(selectFlowState);
  const {
    playerCount,
    fixedFirstPlayer,
    playerOrder,
    map,
    useMapLandmark,
    landmarkCount,
    landmark1,
    landmark2,
  } = useAppSelector(selectSetupParameters);
  const landmarkMaps = useAppSelector(selectLandmarkMaps);
  const factions = useAppSelector(selectFactionArray);
  const dispatch = useAppDispatch();

  return (
    <main className={styles.container}>
      <Step step={SetupStep.chooseExpansions}>
        <ComponentList
          selector={selectExpansionArray}
          toggleComponent={(expansion) =>
            dispatch(toggleExpansion(expansion.code))
          }
          getLabelKey={(expansion) => `expansion.${expansion.code}`}
          isLocked={(expansion) => expansion.base}
        />
        <Checkbox
          id="includeBotStep"
          defaultValue={!skippedSteps[SetupStep.setUpBots]}
          onChange={(checked) =>
            dispatch(skipSteps(SetupStep.setUpBots, !checked))
          }
        />
      </Step>
      <Step step={SetupStep.chooseMap}>
        <ComponentList
          selector={selectMapArray}
          toggleComponent={(map) => dispatch(toggleMap(map.code))}
          getLabelKey={(map) => `map.${map.code}.name`}
        />
        {landmarkMaps.length > 0 ? (
          <Checkbox
            id="useMapLandmark"
            defaultValue={useMapLandmark}
            onChange={(checked) => dispatch(enableMapLandmark(checked))}
          />
        ) : null}
      </Step>
      <Step
        step={SetupStep.setUpMap}
        subtitleKey={`map.${map?.code}.setupTitle`}
        textKey={`map.${map?.code}.setupText`}
      />
      <Step
        step={SetupStep.setUpMapLandmark}
        subtitleKey={`landmark.${map?.landmark}.setupTitle`}
        textKey={`map.${map?.code}.landmarkSetupText`}
      />
      <Step step={SetupStep.setUpBots} />
      <Step step={SetupStep.seatPlayers}>
        <NumberSelector
          id="playerCount"
          value={playerCount}
          minVal={1}
          maxVal={factions.length - 1}
          onChange={(value) => dispatch(setPlayerCount(value))}
        />
        <Radiogroup
          id="fixedFirstPlayer"
          defaultValue={fixedFirstPlayer}
          onChange={(value) => dispatch(fixFirstPlayer(value))}
        />
      </Step>
      <Step step={SetupStep.chooseLandmarks}>
        <NumberSelector
          id="landmarkCount"
          value={landmarkCount}
          minVal={0}
          maxVal={2}
          onChange={(value) => dispatch(setLandmarkCount(value))}
        />
        {landmarkCount > 0 ? (
          <ComponentList
            selector={selectLandmarkArray}
            toggleComponent={(landmark) =>
              dispatch(toggleLandmark(landmark.code))
            }
            getLabelKey={(landmark) => `landmark.${landmark.code}.name`}
            isLocked={(landmark) =>
              landmark.minPlayers > playerCount ||
              (useMapLandmark && landmark.code === map?.landmark)
            }
            getLockedKey={(landmark) =>
              landmark.minPlayers > playerCount
                ? "error.landmarkNotEnoughPlayers"
                : "error.mapLandmarkUsed"
            }
          />
        ) : null}
      </Step>
      <Step
        step={SetupStep.setUpLandmark1}
        subtitleKey={`landmark.${landmark1}.setupTitle`}
        textKey={`landmark.${landmark1}.setupText`}
        textCount={playerOrder[playerOrder.length - 1]} // Last player in turn order
      />
      <Step
        step={SetupStep.setUpLandmark2}
        subtitleKey={`landmark.${landmark2}.setupTitle`}
        textKey={`landmark.${landmark2}.setupText`}
        textCount={playerOrder[playerOrder.length - 2]} // Second last player in turn order
      />
      <Step step={SetupStep.chooseHirelings}></Step>
      <Step step={SetupStep.setUpHireling1}></Step>
      <Step step={SetupStep.setUpHireling2}></Step>
      <Step step={SetupStep.setUpHireling3}></Step>
      <Step step={SetupStep.postHirelingSetup}></Step>
      <Step step={SetupStep.chooseDeck}></Step>
      <Step step={SetupStep.drawCards}></Step>
      <Step step={SetupStep.chooseFactions}></Step>
      <Step step={SetupStep.selectFaction}></Step>
      <Step step={SetupStep.setUpFaction}></Step>
      <Step step={SetupStep.placeScoreMarkers}></Step>
      <Step step={SetupStep.chooseHand}></Step>
      <Step step={SetupStep.setupEnd}></Step>
    </main>
  );
};
