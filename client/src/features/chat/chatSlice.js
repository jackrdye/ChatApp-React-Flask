import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllChatsAPI, sendGroupMessageAPI, recieveGroupMessagesAPI } from "./chatAPI";

const initialState = {
  chats: [],
  status: 'idle'
}

// ----------------------------------------------------------------------------------
// AsyncThunks - fetch & post data 
export const fetchAllChats = createAsyncThunk(
  'chat/fetchAllChats',
  async () => {
    const response = await fetchAllChatsAPI()
    return response.data
  }
)

export const sendGroupMessage = createAsyncThunk(
  'chat/sendGroupMessage',
  async (groupName, message) => {
    const response = await sendGroupMessageAPI(groupName, message)
    return response.data
  }
)

export const recieveGroupMessages = createAsyncThunk(
  'chat/recieveGroupMessage',
  async (groupName) => {
    const response = await recieveGroupMessagesAPI(groupName)
    return response.data
  }
)


// ----------------------------------------------------------------------------------
// Create Slice
export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    // 
  },  
  extraReducers: (builder) => {
    builder
      // Handle fetchAllChats
      .addCase(fetchAllChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllChats.fulfilled, (state, action) => {
        state.status = 'complete';
        state.chats = action.payload // should make chats: [] = chats: [{name: info222, ...}, {name...}]
      })
      // Handle sendGroupMessage
      .addCase(sendGroupMessage.fulfilled, (state, action) => {
        state.chats.push(action.payload)
        // TODO: - Update correct group with new message 
      })
      // Handle recieveGroupMessage
      .addCase(recieveGroupMessages.fulfilled, (state, action) => {
        // state.chats
        // TODO: - Update correct group with new messages
      })
          
  }
})

// Fetch messages
// Add message
// Add group 

// ----------------------------------------------------------------------------------
// Selectors



export default chatSlice.reducer