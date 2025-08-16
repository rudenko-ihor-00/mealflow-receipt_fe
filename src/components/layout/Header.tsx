import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  addToSearchHistory,
  addToRecentSearches,
} from "../../store/slices/searchSlice";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { searchHistory, recentSearches, popularSearches } = useAppSelector(
    (state) => state.search,
  );

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      dispatch(addToSearchHistory(term));
      dispatch(addToRecentSearches(term));
      navigate(`/recipes?search=${encodeURIComponent(term)}`);
      setIsSearchOpen(false);
      setSearchValue("");
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setShowSuggestions(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300"
            >
              <span className="text-white font-bold text-xl">M</span>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                MealFlow
              </h1>
              <p className="text-sm text-gray-500 -mt-1">Рецепти для життя</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
            >
              Головна
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/recipes"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
            >
              Рецепти
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Знайти рецепт..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setShowSuggestions(true);
                  }}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:bg-white focus:bg-white shadow-soft"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white p-2 rounded-xl hover:bg-primary-600 transition-colors duration-200"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions &&
                  (searchValue ||
                    searchHistory.length > 0 ||
                    recentSearches.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      {/* Recent Searches */}
                      {recentSearches.length > 0 && (
                        <div className="p-4 border-b border-gray-100">
                          <h3 className="text-sm font-medium text-gray-700 mb-3">
                            Останні пошуки
                          </h3>
                          <div className="space-y-2">
                            {recentSearches
                              .slice(0, 3)
                              .map((term: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(term)}
                                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                >
                                  {term}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Popular Searches */}
                      {popularSearches.length > 0 && (
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-3">
                            Популярні запити
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {popularSearches
                              .slice(0, 6)
                              .map((term: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(term)}
                                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
                                >
                                  {term}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={toggleSearch}
            className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            <Search className="w-6 h-6" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4"
            >
              <div ref={searchRef} className="relative">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Знайти рецепт..."
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      setShowSuggestions(true);
                    }}
                    className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white p-2 rounded-xl hover:bg-primary-600 transition-colors duration-200"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {/* Mobile Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions &&
                    (searchValue ||
                      searchHistory.length > 0 ||
                      recentSearches.length > 0) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                      >
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                          <div className="p-4 border-b border-gray-100">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">
                              Останні пошуки
                            </h3>
                            <div className="space-y-2">
                              {recentSearches
                                .slice(0, 3)
                                .map((term: string, index: number) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(term)}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                  >
                                    {term}
                                  </button>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Popular Searches */}
                        {popularSearches.length > 0 && (
                          <div className="p-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">
                              Популярні запити
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {popularSearches
                                .slice(0, 6)
                                .map((term: string, index: number) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(term)}
                                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
                                  >
                                    {term}
                                  </button>
                                ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100"
            >
              <nav className="py-4 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  Головна
                </Link>
                <Link
                  to="/recipes"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  Рецепти
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
