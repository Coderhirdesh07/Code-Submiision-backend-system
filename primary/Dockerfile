FROM node:23

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]

