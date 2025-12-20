import mongoose from 'mongoose';

/**
 * Mongoose schema for a Client.
 * Represents an active account in the CMS.
 */
const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    revenue: { type: Number },
    status: { type: String, default: 'Active' },
    // Detailed contact information added during overhaul
    phone: { type: String },
    company: { type: String },
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Client', clientSchema);
