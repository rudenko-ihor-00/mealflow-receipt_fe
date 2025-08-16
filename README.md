# 🍳 MealFlow - Рецепти з усього світу

Сучасна веб-платформа для пошуку, збереження та ділення кулінарними рецептами. Побудована з використанням React 18, TypeScript та Tailwind CSS.

## ✨ Особливості

- 🔍 **Розширений пошук** - пошук за назвою, інгредієнтами, тегами та кухнею
- 🎯 **Фільтрація** - за складністю, часом приготування, кухнею світу
- ❤️ **Улюблені рецепти** - зберігайте та організовуйте улюблені страви
- 📱 **Адаптивний дизайн** - працює на всіх пристроях
- 🚀 **Швидка продуктивність** - оптимізовано для швидкого завантаження
- 🎨 **Сучасний UI/UX** - красиві анімації та переходи

## 🛠️ Технологічний стек

### Frontend
- **React 18** - основна бібліотека для UI
- **TypeScript** - типізація та безпека коду
- **React Router DOM** - навігація та роутинг
- **Redux Toolkit** - управління глобальним станом
- **Tailwind CSS** - utility-first CSS фреймворк
- **Framer Motion** - анімації та переходи
- **Lucide React** - іконки

### Backend & Infrastructure
- **Axios** - HTTP клієнт для API запитів
- **Mealflow API** - інтеграція з зовнішнім сервісом для замовлення інгредієнтів
- **Docker** - контейнеризація
- **Railway** - хостинг та деплой

## 🔗 Mealflow API Інтеграція

Додаток інтегрований з Mealflow API для замовлення інгредієнтів:

### Як це працює
1. **Мапінг інгредієнтів** - POST `/api/v1/map-ingredients` для перетворення назв інгредієнтів у продукт ID
2. **Отримання посилання на магазин** - GET `/api/v1/fallback-app` для отримання базового URL магазину
3. **Формування посилання замовлення** - автоматичне створення URL з продукт ID та назвами

### Конфігурація
- **Base URL**: `https://web-production-51d5.up.railway.app`
- **API Key**: `mealflow-api-key-2025-secure`
- **Заголовок**: `x-api-key`

## 🚀 Швидкий старт

### Вимоги
- Node.js 18+ 
- npm 8+

### Встановлення

1. **Клонуйте репозиторій**
```bash
git clone https://github.com/rudenko-ihor-00/mealflow-receipt_fe.git
cd mealflow-receipt_fe
```

2. **Встановіть залежності**
```bash
npm install
```

3. **Запустіть проект**
```bash
# Розробка
npm start

# Або
npm run dev
```

4. **Відкрийте браузер**
- Frontend: http://localhost:3000

## 📁 Структура проекту

```
src/
├── components/          # React компоненти
│   ├── ui/             # UI компоненти (RecipeCard, etc.)
│   └── layout/         # Layout компоненти (Header, Footer)
├── features/            # Feature-based структура
│   ├── recipes/        # Логіка рецептів
│   ├── search/         # Пошук та фільтрація
│   └── auth/           # Аутентифікація
├── store/              # Redux store та slices
├── services/           # API сервіси та зовнішні інтеграції
├── types/              # TypeScript типи
├── utils/              # Утиліти та допоміжні функції
├── hooks/              # Custom React hooks
└── assets/             # Статичні ресурси
```

## 🚀 Деплой на Railway

### Автоматичний деплой
1. Підключіть ваш GitHub репозиторій до Railway
2. Railway автоматично зібере та розгорне додаток при кожному push в main гілку

### Ручний деплой
```bash
# Встановіть Railway CLI
npm install -g @railway/cli

# Увійдіть в Railway
railway login

# Розгорніть проект
railway up
```

### Перевірка деплою
- Railway автоматично надасть URL для вашого додатку
- Health check доступний за адресою `/`
- Логи можна переглянути в Railway Dashboard

## 🐳 Docker

