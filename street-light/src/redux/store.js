import { configureStore } from '@reduxjs/toolkit'
import { lightSlice } from './lightStatus'
import { lightData } from './lightData'

export default configureStore({
  reducer: {
    light: lightSlice.reducer,
    l_Data: lightData.reducer, 
  },
})