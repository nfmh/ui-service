# Use the official Node.js image as the base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /ui-service

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Stage 2 - The production environment
FROM nginx:stable-alpine

# Copy built React app from Stage 1
COPY --from=build /ui-service/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
