import { createContext } from "react";

interface StepContextValue {
  stepActive: boolean;
}

const defaultValue: StepContextValue = {
  stepActive: false,
};

export const StepContext = createContext(defaultValue);
export const StepProvider = StepContext.Provider;
export default StepContext;
