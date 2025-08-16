#!/bin/sh

# Change to app directory
cd /app

# Force port to 8080 (Railway's preferred)
export PORT=8080

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "Build directory not found. Building the app..."
    npm run build
fi

# Start the application
echo "Starting MealFlow app on port 8080..."
npx serve -s build -l 8080
