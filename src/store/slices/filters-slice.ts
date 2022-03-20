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
  },
})


export const { 
  setFilters,
} = filtersSlice.actions


export default filtersSlice.reducer
