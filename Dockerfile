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

# Create a non-root user and group
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup

# Change ownership of the app directory
RUN chown -R appuser:appgroup /ui-service

# Switch to the non-root user
USER appuser