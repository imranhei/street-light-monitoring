import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './loginData'
import { graphData } from './graphData'
import { twoWeekData } from './twoWeekData'
import { alarmSlice } from './alarm-slice'
import milesightSlice from './milesight-slice'

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
    graph: graphData.reducer,
    twoWeek: twoWeekData.reducer,
    alarm: alarmSlice.reducer,
    milesight: milesightSlice
  },
})