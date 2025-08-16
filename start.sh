#!/bin/sh

# Enable debug mode
set -x

echo "🚀 Starting MealFlow app deployment process..."

# Change to app directory
echo "📁 Current directory: $(pwd)"
echo "📁 Changing to /app directory..."
cd /app
echo "📁 New directory: $(pwd)"

# Show environment variables
echo "🌍 Environment variables:"
echo "   NODE_ENV: $NODE_ENV"
echo "   PORT: $PORT"
echo "   RAILWAY_PORT: $RAILWAY_PORT"
echo "   PWD: $PWD"

# List directory contents
echo "📋 Directory contents:"
ls -la

# Check if build directory exists
echo "🔍 Checking build directory..."
if [ ! -d "build" ]; then
    echo "❌ Build directory not found. Building the app..."
    echo "📋 Available files:"
    ls -la
    echo "📦 Running npm run build..."
    npm run build
    echo "✅ Build completed. Build directory contents:"
    ls -la build/
else
    echo "✅ Build directory found. Contents:"
    ls -la build/
fi

# Force port to 8080 (Railway's preferred)
echo "🔌 Setting PORT to 8080..."
export PORT=8080
echo "🔌 PORT is now: $PORT"

# Create simple Express server
echo "🚀 Creating simple Express server..."
cat > server.js << 'EOF'
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MealFlow app is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Serve React app for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Express server is running on port', PORT);
  console.log('📁 Serving files from:', path.join(__dirname, 'build'));
  console.log('🌐 Environment:', process.env.NODE_ENV || 'development');
  console.log('🏥 Healthcheck available at:', `http://0.0.0.0:${PORT}/health`);
  console.log('🌍 Server accessible from any IP address');
});
EOF

echo "✅ Express server created"

# Start the Express server
echo "🚀 Starting Express server on port 8080..."
echo "🔌 Final PORT value: $PORT"
echo "🌐 Starting Express server on 0.0.0.0:8080..."

# Start Express server
node server.js

echo "❌ If you see this, Express server failed to start"
