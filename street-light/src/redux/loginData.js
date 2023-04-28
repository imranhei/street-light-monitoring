import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: {
      username: "imran",
      pass: '1234',
      islogin: true
    },
  },
  reducers: {
    logIn: (state) => {
      state.value.islogin = true
    },
    logOut: (state) => {
      state.value.islogin = false
    },

  },
})

export const { logIn, logOut } = loginSlice.actions

export default loginSlice.reducer;