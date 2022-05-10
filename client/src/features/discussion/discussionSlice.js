import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPostsAPI, fetchPostDetailAPI, createPostAPI } from './discussionAPI'

const initialState = {
  'sortBy': 'relevance' // relevance || latest || earliest || upvotes
}

export const fetchAllPosts= createAsyncThunk(
  'discussion/fetchAllPosts', 
  async () => {
    const response = await fetchAllPostsAPI()

    return response.data
  }
)

export const fetchPostDetail = createAsyncThunk(
  'discussion/fetchPostDetail', 
  async () => {
    const response = await fetchPostDetailAPI()

    return response.data
  }
)

export const createPost = createAsyncThunk(
  'discussion/createPost', 
  async (title, body, tags) => {
    const response = await createPostAPI(title, body, tags)

    return response.data
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