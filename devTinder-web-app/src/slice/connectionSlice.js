import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "ConnectionList",
  initialState: null,
  reducers: {
    listConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: () => null,
  },
});

export const { listConnection } = connectionSlice.actions;

export default connectionSlice.reducer;
