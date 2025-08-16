# Use Node.js 18 Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including express for server.js)
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Expose port
EXPOSE 80

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80
ENV RAILWAY_PORT=80

# Start the application
CMD ["npm", "run", "server"]
