FROM node:20 AS builder

WORKDIR /app

# Копируем package.json и tsconfig.json
COPY ./auth-service/package*.json ./
COPY ./auth-service/tsconfig.json ./tsconfig.json

# Копируем common package
COPY ./packages ./packages

# Устанавливаем зависимости
RUN npm install
RUN npm install -g typescript

# Копируем исходный код
COPY ./auth-service/src ./src

# Собираем dto package
WORKDIR /app/packages/dto
RUN npm install
RUN npm run build

# Собираем common package
WORKDIR /app/packages/common
RUN npm install
RUN npm run build

# Возвращаемся в корневую директорию и собираем auth-service
WORKDIR /app
RUN npx tsc -p tsconfig.json

FROM node:20 AS prod

WORKDIR /app

# Копируем собранные файлы и зависимости
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/packages ./packages
COPY ./auth-service/.env ./.env

EXPOSE 8001

CMD ["node", "dist/app.js"]