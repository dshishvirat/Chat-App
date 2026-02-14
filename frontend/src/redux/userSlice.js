import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: [],
    selectedUser: null,
    onlineUsers: [],
    justLoggedIn: false,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.justLoggedIn = false;
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    setJustLoggedIn: (state, action) => {
      state.justLoggedIn = action.payload;
    },
  },
});

export const {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
  setOnlineUsers,
  setJustLoggedIn,
} = userSlice.actions;

export default userSlice.reducer;
