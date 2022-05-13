import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPostsAPI, fetchPostDetailAPI, createPostAPI, upvotePostAPI, downvotePostAPI, replyToPostAPI } from './discussionAPI'

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

export const upvotePost = createAsyncThunk(
  'discussion/upvotePost', 
  async (postID) => {
    const response = await upvotePostAPI(postID)
    return response
  }
)

export const downvotePost = createAsyncThunk(
  'discussion/downvotePost', 
  async (postID) => {
    const response = await downvotePostAPI(postID)
    return response
  }
)

export const replyToPost = createAsyncThunk(
  'discussion/replyToPost',
  async (replyDetails) => {
    const response = await replyToPostAPI(replyDetails)
    return response
  }
)



export const discussionSlice = createSlice({
  name: 'discussion',
  initialState: initialState,
  reducers: {  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        if (action.payload.result === "success" ) { //&& state.status === "idle"
          state.posts = action.payload.posts
          state.status = "loaded"
        }
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.currentPost = action.payload.post
      })

      .addCase(createPost.fulfilled, (state, action) => {
        if (action.payload.result === "success") {
          console.log(action.payload)
          state.posts.unshift({post_id: action.payload.postID, title: action.payload.title})
        }
      })

      .addCase(upvotePost.fulfilled, (state) => {
        state.currentPost.upvotes += 1
      })
      .addCase(downvotePost.fulfilled, (state) => {
        state.currentPost.upvotes -= 1
      })

      .addCase(replyToPost.fulfilled, (state, action) => {
        if (action.payload.comment !== undefined) {
          state.currentPost.comments.unshift(action.payload.comment)
          console.log(action.payload)
        }
      })



  }



})


export default discussionSlice.reducer