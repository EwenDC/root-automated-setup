import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import componentsReducer from "./features/componentsSlice";
import flowReducer from "./features/flowSlice";
import setupReducer from "./features/setupSlice";

export const store = configureStore({
  reducer: {
    components: componentsReducer,
    flow: flowReducer,
    setup: setupReducer,
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
