import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, Heart, Star } from "lucide-react";
import { Recipe } from "../../types";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleFavorite } from "../../store/slices/recipeSlice";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, className = "" }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.recipes);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const isFavorite = favorites.includes(recipe.id);
  const totalTime = recipe.prepTime + recipe.cookTime;

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAuthenticated) {
      dispatch(toggleFavorite(recipe.id));
    } else {
      // Redirect to login if not authenticated
      console.log("Please login to add favorites");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Легко";
      case "medium":
        return "Середньо";
      case "hard":
        return "Складно";
      default:
        return difficulty;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`card card-hover group ${className}`}
    >
      <Link to={`/recipes/${recipe.id}`} className="block">
        {/* Recipe Image */}
        <div className="relative overflow-hidden">
          <motion.img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
            whileHover={{ scale: 1.1 }}
          />

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteToggle}
            className={`absolute top-4 right-4 p-3 rounded-2xl transition-all duration-300 ${
              isFavorite
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white backdrop-blur-sm"
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </motion.button>

          {/* Difficulty Badge */}
          <div
            className={`absolute top-4 left-4 px-3 py-2 rounded-xl text-xs font-medium border ${getDifficultyColor(recipe.difficulty)} backdrop-blur-sm`}
          >
            {getDifficultyText(recipe.difficulty)}
          </div>

          {/* Cuisine Badge */}
          <div className="absolute bottom-4 left-4 px-3 py-2 bg-black/70 text-white rounded-xl text-xs font-medium backdrop-blur-sm">
            {recipe.cuisine}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Recipe Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
            {recipe.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>

          {/* Recipe Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary-500" />
              <span>{totalTime} хв</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary-500" />
              <span>{recipe.servings} порц.</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-xl font-medium hover:bg-primary-100 hover:text-primary-700 transition-all duration-200"
              >
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-xl font-medium">
                +{recipe.tags.length - 3}
              </span>
            )}
          </div>

          {/* Author and Rating */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center ring-2 ring-white">
                <span className="text-sm font-semibold text-primary-700">
                  {recipe.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {recipe.author.name}
              </span>
            </div>

            {/* Mock Rating */}
            <div className="flex items-center space-x-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 font-medium">4.8</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
