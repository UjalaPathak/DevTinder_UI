import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import feedReducer from "../slice/feedSlice";
import connectionReducer from "../slice/connectionSlice";
import requestReducer from "../slice/requestSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer,
  },
});
