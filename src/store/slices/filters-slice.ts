import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilters, TaskStatus } from '../../models/IFilters'


const initialState: IFilters = {
  name: '',
  gradeFrom: '',
  gradeTo: '',
  parentId: '',
  creationTime: undefined,
  status: TaskStatus.all,
}


export const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<IFilters>) => {
      const {
        name,
        gradeFrom,
        gradeTo,
        parentId,
        creationTime,
        status,
      } = action.payload

      state.name = name
      state.gradeFrom = gradeFrom
      state.gradeTo = gradeTo
      state.parentId = parentId
      state.creationTime = creationTime
      state.status = status
    },
    resetFilters: (state) => {
      state.name = initialState.name
      state.gradeFrom = initialState.gradeFrom
      state.gradeTo = initialState.gradeTo
      state.parentId = initialState.parentId
      state.creationTime = initialState.creationTime
      state.status = initialState.status
    }
  },
})


export const { 
  setFilters,
  resetFilters,
} = filtersSlice.actions


export default filtersSlice.reducer
