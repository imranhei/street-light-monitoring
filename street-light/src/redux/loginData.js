import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: {
      token: localStorage.getItem('accessToken'),
      id: localStorage.getItem('ID')
    }
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setValue } = loginSlice.actions

export default loginSlice.reducer;