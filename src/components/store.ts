import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import expansionReducer from "../features/expansion/expansionSlice";
import deckReducer from "../features/deck/deckSlice";

export const store = configureStore({
  reducer: {
    expansion: expansionReducer,
    deck: deckReducer,
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
