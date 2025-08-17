# Використовуємо офіційний Node.js образ
FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності (включаючи express)
RUN npm ci

# Копіюємо весь код
COPY . .

# Білдимо додаток
RUN npm run build

# Встановлюємо змінну PORT для Railway
ENV PORT=3000

# Відкриваємо порт
EXPOSE $PORT

# Railway використовує свій startCommand, тому CMD не потрібен
# CMD node server.js
