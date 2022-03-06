import React from "react";
import { SetupStep } from "../../features";
import Checkbox from "../checkbox";
import ExpansionList from "../expansionList";
import Step from "../step";
import styles from "./app.module.css";

export const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Step step={SetupStep.chooseExpansions}>
        <ExpansionList />
        <Checkbox id="includeBotStep" />
      </Step>
      <Step step={SetupStep.chooseMap}></Step>
      <Step step={SetupStep.setupMap}></Step>
      <Step step={SetupStep.chooseDeck}></Step>
      <Step step={SetupStep.setUpBots}></Step>
      <Step step={SetupStep.seatPlayers}></Step>
      <Step step={SetupStep.chooseLandmarks}></Step>
      <Step step={SetupStep.setUpLandmark1}></Step>
      <Step step={SetupStep.setUpLandmark2}></Step>
      <Step step={SetupStep.chooseHirelings}></Step>
      <Step step={SetupStep.setUpHireling1}></Step>
      <Step step={SetupStep.setUpHireling2}></Step>
      <Step step={SetupStep.setUpHireling3}></Step>
      <Step step={SetupStep.drawCards}></Step>
      <Step step={SetupStep.chooseFaction}></Step>
      <Step step={SetupStep.setUpFaction} useStepText={false}></Step>
      <Step step={SetupStep.placeScoreMarkers}></Step>
      <Step step={SetupStep.chooseHand}></Step>
    </div>
  );
};
