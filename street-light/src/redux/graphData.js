import { createSlice } from '@reduxjs/toolkit'

export const graphData = createSlice({
  name: 'graphData',
  initialState: {
    channel: 1,
    deviceGid: 146684
  },
  reducers: {
    SelectedChannel: (state, action) => {
      state.channel = action.payload;
    },
    SelectedDevice: (state, action) => {
      state.deviceGid = action.payload;
    }
  },
})

export const { SelectedChannel, SelectedDevice } = graphData.actions

export default graphData.reducer