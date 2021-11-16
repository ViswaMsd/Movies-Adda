import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from "../features/Trending";

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
  },
});