### Локальна збірка
```bash
docker build -t mealflow-app .
docker run -p 3000:3000 mealflow-app
```

## 🚂 Деплой на Railway

1. **Підготуйте проект**
```bash
npm run build
```

2. **Деплой**
```bash
npm run deploy:railway
```

## 🔧 Доступні скрипти

```bash
# Розробка
npm start              # Запуск React dev сервера
npm run dev           # Запуск фронтенду + бекенду
npm run server        # Запуск тільки Express сервера

# Збірка
npm run build         # Збірка для продакшену
npm run type-check    # Перевірка TypeScript типів

# Якість коду
npm run lint          # ESLint перевірка
npm run lint:fix      # Автоматичне виправлення ESLint помилок
npm run format        # Prettier форматування

# Docker
npm run docker:build  # Збірка Docker образу
npm run docker:run    # Запуск Docker контейнера
```

## 🌐 API Endpoints

### Рецепти
- `GET /api/recipes` - список рецептів з фільтрами
- `GET /api/recipes/:id` - деталі рецепту
- `GET /api/recipes/cuisine/:cuisine` - рецепти за кухнею
- `GET /api/recipes/tags` - рецепти за тегами
- `GET /api/recipes/search` - пошук рецептів

### Аутентифікація
- `POST /api/auth/login` - вхід користувача
- `POST /api/auth/register` - реєстрація
- `GET /api/auth/me` - поточний користувач
- `POST /api/auth/logout` - вихід

## 🎨 Кастомізація

### Кольори
Основні кольори налаштовані в `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#fef7ee',
    500: '#f17a1a',
    600: '#e25f0f',
    // ...
  },
  secondary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    // ...
  }
}
```

### Анімації
Анімації налаштовані в `tailwind.config.js` та використовують Framer Motion.

## 📱 Адаптивність

Проект повністю адаптивний та оптимізований для:
- 📱 Мобільні пристрої (320px+)
- 📱 Планшети (768px+)
- 💻 Десктопи (1024px+)
- 🖥️ Великі екрани (1280px+)

## 🔒 Безпека

- Валідація вхідних даних
- Захист від XSS атак
- Безпечне зберігання токенів
- CORS налаштування

## 🧪 Тестування

```bash
npm test              # Запуск тестів
npm test -- --watch  # Тести в режимі спостереження
npm test -- --coverage # Тести з покриттям
```

## 📊 Продуктивність

- Lazy loading компонентів
- Оптимізовані зображення
- Кешування Redux
- Bundle splitting

## 🤝 Внесок

1. Fork проект
2. Створіть feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit зміни (`git commit -m 'Add some AmazingFeature'`)
4. Push до branch (`git push origin feature/AmazingFeature`)
5. Відкрийте Pull Request

## 📄 Ліцензія

Цей проект ліцензовано під MIT License - дивіться файл [LICENSE](LICENSE) для деталей.

## 👥 Команда

- **Розробка** - MealFlow Team
- **Дизайн** - MealFlow Design Team
- **Тестування** - MealFlow QA Team

## 📞 Підтримка

Якщо у вас є питання або проблеми:

- 📧 Email: support@mealflow.com
- 🐛 Issues: [GitHub Issues](link-to-issues)
- 📖 Документація: [Wiki](link-to-wiki)

## 🎯 Roadmap

### v1.0 (MVP) ✅
- [x] Базовий функціонал рецептів
- [x] Пошук та фільтрація
- [x] Адаптивний дизайн
- [x] Mock дані

### v1.1 (Найближчий час)
- [ ] Реальна база даних
- [ ] Аутентифікація користувачів
- [ ] Завантаження зображень
- [ ] Коментарі та оцінки

### v1.2 (Майбутнє)
- [ ] Мобільний додаток
- [ ] Соціальні функції
- [ ] AI рекомендації
- [ ] Мультимовність

---

**Зроблено з ❤️ в Україні**
