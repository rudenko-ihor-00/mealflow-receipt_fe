import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import recipeReducer from "./slices/recipeSlice";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
