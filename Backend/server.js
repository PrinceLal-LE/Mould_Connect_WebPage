require('dotenv').config();
const express = require('express');
const app = express();
const routers = require('./router/auth-router');
const connectDB = require('./utils/database');
const helmet = require('helmet');
const cors = require('cors');
// Middleware\
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());
app.use("/api/auth", routers);

// Routes
app.get('/', (req, res) => {
  res.json({ message: "Prince Lal" });
});

// port number
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
  });
});

process.env