# Use the official Node.js image as the base image for building the app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /ui-service

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

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

# Switch to the non-root user
USER nginxuser

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
