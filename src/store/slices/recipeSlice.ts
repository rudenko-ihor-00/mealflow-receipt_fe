import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Recipe, RecipeState, RecipeFilters } from "../../types";
import { mockRecipes } from "../../utils/mockData";

const initialState: RecipeState = {
  recipes: [],
  currentRecipe: null,
  favorites: [],
  filters: {
    cuisine: "",
    difficulty: "",
    maxTime: undefined,
    tags: [],
    search: "",
  },
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
};

// Async thunk for fetching recipes (simulating API call)
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const state = getState() as { recipes: RecipeState };
      const { filters, pagination } = state.recipes;

      let filteredRecipes = [...mockRecipes];

      // Apply filters
      if (filters.search) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) =>
            recipe.title
              .toLowerCase()
              .includes(filters.search!.toLowerCase()) ||
            recipe.description
              .toLowerCase()
              .includes(filters.search!.toLowerCase()) ||
            recipe.tags.some((tag) =>
              tag.toLowerCase().includes(filters.search!.toLowerCase())
            )
        );
      }

      if (filters.cuisine) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.cuisine === filters.cuisine
        );
      }

      if (filters.difficulty) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.difficulty === filters.difficulty
        );
      }

      if (filters.maxTime) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.prepTime + recipe.cookTime <= filters.maxTime!
        );
      }

      if (filters.tags && filters.tags.length > 0) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          filters.tags!.some((tag) => recipe.tags.includes(tag))
        );
      }

      // Apply pagination
      const total = filteredRecipes.length;
      const totalPages = Math.ceil(total / pagination.limit);
      const startIndex = (pagination.page - 1) * pagination.limit;
      const endIndex = startIndex + pagination.limit;
      const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

      return {
        recipes: paginatedRecipes,
        total,
        totalPages,
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch recipes");
    }
  }
);

// Async thunk for fetching single recipe
export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const recipe = mockRecipes.find((r) => r.id === id);

      if (!recipe) {
        throw new Error("Recipe not found");
      }

      return recipe;
    } catch (error) {
      return rejectWithValue("Failed to fetch recipe");
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setCurrentRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.currentRecipe = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const recipeId = action.payload;
      const index = state.favorites.indexOf(recipeId);

      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(recipeId);
      }
    },
    setFilters: (state, action: PayloadAction<Partial<RecipeFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {
        cuisine: "",
        difficulty: "",
        maxTime: undefined,
        tags: [],
        search: "",
      };
      state.pagination.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload.recipes;
        state.pagination.total = action.payload.total;
        state.pagination.totalPages = action.payload.totalPages;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentRecipe,
  toggleFavorite,
  setFilters,
  clearFilters,
  setPage,
  setLimit,
} = recipeSlice.actions;

export default recipeSlice.reducer;
