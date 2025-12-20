import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongo } from './db/mongo.js';
import clientRoutes from './routes/clientRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

// Initialize environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// GLOBAL MIDDLEWARE
app.use(cors());          // Enable Cross-Origin Resource Sharing
app.use(express.json());  // Parse incoming JSON payloads

// DATABASE INITIALIZATION
// Connect to MongoDB; Oracle connections are handled on-demand in controllers
connectMongo();

// API ROUTES
app.use('/api/clients', clientRoutes); // All client-related endpoints
app.use('/api/leads', leadRoutes);     // All lead-related endpoints

/**
 * Root sanity check route
 */
app.get('/', (req, res) => {
    res.send('CMS Backend API Running');
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
