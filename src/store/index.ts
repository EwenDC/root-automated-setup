import type { Action, ThunkAction } from '@reduxjs/toolkit'

import { configureStore } from '@reduxjs/toolkit'

import componentsReducer from './slices/components'
import flowReducer from './slices/flow'
import setupReducer from './slices/setup'

export const store = configureStore({
  reducer: { components: componentsReducer, flow: flowReducer, setup: setupReducer },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>

export * from './selectors'
export * from './slices/components'
export * from './slices/flow'
export * from './slices/setup'
export * from './thunks'
