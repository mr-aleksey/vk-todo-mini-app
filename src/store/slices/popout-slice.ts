import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface PopoutSlice {
  popout: any
}


const initialState: PopoutSlice = {
  popout: null,
}


export const popoutSlice = createSlice({
  name: 'popout',
  initialState,
  reducers: {
    openPopout: (state, action) => {
      state.popout = action.payload
    },
    closePopout: (state) => {
      state.popout = null
    },
  },
})


export const { 
  openPopout,
  closePopout,
} = popoutSlice.actions


export default popoutSlice.reducer
