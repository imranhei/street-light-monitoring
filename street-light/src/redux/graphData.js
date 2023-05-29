import { createSlice } from '@reduxjs/toolkit'

export const graphData = createSlice({
  name: 'graphData',
  initialState: {
    channel: 1,
    deviceGid: 146684
  },
  reducers: {
    SelectedGraphData: (state, action) => {
      const { channel, deviceGid } = action.payload;
      state.channel = channel;
      state.deviceGid = deviceGid;
    },
    SelectedDevice: (state, action) => {
      state.deviceGid = action.payload;
    }
  },
})

export const { SelectedGraphData, SelectedDevice } = graphData.actions

export default graphData.reducer