# Use Node.js
FROM node:16

# Set the working directory
WORKDIR /app

# Install docker-compose (Need to stop the services)
RUN apt-get update && apt-get install -y \
    curl \
    python3 \
    python3-pip \
    libffi-dev \
    libssl-dev \
    && curl -L "https://github.com/docker/compose/releases/download/v2.24.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Get the application code
COPY . .

# Expose the port
EXPOSE 8199

# Start the application
CMD ["npm", "start"]
