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

# Check if serve is available
echo "🔍 Checking if serve is available..."
if command -v serve >/dev/null 2>&1; then
    echo "✅ serve is available"
else
    echo "⚠️ serve not found, will install via npx"
fi

# Start the application
echo "🚀 Starting MealFlow app on port 8080..."
echo "🔌 Final PORT value: $PORT"
echo "🌐 Starting serve on port 8080..."

# Start serve with verbose output
npx serve -s build -l 8080 --debug

echo "❌ If you see this, serve failed to start"
