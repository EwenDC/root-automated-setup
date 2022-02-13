import React from "react";
import { selectCurrentStep, SetupStep } from "../../features";
import ExpansionList from "../expansionList";
import { useAppSelector } from "../hooks";
import Step from "../step";
import styles from "./app.module.css";

export const App: React.FC = () => {
  const currentStep = useAppSelector(selectCurrentStep);

  return (
    <div className={styles.container}>
      <Step step={SetupStep.chooseExpansions} currentStep={currentStep}>
        <ExpansionList />
      </Step>
    </div>
  );
};
