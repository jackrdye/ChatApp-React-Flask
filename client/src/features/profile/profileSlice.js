import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerAPI, loginAPI } from "./profileAPI";

const initialState = {
  isLoggedIn: false,
  isAdmin: false
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

  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        
      })

      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.result === "success") {
          state.isLoggedIn = true
        } 
      })
  }
})

export const selectIsLoggedIn = state => state.profile.isLoggedIn

export default profileSlice.reducer