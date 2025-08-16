#!/bin/sh

# Change to app directory
cd /app

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "Build directory not found. Building the app..."
    npm run build
fi

# Start the application
echo "Starting MealFlow app on port $PORT..."
npx serve -s build -l $PORT
