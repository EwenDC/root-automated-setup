import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  deckReducer,
  expansionReducer,
  factionReducer,
  hirelingReducer,
  landmarkReducer,
  mapReducer,
  setupReducer,
  vagabondReducer,
} from "../features/";

export const store = configureStore({
  reducer: {
    deck: deckReducer,
    expansion: expansionReducer,
    faction: factionReducer,
    hireling: hirelingReducer,
    landmark: landmarkReducer,
    map: mapReducer,
    setup: setupReducer,
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
