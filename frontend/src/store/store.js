// Import configureStore function from Redux Toolkit
// This function helps us create the central Redux store
import { configureStore } from '@reduxjs/toolkit'

// Import the user slice (state + actions) from userSlice file
import userReducer from './userSlice'

// Create and export the Redux store
// The store holds all application states in one place
export const store = configureStore({
  // reducer is an object that contains all slices
  reducer: {
    // 'user' is the state name, and userReducer controls that state
    user: userReducer
  },
})
