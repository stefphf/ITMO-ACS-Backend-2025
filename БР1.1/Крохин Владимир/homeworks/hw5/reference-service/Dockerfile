FROM node:20 as builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY ./reference-service/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем packages и устанавливаем зависимости для common
COPY ./packages ./packages
WORKDIR /app/packages/common
RUN npm install
RUN npm run build
WORKDIR /app/packages/dto
RUN npm install
RUN npm run build
WORKDIR /app

# Копируем tsconfig.json
COPY ./reference-service/tsconfig.json ./

# Копируем исходный код
COPY ./reference-service/src ./src

# Компилируем TypeScript в JavaScript
RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/packages ./packages

COPY ./reference-service/.env ./.env

CMD ["node", "dist/app.js"]