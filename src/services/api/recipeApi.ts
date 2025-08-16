import axios from "axios";
import {
  Recipe,
  RecipeFilters,
  PaginatedResponse,
  ApiResponse,
} from "../../types";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Recipe API endpoints
export const recipeApi = {
  // Get all recipes with filters and pagination
  getRecipes: async (
    filters: RecipeFilters,
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<Recipe>> => {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.cuisine) params.append("cuisine", filters.cuisine);
    if (filters.difficulty) params.append("difficulty", filters.difficulty);
    if (filters.maxTime) params.append("maxTime", filters.maxTime.toString());
    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach((tag) => params.append("tags", tag));
    }

    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const response = await api.get<PaginatedResponse<Recipe>>(
      `/recipes?${params.toString()}`
    );
    return response.data;
  },

  // Get recipe by ID
  getRecipeById: async (id: string): Promise<Recipe> => {
    const response = await api.get<ApiResponse<Recipe>>(`/recipes/${id}`);
    return response.data.data;
  },

  // Create new recipe
  createRecipe: async (
    recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">
  ): Promise<Recipe> => {
    const response = await api.post<ApiResponse<Recipe>>("/recipes", recipe);
    return response.data.data;
  },

  // Update recipe
  updateRecipe: async (
    id: string,
    recipe: Partial<Recipe>
  ): Promise<Recipe> => {
    const response = await api.put<ApiResponse<Recipe>>(
      `/recipes/${id}`,
      recipe
    );
    return response.data.data;
  },

  // Delete recipe
  deleteRecipe: async (id: string): Promise<void> => {
    await api.delete(`/recipes/${id}`);
  },

  // Get recipes by cuisine
  getRecipesByCuisine: async (
    cuisine: string,
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<Recipe>> => {
    const response = await api.get<PaginatedResponse<Recipe>>(
      `/recipes/cuisine/${cuisine}?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  // Get recipes by tags
  getRecipesByTags: async (
    tags: string[],
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<Recipe>> => {
    const params = new URLSearchParams();
    tags.forEach((tag) => params.append("tags", tag));
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const response = await api.get<PaginatedResponse<Recipe>>(
      `/recipes/tags?${params.toString()}`
    );
    return response.data;
  },

  // Search recipes
  searchRecipes: async (
    query: string,
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<Recipe>> => {
    const response = await api.get<PaginatedResponse<Recipe>>(
      `/recipes/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    return response.data;
  },

  // Get popular recipes
  getPopularRecipes: async (limit: number = 10): Promise<Recipe[]> => {
    const response = await api.get<ApiResponse<Recipe[]>>(
      `/recipes/popular?limit=${limit}`
    );
    return response.data.data;
  },

  // Get recent recipes
  getRecentRecipes: async (limit: number = 10): Promise<Recipe[]> => {
    const response = await api.get<ApiResponse<Recipe[]>>(
      `/recipes/recent?limit=${limit}`
    );
    return response.data.data;
  },

  // Toggle favorite recipe
  toggleFavorite: async (recipeId: string): Promise<void> => {
    await api.post(`/recipes/${recipeId}/favorite`);
  },

  // Get user favorites
  getFavorites: async (
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<Recipe>> => {
    const response = await api.get<PaginatedResponse<Recipe>>(
      `/recipes/favorites?page=${page}&limit=${limit}`
    );
    return response.data;
  },
};

// Export the api instance for other services
export default api;
