import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerAPI, loginAPI } from "./profileAPI";
import Cookies from 'universal-cookie'
const cookies = new Cookies();


let initialState = JSON.parse(localStorage.getItem("profile"))
if (initialState === null) {
  initialState = {
    isLoggedIn: false,
    isAdmin: false,
    sessionKey: "",
    username: ""
  }
} 

// Async Thunks - 
export const login = createAsyncThunk(
  'profile/login',
  async (userDetails) => {
    const response = await loginAPI(userDetails)
    return response
  }
)

export const register = createAsyncThunk(
  'profile/register',
  async (userDetails) => {
    const response = await registerAPI(userDetails)
    return response
  }
)



export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    loggedIn: (state) => {state.isLoggedIn = true},
    loggedOut: (state) => {state.isLoggedIn = false},
    resetProfile: (state) => {
      state.isLoggedIn = false
      state.isAdmin = false
      state.username = ""
      state.session_cookie = ""
      localStorage.setItem("profile", JSON.stringify(state))
      cookies.remove("session_key")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
      })

      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.result === "success") {
          state.isLoggedIn = true
          state.sessionKey = action.payload.session_cookie
          state.username = action.payload.username
          cookies.set("session_key", action.payload.session_cookie)
        } 
        localStorage.setItem("profile", JSON.stringify(state))
      })
  }
})

export const selectIsLoggedIn = state => state.profile.isLoggedIn

export const { resetProfile } = profileSlice.actions


export default profileSlice.reducer