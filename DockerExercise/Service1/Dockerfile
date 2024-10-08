# Use Node.js
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Get the application code
COPY . .

# Expose the port
EXPOSE 8199

# Start the application
CMD ["npm", "start"]
