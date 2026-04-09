const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: CLIENT_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Basic Route for AI/API bridge
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Spin Factor AI Bridge'
  });
});

// Future AI Endpoint
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  // This is where the AI logic from the backend team will go
  res.json({ 
    reply: `Backend received: "${message}". AI module integration pending.` 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Spin Factor Server running on port ${PORT}`);
});
