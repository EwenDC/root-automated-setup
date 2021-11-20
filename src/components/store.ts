import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import expansionReducer from "../features/expansion/expansionSlice";

export const store = configureStore({
  reducer: {
    expansion: expansionReducer,
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
