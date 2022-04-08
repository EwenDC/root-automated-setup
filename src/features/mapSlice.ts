import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
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
import { ComponentState, MapComponent } from "../types";

const addExpansionMaps = (
  state: ComponentState<MapComponent>,
  expansionCode: string,
  expansion = getExpansionConfig(expansionCode)
) => {
  if (expansion != null && "maps" in expansion)
    for (const [mapCode, map] of Object.entries(expansion.maps)) {
      // Don't add to state if it already exists
      if (state[mapCode] == null) {
        state[mapCode] = {
          ...map,
          landmark: map.landmark === "" ? undefined : map.landmark,
          expansionCode: expansionCode,
          enabled: true,
        };
      } else {
        console.warn(
          `While enabling expansion "${expansionCode}", map with duplicate code "${mapCode}" not added to state:`,
          map
        );
      }
    }
};

export const selectMap = (state: RootState, code: string) => state.map[code];

/** Redux Selector for returning the landmark list as an array, moving the object key to the object field "code" */
export const selectMapArray = selectComponentArray((state) => state.map);

/** Redux Selector for returning an array of enabled landmarks */
export const selectEnabledMaps = createSelector(selectMapArray, (array) =>
  array.filter((value) => value.enabled)
);

export const mapSlice = createSlice({
  name: "map",
  initialState: setupInitialState(addExpansionMaps),
  reducers: {
    toggleMap: toggleComponent,
  },
  extraReducers: {
    [enableExpansionAction]: (state, action: PayloadAction<string>) =>
      addExpansionMaps(state, action.payload),
    [disableExpansionAction]: deleteExpansionComponents,
  },
});

export const { toggleMap } = mapSlice.actions;
export const toggleMapAction = toggleMap.type;
export default mapSlice.reducer;
