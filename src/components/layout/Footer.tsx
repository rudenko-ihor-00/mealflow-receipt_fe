import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Github, Twitter, Instagram, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold">MealFlow</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Відкрийте для себе світ смачних рецептів з усього світу.
              Створюйте, зберігайте та діліться своїми улюбленими стравами.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:contact@mealflow.com"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Швидкі посилання
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Головна
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Рецепти
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Підтримка</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Допомога
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Контакти
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Про нас
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Політика конфіденційності
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} MealFlow. Всі права захищені.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-2 md:mt-0">
            Зроблено з <Heart className="w-4 h-4 mx-1 text-red-500" /> в Україні
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
