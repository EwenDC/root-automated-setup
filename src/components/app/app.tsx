import React from "react";
import { selectSetupParameters, SetupStep } from "../../features";
import ExpansionList from "../expansionList";
import { useAppSelector } from "../hooks";
import Step from "../step";
import styles from "./app.module.css";

export const App: React.FC = () => {
  const {
    currentStep,
    chooseDeckSkipped,
    doBotSetup,
    chooseLandmarksSkipped,
    landmarkCount,
    chooseHirelingsSkipped,
  } = useAppSelector(selectSetupParameters);

  return (
    <div className={styles.container}>
      <Step step={SetupStep.chooseExpansions} currentStep={currentStep}>
        <ExpansionList />
      </Step>
      <Step step={SetupStep.chooseMap} currentStep={currentStep}></Step>
      <Step step={SetupStep.setupMap} currentStep={currentStep}></Step>
      <Step
        step={SetupStep.chooseDeck}
        currentStep={currentStep}
        stepSkipped={chooseDeckSkipped}
      ></Step>
      <Step
        step={SetupStep.setUpBots}
        currentStep={currentStep}
        stepSkipped={!doBotSetup}
      ></Step>
      <Step step={SetupStep.seatPlayers} currentStep={currentStep}></Step>
      <Step
        step={SetupStep.chooseLandmarks}
        currentStep={currentStep}
        stepSkipped={chooseLandmarksSkipped}
      ></Step>
      <Step
        step={SetupStep.setUpLandmarks}
        currentStep={currentStep}
        stepSkipped={landmarkCount <= 0}
      ></Step>
      <Step
        step={SetupStep.chooseHirelings}
        currentStep={currentStep}
        stepSkipped={chooseHirelingsSkipped}
      ></Step>
      <Step
        step={SetupStep.setUpHirelings}
        currentStep={currentStep}
        stepSkipped={chooseHirelingsSkipped}
      ></Step>
      <Step step={SetupStep.drawCards} currentStep={currentStep}></Step>
      <Step step={SetupStep.chooseFaction} currentStep={currentStep}></Step>
      <Step step={SetupStep.setUpFaction} currentStep={currentStep}></Step>
      <Step step={SetupStep.placeScoreMarkers} currentStep={currentStep}></Step>
      <Step step={SetupStep.chooseHand} currentStep={currentStep}></Step>
    </div>
  );
};
