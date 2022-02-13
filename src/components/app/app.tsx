import React from "react";
import { selectSetupParameters, SetupStep } from "../../features";
import ExpansionList from "../expansionList";
import { useAppSelector } from "../hooks";
import Step from "../step";
import styles from "./app.module.css";

export const App: React.FC = () => {
  const {
    chooseDeckSkipped,
    doBotSetup,
    chooseLandmarksSkipped,
    landmarkCount,
    chooseHirelingsSkipped,
  } = useAppSelector(selectSetupParameters);

  return (
    <div className={styles.container}>
      <Step step={SetupStep.chooseExpansions}>
        <ExpansionList />
      </Step>
      <Step step={SetupStep.chooseMap}></Step>
      <Step step={SetupStep.setupMap}></Step>
      <Step step={SetupStep.chooseDeck} stepSkipped={chooseDeckSkipped}></Step>
      <Step step={SetupStep.setUpBots} stepSkipped={!doBotSetup}></Step>
      <Step step={SetupStep.seatPlayers}></Step>
      <Step
        step={SetupStep.chooseLandmarks}
        stepSkipped={chooseLandmarksSkipped}
      ></Step>
      <Step
        step={SetupStep.setUpLandmarks}
        stepSkipped={landmarkCount <= 0}
      ></Step>
      <Step
        step={SetupStep.chooseHirelings}
        stepSkipped={chooseHirelingsSkipped}
      ></Step>
      <Step
        step={SetupStep.setUpHirelings}
        stepSkipped={chooseHirelingsSkipped}
      ></Step>
      <Step step={SetupStep.drawCards}></Step>
      <Step step={SetupStep.chooseFaction}></Step>
      <Step step={SetupStep.setUpFaction} useStepText={false}></Step>
      <Step step={SetupStep.placeScoreMarkers}></Step>
      <Step step={SetupStep.chooseHand}></Step>
    </div>
  );
};
