import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import deckReducer from "../features/deck/deckSlice";
import expansionReducer from "../features/expansion/expansionSlice";
import factionReducer from "../features/faction/factionSlice";
import hirelingReducer from "../features/hireling/hirelingSlice";

export const store = configureStore({
  reducer: {
    deck: deckReducer,
    expansion: expansionReducer,
    faction: factionReducer,
    hireling: hirelingReducer,
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
