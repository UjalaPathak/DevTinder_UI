import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
    updateProfile: (state, action) => {
      console.log("action.payload", action.payload);
      return action.payload;
    },
  },
});

export const { addUser, removeUser, updateProfile } = userSlice.actions;

export default userSlice.reducer;
