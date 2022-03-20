import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './slices/tasks-slice'
import filtersSlice from './slices/filters-slice'
import popoutSlice from './slices/popout-slice'


export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    filters: filtersSlice,
    popout: popoutSlice,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
