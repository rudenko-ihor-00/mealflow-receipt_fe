# Use Node.js 18 Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Expose port
EXPOSE $PORT

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "server.js"]
