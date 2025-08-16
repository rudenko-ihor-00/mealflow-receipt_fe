module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'prettier/prettier': 'off', // Вимкнути правила Prettier в ESLint
    '@typescript-eslint/no-unused-vars': 'warn', // Зробити попередження замість помилки
    'react-hooks/exhaustive-deps': 'warn' // Зробити попередження замість помилки
  }
};
