import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import deckReducer from "../features/deck/deckSlice";
import expansionReducer from "../features/expansion/expansionSlice";
import factionReducer from "../features/faction/factionSlice";
import hirelingReducer from "../features/hireling/hirelingSlice";
import landmarkReducer from "../features/landmark/landmarkSlice";
import mapReducer from "../features/map/mapSlice";
import vagabondReducer from "../features/vagabond/vagabondSlice";

export const store = configureStore({
  reducer: {
    deck: deckReducer,
    expansion: expansionReducer,
    faction: factionReducer,
    hireling: hirelingReducer,
    landmark: landmarkReducer,
    map: mapReducer,
    vagabond: vagabondReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
