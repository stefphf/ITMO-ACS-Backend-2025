FROM node:20 AS builder

WORKDIR /app
COPY ./auth-service/package*.json ./
COPY ./auth-service/tsconfig.json ./tsconfig.json
RUN npm install
RUN npm install -g typescript

COPY ./auth-service/src ./src

RUN npx tsc -p tsconfig.json

FROM node:20 AS prod

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY ./auth-service/.env ./.env

EXPOSE 8001

CMD ["node", "dist/app.js"]