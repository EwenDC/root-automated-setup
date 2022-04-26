import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  selectComponentArray,
  setupInitialState,
  toggleComponent,
} from "./reduxUtils";
import { expansionReducers } from "./expansionSlice";
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
          image: map.image === "" ? undefined : map.image,
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

/** Redux Selector for returning a specified Map from state */
export const selectMap = (state: RootState, code: string) => state.map[code];

/** Redux Selector for returning the map list as an array, moving the object key to the object field "code" */
export const selectMapArray = selectComponentArray((state) => state.map);

/** Redux Selector for returning an array of enabled maps */
export const selectEnabledMaps = createSelector(selectMapArray, (array) =>
  array.filter((value) => value.enabled)
);

/** Redux Selector for returning an array of enabled maps which have a landmark */
export const selectEnabledLandmarkMaps = createSelector(
  selectEnabledMaps,
  (array) => array.filter((value) => value.landmark != null)
);

export const mapSlice = createSlice({
  name: "map",
  initialState: setupInitialState(addExpansionMaps),
  reducers: {
    toggleMap: toggleComponent,
  },
  extraReducers: (builder) => expansionReducers(builder, addExpansionMaps),
});

export const { toggleMap } = mapSlice.actions;
export default mapSlice.reducer;
