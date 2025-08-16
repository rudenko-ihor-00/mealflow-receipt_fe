const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// API Routes (for future backend integration)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MealFlow API is running',
    timestamp: new Date().toISOString()
  });
});

// Mock API endpoints for development
app.get('/api/recipes', (req, res) => {
  // This would be replaced with actual database queries
  res.json({
    success: true,
    message: 'Recipes endpoint ready for backend integration',
    data: []
  });
});

app.get('/api/recipes/:id', (req, res) => {
  // This would be replaced with actual database queries
  res.json({
    success: true,
    message: `Recipe ${req.params.id} endpoint ready for backend integration`,
    data: null
  });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MealFlow server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:3000`);
  console.log(`🔧 API: http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
