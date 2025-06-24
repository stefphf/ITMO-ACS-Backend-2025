FROM node:20 as builder

WORKDIR /app

# Copy package files
COPY ./training-service/package*.json ./
COPY ./training-service/tsconfig.json ./tsconfig.json
COPY ./packages ./packages

# Install dependencies
RUN npm install
RUN npm install -g typescript

# Copy source code
COPY ./training-service/src ./src

# Build common package
WORKDIR /app/packages/common
RUN npm install
RUN npm run build

# Build dto package
WORKDIR /app/packages/dto
RUN npm install
RUN npm run build

# Return to root directory and install dependencies
WORKDIR /app
RUN npm install

# Create node_modules/@app directory
RUN mkdir -p node_modules/@app

# Remove existing and copy built packages to node_modules/@app
RUN rm -rf node_modules/@app/common && cp -r packages/common/dist node_modules/@app/common
RUN rm -rf node_modules/@app/dto && cp -r packages/dto/dist node_modules/@app/dto

# Build the application
RUN npx tsc -p tsconfig.json

# Production stage
FROM node:20

WORKDIR /app

# Copy package files and install production dependencies
COPY ./training-service/package*.json ./
RUN npm install --only=production

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/packages ./packages

# Create @app directory and copy built packages
RUN rm -rf node_modules/@app
RUN mkdir -p node_modules/@app
RUN cp -r packages/common/dist node_modules/@app/common
RUN cp -r packages/dto/dist node_modules/@app/dto

# Expose port
EXPOSE 8002

# Start the application
CMD ["node", "dist/app.js"]