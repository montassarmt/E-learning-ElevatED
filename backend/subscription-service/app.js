const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(express.json());
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));


// Connexion à MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('Subscription Service API is running...');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
