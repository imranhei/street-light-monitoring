import { configureStore } from '@reduxjs/toolkit'
import { lightSlice } from './lightStatus'
import { loginSlice } from './loginData'
import { graphData } from './graphData'
import { twoWeekData } from './twoWeekData'

export default configureStore({
  reducer: {
    light: lightSlice.reducer,
    login: loginSlice.reducer,
    graph: graphData.reducer,
    twoWeek: twoWeekData.reducer,
  },
})