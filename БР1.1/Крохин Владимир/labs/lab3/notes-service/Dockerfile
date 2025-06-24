FROM node:20 AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY ./notes-service/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем tsconfig.json
COPY ./notes-service/tsconfig.json ./

# Копируем исходный код
COPY ./notes-service/src ./src

# Компилируем TypeScript в JavaScript
RUN npm run build

FROM node:20 AS prod

WORKDIR /app

# Копируем package.json и package-lock.json
COPY ./notes-service/package*.json ./

# Устанавливаем только production зависимости
RUN npm install --only=production

# Копируем скомпилированный код
COPY --from=builder /app/dist ./dist

# Копируем .env файл
COPY ./notes-service/.env ./

EXPOSE 8004

CMD ["npm", "start"]