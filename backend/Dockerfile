# Use the official lightweight Node.js 22 image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Inform Docker that the app listens on port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]