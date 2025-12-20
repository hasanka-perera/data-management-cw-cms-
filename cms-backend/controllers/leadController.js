import Lead from '../models/Lead.js';
import Client from '../models/Client.js';

/**
 * GET all leads from MongoDB.
 * Sorted by newest first.
 */
export const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * POST a new lead to the database.
 */
export const createLead = async (req, res) => {
    const { name, email, howDidYouFindOut, phone, company } = req.body;
    try {
        const newLead = new Lead({ name, email, howDidYouFindOut, phone, company });
        await newLead.save();
        res.status(201).json(newLead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * DELETE a lead by its ID.
 */
export const deleteLead = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Lead.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ message: "Lead not found" });
        res.json({ message: "Lead deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Promotes a Lead to a Client.
 * Creates a new Client record with all detailed contact info and removes the Lead record.
 */
export const convertToClient = async (req, res) => {
    const { id } = req.params;
    try {
        // 1. Verify lead existence
        const lead = await Lead.findById(id);
        if (!lead) return res.status(404).json({ message: "Lead not found" });

        // 2. Generate a unique 3-digit clientId for the new client
        const highestIdClient = await Client.findOne({ clientId: { $exists: true } }).sort({ clientId: -1 });
        let nextIdNum = 1;
        if (highestIdClient && highestIdClient.clientId) {
            const lastIdNum = parseInt(highestIdClient.clientId, 10);
            if (!isNaN(lastIdNum)) {
                nextIdNum = lastIdNum + 1;
            }
        }
        const nextIdStr = String(nextIdNum).padStart(3, '0');

        // 3. Create the new Client record using Lead data
        const newClient = new Client({
            clientId: nextIdStr,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            status: 'Active',
            revenue: 0,
            source: 'MongoDB'
        });

        await newClient.save();

        // 4. Cleanup: Remove the original lead record
        await Lead.findByIdAndDelete(id);

        res.status(201).json({ message: "Lead converted to client successfully", client: newClient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
