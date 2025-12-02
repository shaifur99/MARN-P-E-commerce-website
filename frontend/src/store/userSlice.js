// Import createSlice from Redux Toolkit
// createSlice helps us create state, actions, and reducers easily
import { createSlice } from '@reduxjs/toolkit'

// Initial state of this slice
// Here we store user information (by default it's null)
const initialState = {
    user: null
}

// Create a slice named "user"
// This slice contains the state and functions to update that state
export const userSlice = createSlice({
    name: 'user',           // Slice name
    initialState,           // Default state
    reducers: {
        // Function to update user details
        // action.payload will contain the user data we send
        setUserDetails: (state, action) => {
            state.user = action.payload  // Save new user data into state
        }
    },
})

// Export the action so we can use it in components
export const { setUserDetails } = userSlice.actions

// Export the reducer so it can be added to the store
export default userSlice.reducer
