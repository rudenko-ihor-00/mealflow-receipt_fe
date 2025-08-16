import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Heart, ArrowRight, Clock, Users, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchRecipes } from "../store/slices/recipeSlice";
import Layout from "../components/layout/Layout";
import RecipeCard from "../components/ui/RecipeCard";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { recipes, isLoading } = useAppSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const featuredRecipes = recipes.slice(0, 6);

  const stats = [
    {
      icon: Clock,
      label: "Рецептів",
      value: "1000+",
      color: "text-primary-500",
    },
    {
      icon: Users,
      label: "Користувачів",
      value: "50K+",
      color: "text-accent-500",
    },
    { icon: Star, label: "Оцінок", value: "100K+", color: "text-yellow-500" },
    { icon: Heart, label: "Улюблених", value: "25K+", color: "text-red-500" },
  ];

  const features = [
    {
      icon: Search,
      title: "Швидкий пошук",
      description: "Знайдіть потрібний рецепт за кілька секунд",
      color: "text-primary-500",
    },
    {
      icon: Heart,
      title: "Особиста колекція",
      description: "Зберігайте улюблені рецепти та створюйте власні",
      color: "text-red-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 text-balance"
            >
              Відкрийте світ
              <span className="block gradient-text mt-2">смачних рецептів</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto text-balance leading-relaxed"
            >
              Знайдіть, створюйте та діліться найкращими рецептами з усього
              світу. Від простих страв до кулінарних шедеврів.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link
                to="/recipes"
                className="btn-primary text-lg px-10 py-4 inline-flex items-center group"
              >
                Почати пошук
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-20 h-20 ${stat.color} bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-soft transition-all duration-300`}
                >
                  <stat.icon className="w-10 h-10" />
                </motion.div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              Чому обирають MealFlow?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
              Наша платформа надає все необхідне для кулінарних досліджень
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className={`w-24 h-24 ${feature.color} bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-xl transition-all duration-300`}
                >
                  <feature.icon className="w-12 h-12" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              Популярні рецепти
            </h2>
            <p className="text-xl text-gray-600 text-balance">
              Спробуйте найкращі страви від наших кухарів
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="animate-pulse"
                >
                  <div className="bg-gray-200 h-56 rounded-2xl mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredRecipes.map((recipe, index) => (
                <motion.div key={recipe.id} variants={itemVariants}>
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/recipes"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center group"
            >
              Переглянути всі рецепти
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 relative overflow-hidden">
        <div className="max-w-5xl mx-auto container-padding text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-8 text-balance"
          >
            Готові поділитися своїм рецептом?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-primary-100 mb-12 text-balance leading-relaxed"
          >
            Приєднуйтесь до нашої спільноти кухарів та діліться своїми
            кулінарними шедеврами
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-10 rounded-2xl transition-all duration-300 inline-flex items-center group hover:shadow-xl hover:-translate-y-1"
            >
              Створити акаунт
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/recipes"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-10 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              Переглянути рецепти
            </Link>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
