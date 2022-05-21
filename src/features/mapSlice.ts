import { createSlice } from "@reduxjs/toolkit";
import {
  getExpansionConfig,
  setupInitialState,
  toggleComponent,
} from "./utils";
import { expansionReducers } from "./expansionSlice";
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
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `While enabling expansion "${expansionCode}", map with duplicate code "${mapCode}" not added to state:`,
          map
        );
      }
    }
};

export const mapSlice = createSlice({
  name: "map",
  initialState: () => setupInitialState(addExpansionMaps),
  reducers: {
    toggleMap: toggleComponent,
  },
  extraReducers: (builder) => expansionReducers(builder, addExpansionMaps),
});

export const { toggleMap } = mapSlice.actions;
export default mapSlice.reducer;
