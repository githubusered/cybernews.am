// src/redux/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state of auth
const initialState = {
  user: null,  // User data will be stored here
  token: null, // JWT token will be stored here
  isAuthenticated: false, // Track whether the user is authenticated
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user and token (login)
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    // Update user data (after editing profile, etc.)
    updateUser(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload, // Merge the updated data
        };
      }
    },
    // Clear user data and token (logout)
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
