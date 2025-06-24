FROM node:20 AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY ./reference-service/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем tsconfig.json
COPY ./reference-service/tsconfig.json ./

# Копируем исходный код
COPY ./reference-service/src ./src

# Компилируем TypeScript в JavaScript
RUN npm run build

FROM node:20 AS prod

WORKDIR /app

# Копируем package.json и package-lock.json
COPY ./reference-service/package*.json ./

# Устанавливаем только production зависимости
RUN npm install --only=production

# Копируем скомпилированный код
COPY --from=builder /app/dist ./dist

# Копируем .env файл
COPY ./reference-service/.env ./

EXPOSE 8003

CMD ["npm", "start"]