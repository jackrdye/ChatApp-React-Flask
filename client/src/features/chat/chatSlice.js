import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllChatsAPI, sendGroupMessageAPI, recieveGroupMessagesAPI } from "./chatAPI";

const initialState = {
  messages: [],
  status: 'idle'
}

// ----------------------------------------------------------------------------------
// AsyncThunks - fetch & post data 
export const fetchAllChats = createAsyncThunk(
  'chat/fetchAllChats',
  async () => {
    const response = await fetchAllChatsAPI()
    return response
  }
) 

export const sendGroupMessage = createAsyncThunk(
  'chat/sendGroupMessage',
  async ({messageDetails}) => {
    const response = await sendGroupMessageAPI(messageDetails)
    return response
  }
)

export const recieveGroupMessages = createAsyncThunk(
  'chat/recieveGroupMessage',
  async (groupName) => {
    const response = await recieveGroupMessagesAPI(groupName)
    return response
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
      // .addCase(fetchAllChats.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchAllChats.fulfilled, (state, action) => {
      //   state.status = 'complete';
      //   state.chats = action.payload // should make chats: [] = chats: [{name: info222, ...}, {name...}]
      // })
      // Handle sendGroupMessage
      .addCase(sendGroupMessage.fulfilled, (state, action) => {
        state.messages.push({sender: action.payload.sender, message: action.payload.message})
        // TODO: - Update correct group with new message 
      })
      // Handle recieveGroupMessage
      .addCase(recieveGroupMessages.fulfilled, (state, action) => {
        state.messages.push(action.payload)
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