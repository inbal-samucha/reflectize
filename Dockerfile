# # # Use an official Node.js runtime as a parent image
# # FROM node:16

# # # Set the working directory in the container
# # WORKDIR /usr/src/app

# # # Install dependencies
# # COPY package*.json ./
# # RUN npm install

# # # Copy the rest of your application code
# # COPY . .

# # # Expose the port your app runs on
# # EXPOSE 3000

# # # Command to run your application
# # CMD ["npm", "start"]

# # Use a Node.js base image
# FROM node:latest

# # Set working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Build TypeScript
# RUN npm run build

# # Copy source code
# COPY . .


# # Expose the port your app runs on
# EXPOSE 3000

# # Command to run your app using node
# CMD ["node", "dist/index.js"]

# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
