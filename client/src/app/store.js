import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import profileReducer from '../features/profile/profileSlice'
import discussionReducer from '../features/discussion/discussionSlice'
import chatReducer from '../features/chat/chatSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profile: profileReducer,
    discussion: discussionReducer, 
    chat: chatReducer
  },
});
