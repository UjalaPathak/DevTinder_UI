import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeedData: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      if (!state) return state; // do nothing if null since initialstate is null
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeedData, removeUserFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
