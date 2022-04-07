import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Component,
  ComponentState,
  deleteExpansionComponents,
  getExpansionConfig,
  selectComponentArray,
  setupInitialState,
  toggleComponent,
} from "./reduxUtils";
import {
  disableExpansionAction,
  enableExpansionAction,
} from "./expansionSlice";
import { RootState } from "../components/store";

export interface HirelingDemoted {
  name: string;
}
export interface HirelingPromoted extends HirelingDemoted {
  warriors: number;
  components: number;
  componentName?: string;
}
export interface Hireling extends Component {
  factions: string[];
  promoted: HirelingPromoted;
  demoted: HirelingDemoted;
}

const addExpansionHirelings = (
  state: ComponentState<Hireling>,
  expansionCode: string,
  expansion = getExpansionConfig(expansionCode)
) => {
  if (expansion != null && "hirelings" in expansion)
    for (const [hirelingCode, hireling] of Object.entries(
      expansion.hirelings
    )) {
      // Don't add to state if it already exists
      if (state[hirelingCode] == null) {
        state[hirelingCode] = {
          ...hireling,
          promoted: {
            ...hireling.promoted,
            componentName:
              hireling.promoted.componentName === ""
                ? undefined
                : hireling.promoted.componentName,
          },
          expansionCode: expansionCode,
          enabled: true,
        };
      } else {
        console.warn(
          `While enabling expansion "${expansionCode}", hireling with duplicate code "${hirelingCode}" not added to state:`,
          hireling
        );
      }
    }
};

export const selectHireling = (state: RootState, code: string) =>
  state.hireling[code];

/** Redux Selector for returning the hireling list as an array, moving the object key to the object field "code" */
export const selectHirelingArray = selectComponentArray(
  (state) => state.hireling
);

/** Redux Selector for returning an array of enabled hirelings */
export const selectEnabledHirelings = createSelector(
  selectHirelingArray,
  (array) => array.filter((value) => value.enabled)
);

export const hirelingSlice = createSlice({
  name: "hireling",
  initialState: setupInitialState(addExpansionHirelings),
  reducers: {
    toggleHireling: toggleComponent,
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) =>
      addExpansionHirelings(state, action.payload),
    [disableExpansionAction]: deleteExpansionComponents,
  },
});

export const { toggleHireling } = hirelingSlice.actions;
export const toggleHirelingAction = toggleHireling.type;
export default hirelingSlice.reducer;
