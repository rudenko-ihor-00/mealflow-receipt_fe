const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
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

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Server is running on port', PORT);
  console.log('📁 Serving files from:', path.join(__dirname, 'build'));
  console.log('🌐 Environment:', process.env.NODE_ENV || 'development');
  console.log('🏥 Healthcheck available at:', `http://localhost:${PORT}/health`);
});
