// Store/Slices/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  priceRange: [0, 60000],
  ratings: [],
  searchQuery: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setFilters, setSearchQuery, resetFilters } = filterSlice.actions;

export const selectFilters = (state) => state.filters;
export const selectSearchQuery = (state) => state.filters.searchQuery;

export default filterSlice.reducer;
