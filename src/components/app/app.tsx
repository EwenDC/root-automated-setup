import React from "react";
import { selectSetupParameters, SetupStep, skipSteps } from "../../features";
import Checkbox from "../checkbox";
import ExpansionList from "../expansionList";
import { useAppDispatch, useAppSelector } from "../hooks";
import Step from "../step";
import Toolbar from "../toolbar";
import styles from "./app.module.css";

export const App: React.FC = () => {
  const { skippedSteps } = useAppSelector(selectSetupParameters);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.container}>
        <Step step={SetupStep.chooseExpansions}>
          <ExpansionList />
          <Checkbox
            id="includeBotStep"
            defaultValue={!skippedSteps[SetupStep.setUpBots]}
            onChange={(checked) =>
              dispatch(
                skipSteps({ steps: [SetupStep.setUpBots], skip: !checked })
              )
            }
          />
        </Step>
        <Step step={SetupStep.chooseMap}></Step>
        <Step step={SetupStep.setUpMap} useStepText={false}></Step>
        <Step step={SetupStep.setUpMapLandmark} useStepText={false}></Step>
        <Step step={SetupStep.setUpBots}></Step>
        <Step step={SetupStep.seatPlayers}></Step>
        <Step step={SetupStep.chooseLandmarks}></Step>
        <Step step={SetupStep.setUpLandmark1} useStepText={false}></Step>
        <Step step={SetupStep.setUpLandmark2} useStepText={false}></Step>
        <Step step={SetupStep.chooseHirelings}></Step>
        <Step step={SetupStep.setUpHireling1} useStepText={false}></Step>
        <Step step={SetupStep.setUpHireling2} useStepText={false}></Step>
        <Step step={SetupStep.setUpHireling3} useStepText={false}></Step>
        <Step step={SetupStep.postHirelingSetup}></Step>
        <Step step={SetupStep.chooseDeck}></Step>
        <Step step={SetupStep.drawCards}></Step>
        <Step step={SetupStep.chooseFactions}></Step>
        <Step step={SetupStep.selectFaction}></Step>
        <Step step={SetupStep.setUpFaction} useStepText={false}></Step>
        <Step step={SetupStep.placeScoreMarkers}></Step>
        <Step step={SetupStep.chooseHand}></Step>
        <Step step={SetupStep.setupEnd}></Step>
      </div>
      <Toolbar />
    </>
  );
};
