import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Mock user data
const mockUser: User = {
  id: "1",
  email: "user@example.com",
  name: "Demo User",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  favorites: [],
  createdAt: "2024-01-01T00:00:00Z",
};

// Async thunk for login (simulating API call)
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication logic
      if (
        credentials.email === "user@example.com" &&
        credentials.password === "password"
      ) {
        const token = "mock-jwt-token-" + Date.now();
        return { user: mockUser, token };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      return rejectWithValue("Invalid email or password");
    }
  },
);

// Async thunk for logout
export const logout = createAsyncThunk("auth/logout", async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return null;
});

// Async thunk for getting current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if user is logged in (in real app, this would verify JWT token)
      const token = localStorage.getItem("token");
      if (token) {
        return { user: mockUser, token };
      } else {
        throw new Error("No token found");
      }
    } catch (error) {
      return rejectWithValue("User not authenticated");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (state.user && !state.user.favorites.includes(action.payload)) {
        state.user.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.favorites = state.user.favorites.filter(
          (id) => id !== action.payload,
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        // Store token in localStorage
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;

        // Remove token from localStorage
        localStorage.removeItem("token");
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;

        // Remove invalid token from localStorage
        localStorage.removeItem("token");
      });
  },
});

export const { clearError, updateUser, addToFavorites, removeFromFavorites } =
  authSlice.actions;

export default authSlice.reducer;
