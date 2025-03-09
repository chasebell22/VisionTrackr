import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth').default);
app.use('/api/values', require('./routes/values').default);
app.use('/api/mission-purpose', require('./routes/mission-purpose').default);
app.use('/api/visions', require('./routes/visions').default);
app.use('/api/goals', require('./routes/goals').default);
app.use('/api/tasks', require('./routes/tasks').default);

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
}); 