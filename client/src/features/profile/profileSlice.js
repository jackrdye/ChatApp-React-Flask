import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerAPI, loginAPI } from "./profileAPI";


let initialState = JSON.parse(localStorage.getItem("profile"))
if (initialState === null) {
  initialState = {
    isLoggedIn: false,
    isAdmin: false
  }
} 
console.log(initialState)


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
      state = {
      isLoggedIn: false,
      isAdmin: false
    }
    localStorage.setItem("profile", JSON.stringify(state))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
      })

      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.result === "success") {
          state.isLoggedIn = true
        } 
        localStorage.setItem("profile", JSON.stringify(state))
      })
  }
})

export const selectIsLoggedIn = state => state.profile.isLoggedIn

export const { resetProfile } = profileSlice.actions


export default profileSlice.reducer