import { createSlice } from '@reduxjs/toolkit'

export const graphData = createSlice({
  name: 'graphData',
  initialState: {
    channel: null,
    channelName: null,
    deviceGid: null,
    deviceName: null,
  },
  reducers: {
    SelectedChannel: (state, action) => {
      state.channel = action.payload;
    },
    SelectedChannelName: (state, action) => {
      state.channelName = action.payload;
    },
    SelectedDevice: (state, action) => {
      state.deviceGid = action.payload;
    },
    SelectedDeviceName: (state, action) => {
      state.deviceName = action.payload;
    }
  },
})

export const { SelectedChannel, SelectedChannelName, SelectedDevice, SelectedDeviceName } = graphData.actions;

export default graphData.reducer