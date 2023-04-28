import { createSlice } from '@reduxjs/toolkit'

export const lightSlice = createSlice({
  name: 'light',
  initialState: {
    value: "OFF",
  },
  reducers: {
    selectedLight: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { selectedLight } = lightSlice.actions

export default lightSlice.reducer