import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockCuisines, mockTags } from "../../utils/mockData";

interface SearchState {
  searchHistory: string[];
  suggestions: string[];
  recentSearches: string[];
  popularSearches: string[];
  isLoading: false;
}

const initialState: SearchState = {
  searchHistory: [],
  suggestions: [],
  recentSearches: [],
  popularSearches: [
    "паста",
    "салат",
    "десерт",
    "суп",
    "м'ясо",
    "морепродукти",
    "італійська кухня",
    "українська кухня",
  ],
  isLoading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.trim();
      if (searchTerm && !state.searchHistory.includes(searchTerm)) {
        state.searchHistory.unshift(searchTerm);
        // Keep only last 10 searches
        if (state.searchHistory.length > 10) {
          state.searchHistory = state.searchHistory.slice(0, 10);
        }
      }
    },
    addToRecentSearches: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.trim();
      if (searchTerm) {
        // Remove if already exists
        state.recentSearches = state.recentSearches.filter(
          (term) => term !== searchTerm,
        );
        // Add to beginning
        state.recentSearches.unshift(searchTerm);
        // Keep only last 5 searches
        if (state.recentSearches.length > 5) {
          state.recentSearches = state.recentSearches.slice(0, 5);
        }
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    removeFromSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter(
        (term) => term !== action.payload,
      );
    },
    removeFromRecentSearches: (state, action: PayloadAction<string>) => {
      state.recentSearches = state.recentSearches.filter(
        (term) => term !== action.payload,
      );
    },
  },
});

export const {
  addToSearchHistory,
  addToRecentSearches,
  clearSearchHistory,
  clearRecentSearches,
  setSuggestions,
  clearSuggestions,
  removeFromSearchHistory,
  removeFromRecentSearches,
} = searchSlice.actions;

export default searchSlice.reducer;
