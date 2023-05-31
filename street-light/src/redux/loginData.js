import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: null,
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setValue } = loginSlice.actions

export default loginSlice.reducer;