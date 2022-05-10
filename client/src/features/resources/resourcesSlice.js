import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  'lectures': [
    'Lecture 1', 
    'Lecture 2', 
    'Lecture 3', 
  ],
  'tutorials': [
    'Tutorial 1',
    'Tutorial 2',  
    'Tutorial 3'      
  ],
  'content': []
}

export const resouceSlice = createSlice({
  name: 'resources',
  initialState: initialState

})




