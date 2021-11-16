import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: [],
};

export const Trending = createSlice({
  name: "trending",
  initialState,
  reducers: {
    AddTrendingMedia: (state, action) => {
      state.value.splice(0, 1, action.payload);
    },
  },
});

export const { AddTrendingMedia } = Trending.actions;

export default Trending.reducer;
