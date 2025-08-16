#!/bin/sh

# Change to app directory
cd /app

# Force port to 3000 (Railway's default)
export PORT=3000

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "Build directory not found. Building the app..."
    npm run build
fi

# Start the application
echo "Starting MealFlow app on port 3000..."
npx serve -s build -l 3000
