import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: localStorage.getItem('accessToken')
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setToken } = loginSlice.actions

export default loginSlice.reducer;