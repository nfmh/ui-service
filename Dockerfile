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

# Stage 2 - The production environment
FROM nginx:stable-alpine

# Create a non-root user and group with specific UID and GID
RUN addgroup -g 1001 -S nginxgroup && adduser -u 1001 -S nginxuser -G nginxgroup

# Copy built React app from Stage 1
COPY --from=build /ui-service/build /usr/share/nginx/html

# Create necessary cache directories and give permissions to non-root user
RUN mkdir -p /var/cache/nginx/client_temp /var/run/nginx && \
    chown -R nginxuser:nginxgroup /var/cache/nginx /var/run/nginx

# Change ownership of the app directory to the non-root user
RUN chown -R nginxuser:nginxgroup /usr/share/nginx/html

# Update Nginx configuration to listen on port 8080 and set PID location
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf && \
    sed -i 's|/var/run/nginx.pid|/var/run/nginx/nginx.pid|' /etc/nginx/nginx.conf

# Expose port 8080 instead of 80
EXPOSE 8080

# Switch to the non-root user
USER nginxuser

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
