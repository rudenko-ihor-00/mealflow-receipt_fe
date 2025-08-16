import { Recipe, User, RecipeFilters } from "../../types";

class LocalStorageService {
  private readonly KEYS = {
    USER: "mealflow_user",
    TOKEN: "mealflow_token",
    FAVORITES: "mealflow_favorites",
    SEARCH_HISTORY: "mealflow_search_history",
    RECENT_SEARCHES: "mealflow_recent_searches",
    FILTERS: "mealflow_filters",
    THEME: "mealflow_theme",
    LANGUAGE: "mealflow_language",
  };

  // User management
  setUser(user: User): void {
    try {
      localStorage.setItem(this.KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save user to localStorage:", error);
    }
  }

  getUser(): User | null {
    try {
      const user = localStorage.getItem(this.KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to get user from localStorage:", error);
      return null;
    }
  }

  removeUser(): void {
    try {
      localStorage.removeItem(this.KEYS.USER);
    } catch (error) {
      console.error("Failed to remove user from localStorage:", error);
    }
  }

  // Token management
  setToken(token: string): void {
    try {
      localStorage.setItem(this.KEYS.TOKEN, token);
    } catch (error) {
      console.error("Failed to save token to localStorage:", error);
    }
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.KEYS.TOKEN);
    } catch (error) {
      console.error("Failed to get token from localStorage:", error);
      return null;
    }
  }

  removeToken(): void {
    try {
      localStorage.removeItem(this.KEYS.TOKEN);
    } catch (error) {
      console.error("Failed to remove token from localStorage:", error);
    }
  }

  // Favorites management
  setFavorites(recipeIds: string[]): void {
    try {
      localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(recipeIds));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }

  getFavorites(): string[] {
    try {
      const favorites = localStorage.getItem(this.KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("Failed to get favorites from localStorage:", error);
      return [];
    }
  }

  addFavorite(recipeId: string): void {
    try {
      const favorites = this.getFavorites();
      if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        this.setFavorites(favorites);
      }
    } catch (error) {
      console.error("Failed to add favorite to localStorage:", error);
    }
  }

  removeFavorite(recipeId: string): void {
    try {
      const favorites = this.getFavorites();
      const updatedFavorites = favorites.filter((id) => id !== recipeId);
      this.setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Failed to remove favorite from localStorage:", error);
    }
  }

  // Search history management
  setSearchHistory(searches: string[]): void {
    try {
      localStorage.setItem(this.KEYS.SEARCH_HISTORY, JSON.stringify(searches));
    } catch (error) {
      console.error("Failed to save search history to localStorage:", error);
    }
  }

  getSearchHistory(): string[] {
    try {
      const history = localStorage.getItem(this.KEYS.SEARCH_HISTORY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error("Failed to get search history from localStorage:", error);
      return [];
    }
  }

  addSearchToHistory(search: string): void {
    try {
      const history = this.getSearchHistory();
      const trimmedSearch = search.trim();

      if (trimmedSearch && !history.includes(trimmedSearch)) {
        history.unshift(trimmedSearch);
        // Keep only last 20 searches
        if (history.length > 20) {
          history.splice(20);
        }
        this.setSearchHistory(history);
      }
    } catch (error) {
      console.error("Failed to add search to history:", error);
    }
  }

  clearSearchHistory(): void {
    try {
      localStorage.removeItem(this.KEYS.SEARCH_HISTORY);
    } catch (error) {
      console.error("Failed to clear search history:", error);
    }
  }

  // Recent searches management
  setRecentSearches(searches: string[]): void {
    try {
      localStorage.setItem(this.KEYS.RECENT_SEARCHES, JSON.stringify(searches));
    } catch (error) {
      console.error("Failed to save recent searches to localStorage:", error);
    }
  }

  getRecentSearches(): string[] {
    try {
      const searches = localStorage.getItem(this.KEYS.RECENT_SEARCHES);
      return searches ? JSON.parse(searches) : [];
    } catch (error) {
      console.error("Failed to get recent searches from localStorage:", error);
      return [];
    }
  }

  addRecentSearch(search: string): void {
    try {
      const searches = this.getRecentSearches();
      const trimmedSearch = search.trim();

      if (trimmedSearch) {
        // Remove if already exists
        const filteredSearches = searches.filter((s) => s !== trimmedSearch);
        // Add to beginning
        filteredSearches.unshift(trimmedSearch);
        // Keep only last 10 searches
        if (filteredSearches.length > 10) {
          filteredSearches.splice(10);
        }
        this.setRecentSearches(filteredSearches);
      }
    } catch (error) {
      console.error("Failed to add recent search:", error);
    }
  }

  // Filters management
  setFilters(filters: RecipeFilters): void {
    try {
      localStorage.setItem(this.KEYS.FILTERS, JSON.stringify(filters));
    } catch (error) {
      console.error("Failed to save filters to localStorage:", error);
    }
  }

  getFilters(): RecipeFilters {
    try {
      const filters = localStorage.getItem(this.KEYS.FILTERS);
      return filters ? JSON.parse(filters) : {};
    } catch (error) {
      console.error("Failed to get filters from localStorage:", error);
      return {};
    }
  }

  // Theme management
  setTheme(theme: "light" | "dark"): void {
    try {
      localStorage.setItem(this.KEYS.THEME, theme);
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  }

  getTheme(): "light" | "dark" {
    try {
      return (
        (localStorage.getItem(this.KEYS.THEME) as "light" | "dark") || "light"
      );
    } catch (error) {
      console.error("Failed to get theme from localStorage:", error);
      return "light";
    }
  }

  // Language management
  setLanguage(language: string): void {
    try {
      localStorage.setItem(this.KEYS.LANGUAGE, language);
    } catch (error) {
      console.error("Failed to save language to localStorage:", error);
    }
  }

  getLanguage(): string {
    try {
      return localStorage.getItem(this.KEYS.LANGUAGE) || "uk";
    } catch (error) {
      console.error("Failed to get language from localStorage:", error);
      return "uk";
    }
  }

  // Clear all data
  clearAll(): void {
    try {
      Object.values(this.KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  }

  // Check if localStorage is available
  isAvailable(): boolean {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}

export const localStorageService = new LocalStorageService();
export default localStorageService;
