import { createSlice } from '@reduxjs/toolkit'

export const lightData = createSlice({
  name: 'lightData',
  initialState: {
    value: [],
  },
  reducers: {
    selectedLightData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { selectedLightData } = lightData.actions

export default lightData.reducer