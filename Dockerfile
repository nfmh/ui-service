# Use the official Node.js image as the base image for building the app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /ui-service

# Install dependencies before copying the full source code to leverage Docker cache
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy only necessary directories and files to avoid cache invalidation when modifying source code
COPY public ./public
COPY src ./src

# Build the app
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build && rm -rf node_modules

# Use a minimal image to serve the static files
FROM node:18-alpine AS production

# Install 'serve' to serve the static files
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /ui-service/build ./build

# Create a non-root user and group
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup

# Change ownership of the app directory
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port on which the app will run
EXPOSE 8080

# Serve the static files using 'serve'
CMD ["serve", "-s", "build", "-l", "8080"]