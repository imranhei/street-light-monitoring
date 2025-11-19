import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './loginData'
import { graphData } from './graphData'
import { twoWeekData } from './twoWeekData'
import { alarmSlice } from './alarm-slice'
import milesightSlice from './milesight-slice'
import batterySlice from './battery-slice'
import logsSlice from './logs-slice'
import temperatureSlice from './temperature-slice'

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
    graph: graphData.reducer,
    twoWeek: twoWeekData.reducer,
    alarm: alarmSlice.reducer,
    battery: batterySlice,
    milesight: milesightSlice,
    logs: logsSlice,
    temperature: temperatureSlice,
  },
})