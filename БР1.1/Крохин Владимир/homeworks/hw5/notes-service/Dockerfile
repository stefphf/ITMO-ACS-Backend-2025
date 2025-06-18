FROM node:20 as builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY ./notes-service/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем packages и устанавливаем зависимости для common
COPY ./packages ./packages
WORKDIR /app/packages/common
RUN npm install
RUN npm run build
WORKDIR /app

# Копируем tsconfig.json
COPY ./notes-service/tsconfig.json ./

# Копируем исходный код
COPY ./notes-service/src ./src

# Компилируем TypeScript в JavaScript
RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/packages ./packages

# Создаем директорию @app и копируем собранные пакеты
RUN rm -rf node_modules/@app
RUN mkdir -p node_modules/@app
RUN cp -r packages/common/dist node_modules/@app/common
RUN cp -r packages/dto/dist node_modules/@app/dto

COPY ./notes-service/.env ./.env

CMD ["node", "dist/app.js"]