# Use Node.js 18 Alpine
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps --only=production --no-optional

# Copy source code
COPY . .

# Build the React app
RUN npm run build --silent

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --legacy-peer-deps --only=production --no-optional

# Copy built app from builder stage
COPY --from=builder /app/build ./build

# Copy start script
COPY start.sh ./

# Make start script executable
RUN chmod +x start.sh

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV RAILWAY_PORT=3000

# Start the application
CMD ["/app/start.sh"]
