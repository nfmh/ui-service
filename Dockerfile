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
RUN npm run build

# Remove unnecessary node_modules to reduce image size
RUN rm -rf node_modules

# Stage 2 - The production environment
FROM nginx:stable-alpine

# Create a non-root user and group with specific UID and GID
RUN addgroup -g 1001 -S nginxgroup && adduser -u 1001 -S nginxuser -G nginxgroup

# Copy built React app from Stage 1
COPY --from=build /ui-service/build /usr/share/nginx/html

# Change ownership of the app directory to the non-root user
RUN chown -R nginxuser:nginxgroup /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Healthcheck for Nginx server
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost/ || exit 1

# Switch to the non-root user
USER nginxuser

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

# Dockerignore file for better caching
# .dockerignore
node_modules
npm-debug.log
.git
