import mongoose from 'mongoose';

/**
 * Mongoose schema for a Lead.
 * Represents a potential client captured from various web sources.
 */
const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    // Source of the lead
    howDidYouFindOut: {
        type: String,
        enum: ['website', 'marketing campaign', 'from someone'],
        default: 'website'
    },
    status: { type: String, default: 'Lead' },
    // Detailed contact information added during overhaul
    phone: { type: String },
    company: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Lead', leadSchema);
