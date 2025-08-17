import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  ChefHat,
  ShoppingCart,
  Copy,
  ExternalLink,
  Heart,
  Share2,
  Bookmark,
  Star,
  ArrowLeft,
  Timer,
  Globe,
  Calendar,
  User,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchRecipeById, toggleFavorite } from "../store/slices/recipeSlice";
import Layout from "../components/layout/Layout";
import { generateOrderLink } from "../services/api/mealflowApi";
import { safeOpenUrl } from "../utils/browserUtils";
import { Recipe } from "../types";

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentRecipe, isLoading, error } = useAppSelector(
    (state) => state.recipes
  );
  const { favorites } = useAppSelector((state) => state.recipes);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderLink, setOrderLink] = useState<string | null>(null);
  const [orderLinkGenerated, setOrderLinkGenerated] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-96 rounded-xl mb-6"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !currentRecipe) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Рецепт не знайдено
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Запитаний рецепт не існує або був видалений"}
          </p>
          <Link to="/recipes" className="btn-primary">
            Повернутися до рецептів
          </Link>
        </div>
      </Layout>
    );
  }

  const isFavorite = favorites.includes(currentRecipe.id);
  const totalTime = currentRecipe.prepTime + currentRecipe.cookTime;

  const handleFavoriteToggle = () => {
    if (isAuthenticated) {
      dispatch(toggleFavorite(currentRecipe.id));
    } else {
      // Redirect to login if not authenticated
      console.log("Please login to add favorites");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentRecipe.title,
          text: currentRecipe.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Посилання скопійовано в буфер обміну!");
    }
  };

  const handleOrderIngredients = async () => {
    try {
      setIsOrdering(true);
      setOrderError(null);
      setOrderLink(null);
      setOrderLinkGenerated(false);
      
      const link = await generateOrderLink(currentRecipe.ingredients);
      console.log("🔗 Посилання для замовлення:", link);
      
      setOrderLink(link);
      setOrderLinkGenerated(true);
      
      // Спробуємо автоматично відкрити
      const success = safeOpenUrl(link, "_blank", true);
      
      if (!success) {
        console.log("⚠️ Не вдалося відкрити посилання автоматично");
        setOrderError("Браузер заблокував автоматичне відкриття. Використайте кнопки нижче.");
      }
    } catch (error) {
      console.error("Error ordering ingredients:", error);
      setOrderError("Не вдалося сформувати посилання для замовлення. Спробуйте ще раз.");
    } finally {
      setIsOrdering(false);
    }
  };

  const handleManualOpen = () => {
    if (orderLink) {
      safeOpenUrl(orderLink, "_blank", true);
    }
  };

  const handleCopyLink = async () => {
    if (orderLink) {
      try {
        await navigator.clipboard.writeText(orderLink);
        alert("Посилання скопійовано в буфер обміну!");
      } catch (error) {
        console.error("Помилка копіювання:", error);
        // Fallback для старих браузерів
        const textArea = document.createElement("textarea");
        textArea.value = orderLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Посилання скопійовано в буфер обміну!");
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/recipes"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад до рецептів
        </Link>

        {/* Recipe Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {currentRecipe.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {currentRecipe.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleFavoriteToggle}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isFavorite
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-red-50 border border-gray-200"
                }`}
                title={
                  isFavorite ? "Видалити з улюблених" : "Додати в улюблені"
                }
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-full transition-colors duration-200"
                title="Поділитися"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Recipe Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{totalTime} хв</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>{currentRecipe.servings} порц.</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <ChefHat className="w-5 h-5" />
              <span>{getDifficultyText(currentRecipe.difficulty)}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Globe className="w-5 h-5" />
              <span>{currentRecipe.cuisine}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {currentRecipe.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Recipe Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <img
            src={currentRecipe.image}
            alt={currentRecipe.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredients */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Bookmark className="w-5 h-5 mr-2 text-primary-600" />
                Інгредієнти
              </h3>

              <div className="space-y-3">
                {currentRecipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </div>
                      {ingredient.notes && (
                        <div className="text-sm text-gray-600 mt-1">
                          {ingredient.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Ingredients Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleOrderIngredients}
                  disabled={isOrdering}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    {isOrdering
                      ? "Формуємо замовлення..."
                      : "Замовити інгредієнти"}
                  </span>
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Відкриється в новій вкладці
                </p>

                {/* Error Display */}
                {orderError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 text-center">
                      ⚠️ {orderError}
                    </p>
                  </div>
                )}

                {/* Generated Order Link */}
                {orderLinkGenerated && orderLink && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800 mb-2">
                      ✅ Посилання для замовлення готове
                    </h4>
                    <div className="space-y-2">
                      <button
                        onClick={handleManualOpen}
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Відкрити посилання</span>
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Скопіювати посилання</span>
                      </button>
                    </div>
                    <p className="text-xs text-green-600 text-center mt-2">
                      Якщо посилання не відкрилося автоматично, використайте кнопки вище
                    </p>
                  </div>
                )}
              </div>

              {/* Nutrition Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Харчова цінність
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Калорії:</span>
                    <span className="font-medium">
                      {currentRecipe.nutrition.calories}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Білки:</span>
                    <span className="font-medium">
                      {currentRecipe.nutrition.protein}г
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Вуглеводи:</span>
                    <span className="font-medium">
                      {currentRecipe.nutrition.carbs}г
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Жири:</span>
                    <span className="font-medium">
                      {currentRecipe.nutrition.fat}г
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Instructions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Timer className="w-6 h-6 mr-3 text-primary-600" />
                Приготування
              </h3>

              <div className="space-y-6">
                {currentRecipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">
                        {instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recipe Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2 text-primary-600" />
                      Автор
                    </h4>
                    <p className="text-gray-700">{currentRecipe.author.name}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                      Дата створення
                    </h4>
                    <p className="text-gray-700">
                      {new Date(currentRecipe.createdAt).toLocaleDateString(
                        "uk-UA"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecipeDetailPage;
