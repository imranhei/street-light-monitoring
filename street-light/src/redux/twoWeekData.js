import { createSlice } from '@reduxjs/toolkit'

export const twoWeekData = createSlice({
  name: 'twoWeek',
  initialState: {
    value: null,
  },
  reducers: {
    setTwoWeekData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setTwoWeekData } = twoWeekData.actions

export default twoWeekData.reducer;