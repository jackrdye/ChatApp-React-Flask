import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPostsAPI, fetchPostDetailAPI, createPostAPI } from './discussionAPI'

const initialState = { 
  status: 'idle',
  posts: [],
  currentPost: {}
}

export const fetchAllPosts= createAsyncThunk(
  'discussion/fetchAllPosts', 
  async (searchRequests) => {
    const response = await fetchAllPostsAPI(searchRequests)
    return response
  }
)

export const fetchPostDetail = createAsyncThunk(
  'discussion/fetchPostDetail', 
  async (postID) => {
    const response = await fetchPostDetailAPI(postID)
    return response
  }
)

export const createPost = createAsyncThunk(
  'discussion/createPost', 
  async (postDetails) => {
    const response = await createPostAPI(postDetails)
    return response
  }
)

export const fetchTags = createAsyncThunk(
  'discussion '
)



export const discussionSlice = createSlice({
  name: 'discussion',
  initialState: initialState,
  reducers: {  
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase()

  //     .addCase()


  // }



})


export default discussionSlice.reducer