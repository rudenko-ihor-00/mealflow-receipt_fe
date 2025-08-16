const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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
