# Dockerfile for React
# Use the official Node.js image from the Docker Hub
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
# Copy .env.production file for production build
COPY .env.production .env
# Build the application
CMD ["npm", "run", "build"]

# Copy the custom Nginx configuration file
#COPY config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html
# Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
