import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Search,
  X,
  ChevronDown,
  Clock,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchRecipes,
  setFilters,
  clearFilters,
  setPage,
} from "../store/slices/recipeSlice";
import RecipeCard from "../components/ui/RecipeCard";
import Layout from "../components/layout/Layout";
import { mockCuisines, mockTags } from "../utils/mockData";

const RecipesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    search: "",
    cuisine: "",
    difficulty: "",
    maxTime: "",
    tags: [] as string[],
  });

  const dispatch = useAppDispatch();
  const { recipes, isLoading, error, filters, pagination } = useAppSelector(
    (state) => state.recipes,
  );

  // Initialize filters from URL params
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const cuisine = searchParams.get("cuisine") || "";
    const difficulty = searchParams.get("difficulty") || "";
    const maxTime = searchParams.get("maxTime") || "";
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];

    setLocalFilters({ search, cuisine, difficulty, maxTime, tags });

    dispatch(
      setFilters({
        search,
        cuisine,
        difficulty,
        maxTime: maxTime ? parseInt(maxTime) : undefined,
        tags,
      }),
    );
  }, [searchParams, dispatch]);

  // Fetch recipes when filters change
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch, filters, pagination.page]);

  const handleFilterChange = (key: string, value: string | string[]) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    const newSearchParams = new URLSearchParams();

    if (localFilters.search) newSearchParams.set("search", localFilters.search);
    if (localFilters.cuisine)
      newSearchParams.set("cuisine", localFilters.cuisine);
    if (localFilters.difficulty)
      newSearchParams.set("difficulty", localFilters.difficulty);
    if (localFilters.maxTime)
      newSearchParams.set("maxTime", localFilters.maxTime);
    if (localFilters.tags.length > 0)
      newSearchParams.set("tags", localFilters.tags.join(","));

    setSearchParams(newSearchParams);
    dispatch(setPage(1)); // Reset to first page
  };

  const clearAllFilters = () => {
    setLocalFilters({
      search: "",
      cuisine: "",
      difficulty: "",
      maxTime: "",
      tags: [],
    });
    setSearchParams({});
    dispatch(clearFilters());
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = localFilters.tags.includes(tag)
      ? localFilters.tags.filter((t) => t !== tag)
      : [...localFilters.tags, tag];
    handleFilterChange("tags", newTags);
  };

  const activeFiltersCount = Object.values(localFilters).filter((value) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  ).length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Рецепти</h1>
          <p className="text-gray-600">
            Знайдіть ідеальний рецепт для будь-якої події
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Пошук рецептів..."
                value={localFilters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="btn-secondary inline-flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Фільтри
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-primary-500 text-white text-xs rounded-full px-2 py-1">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Apply Filters Button */}
            <button onClick={applyFilters} className="btn-primary">
              Застосувати
            </button>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600">Активні фільтри:</span>
                {localFilters.cuisine && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                    Кухня: {localFilters.cuisine}
                    <button
                      onClick={() => handleFilterChange("cuisine", "")}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {localFilters.difficulty && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                    Складність: {localFilters.difficulty}
                    <button
                      onClick={() => handleFilterChange("difficulty", "")}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {localFilters.maxTime && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                    Час: до {localFilters.maxTime} хв
                    <button
                      onClick={() => handleFilterChange("maxTime", "")}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {localFilters.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Очистити всі
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Cuisine Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Кухня
                  </label>
                  <select
                    value={localFilters.cuisine}
                    onChange={(e) =>
                      handleFilterChange("cuisine", e.target.value)
                    }
                    className="input-field"
                  >
                    <option value="">Всі кухні</option>
                    {mockCuisines.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Складність
                  </label>
                  <select
                    value={localFilters.difficulty}
                    onChange={(e) =>
                      handleFilterChange("difficulty", e.target.value)
                    }
                    className="input-field"
                  >
                    <option value="">Будь-яка</option>
                    <option value="easy">Легко</option>
                    <option value="medium">Середньо</option>
                    <option value="hard">Складно</option>
                  </select>
                </div>

                {/* Max Time Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Максимальний час (хв)
                  </label>
                  <input
                    type="number"
                    placeholder="Необмежено"
                    value={localFilters.maxTime}
                    onChange={(e) =>
                      handleFilterChange("maxTime", e.target.value)
                    }
                    className="input-field"
                    min="0"
                  />
                </div>

                {/* Tags Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Теги
                  </label>
                  <div className="max-h-32 overflow-y-auto">
                    {mockTags.map((tag) => (
                      <label key={tag} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={localFilters.tags.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {tag}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Знайдено {pagination.total} рецептів</p>
          {isLoading && (
            <div className="flex items-center text-primary-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
              Завантаження...
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Recipes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Рецептів не знайдено
            </h3>
            <p className="text-gray-600 mb-4">
              Спробуйте змінити фільтри або пошуковий запит
            </p>
            <button onClick={clearAllFilters} className="btn-primary">
              Очистити фільтри
            </button>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Попередня
              </button>

              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg ${
                    page === pagination.page
                      ? "bg-primary-500 text-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Наступна
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecipesPage;
