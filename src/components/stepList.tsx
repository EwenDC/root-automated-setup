import { memo } from "react";
import { selectFlowSlice, selectFlowState } from "../features/selectors";
import { useAppSelector } from "../hooks";
import getStepComponent from "../stepComponents";
import LanguageSelect from "./languageSelect";

const StepList: React.FC = () => {
  const { currentStep, futureSteps, pastSteps } = useAppSelector(selectFlowState);
  const currentFlowSlice = useAppSelector(selectFlowSlice);
  const ActiveStep = getStepComponent(currentStep);
  return (
    <main>
      <LanguageSelect />

      {pastSteps.map((slice, index) => {
        const PastStep = getStepComponent(slice.step);
        return <PastStep flowSlice={slice} key={index} />;
      })}

      <ActiveStep flowSlice={currentFlowSlice} active />

      {futureSteps.map((slice, index, array) => {
        const FutureStep = getStepComponent(slice.step);
        // Invert the index for the key as we're removing/replacing elements from the start first
        return <FutureStep flowSlice={slice} key={array.length - index} />;
      })}
    </main>
  );
};

export default memo(StepList);
