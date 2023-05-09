import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: {
      email: "imran@gmail.com",
      pass: 'Ventia12',
      islogin: false
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