import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  deckReducer,
  expansionReducer,
  factionReducer,
  flowReducer,
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
    flow: flowReducer,
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
