# 🚀 Налаштування нового репозиторію на Railway

## 📋 **Оновлена інформація:**

- **Новий репозиторій**: [https://github.com/rudenko-ihor-00/mealflow-receipt_fe](https://github.com/rudenko-ihor-00/mealflow-receipt_fe)
- **Старий репозиторій**: [https://github.com/KorniienkoYehor/mealflow-receipt_fe](https://github.com/KorniienkoYehor/mealflow-receipt_fe)

## 🔄 **Що потрібно зробити:**

### 1. **В Railway Dashboard:**
1. Перейдіть в ваш проект
2. Перейдіть в "Settings" → "GitHub"
3. Натисніть "Disconnect" для старого репозиторію
4. Натисніть "Connect GitHub Repository"
5. Виберіть новий репозиторій: `rudenko-ihor-00/mealflow-receipt_fe`
6. Виберіть гілку `main`

### 2. **Або створіть новий проект:**
1. Натисніть "New Project"
2. Виберіть "Deploy from GitHub repo"
3. Виберіть `rudenko-ihor-00/mealflow-receipt_fe`
4. Railway автоматично виявить Dockerfile

## 🎯 **Очікуваний результат:**

Після підключення нового репозиторію:
- ✅ Railway автоматично розгорне додаток
- ✅ Домен `mealflow-receiptfe-production.up.railway.app` буде працювати
- ✅ Автоматичний деплой при кожному push в main
- ✅ Всі функції додатку будуть доступні

## 📊 **Перевірка деплою:**

### **Health Check:**
```bash
curl https://mealflow-receiptfe-production.up.railway.app/
```

### **Логи Railway:**
- Перейдіть в Railway Dashboard
- Виберіть ваш проект
- Перейдіть в "Deployments" → "View Logs"

## 🚨 **Якщо виникнуть проблеми:**

1. **Перевірте права доступу** - переконайтеся, що Railway має доступ до нового репозиторію
2. **Очистіть кеш** - в Railway Dashboard → Settings → Build Cache → Clear
3. **Перезапустіть деплой** - в Deployments → Redeploy

## 🔧 **Налаштування змінних середовища:**

В Railway Dashboard додайте:
```bash
NODE_ENV=production
PORT=3000
REACT_APP_MEALFLOW_BASE_URL=https://web-production-51d5.up.railway.app
REACT_APP_MEALFLOW_API_KEY=mealflow-api-key-2025-secure
```

## 📈 **Моніторинг:**

- **Автоматичні деплої** при кожному push
- **Health checks** кожні 30 секунд
- **Логи в реальному часі**
- **Метрики продуктивності**

---

**Новий репозиторій готовий до деплою на Railway! 🎉**
