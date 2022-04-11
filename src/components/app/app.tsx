import React from "react";
import {
  selectExpansionArray,
  selectMapArray,
  selectSetupParameters,
  skipSteps,
  toggleExpansion,
  toggleMap,
} from "../../features";
import { SetupStep } from "../../types";
import Checkbox from "../checkbox";
import ComponentList from "../componentList";
import { useAppDispatch, useAppSelector } from "../hooks";
import Step from "../step";
import Toolbar from "../toolbar";
import styles from "./app.module.css";

export const App: React.FC = () => {
  const { skippedSteps, map } = useAppSelector(selectSetupParameters);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.container}>
        <Step step={SetupStep.chooseExpansions}>
          <ComponentList
            selector={selectExpansionArray}
            toggleComponent={(expansion) =>
              dispatch(toggleExpansion(expansion.code))
            }
            getTooltipKey={(expansion) => `expansion.${expansion.code}`}
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
            getTooltipKey={(map) => `map.${map.code}.name`}
          />
        </Step>
        <Step
          step={SetupStep.setUpMap}
          subtitleKey={`map.${map?.code}.setupTitle`}
          textKey={`map.${map?.code}.setupText`}
        ></Step>
        <Step
          step={SetupStep.setUpMapLandmark}
          subtitleKey={`map.${map?.code}.landmarkSetupTitle`}
          textKey={`map.${map?.code}.landmarkSetupText`}
        ></Step>
        <Step step={SetupStep.setUpBots}></Step>
        <Step step={SetupStep.seatPlayers}></Step>
        <Step step={SetupStep.chooseLandmarks}></Step>
        <Step step={SetupStep.setUpLandmark1}></Step>
        <Step step={SetupStep.setUpLandmark2}></Step>
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
      </div>
      <Toolbar />
    </>
  );
};
