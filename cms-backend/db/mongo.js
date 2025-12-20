import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Initializes and establishes a connection to MongoDB using Mongoose.
 * Uses the mongodb_url from environment variables.
 */
export const connectMongo = async () => {
    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(process.env.mongodb_url);
        console.log('MongoDB Connected');
    } catch (err) {
        // Log error and terminate process if connection fails
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};
