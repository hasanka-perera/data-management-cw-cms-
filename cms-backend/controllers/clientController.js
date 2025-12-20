import Client from '../models/Client.js';
import { connectOracle } from '../db/oracle.js';
import oracledb from 'oracledb';

/**
 * Helper function to fetch client data from the external OracleDB system.
 * This is currently mocked/simplified to demonstrate hybrid database capabilities.
 * @returns {Promise<Array>} A list of clients mapped from OracleDB format to application format.
 */
async function getOracleClients() {
    let connection;
    try {
        connection = await connectOracle();
        // Fetch users from the external Oracle database
        const result = await connection.execute(
            `SELECT id, username, email FROM users`, // Simplified query for demo
            [],
            { outFormat: oracledb.OBJECT }
        );

        // Map Oracle-specific fields to our standard application client structure
        return result.rows.map(row => ({
            id: row.ID || row.id,
            name: row.USERNAME || row.username,
            email: row.EMAIL || row.email,
            source: 'OracleDB',
            status: 'Active',
            revenue: 0
        }));
    } catch (err) {
        // Silent failure: return empty array to ensure main dashboard still loads MongoDB data
        console.error("Oracle Fetch Error (Returning empty to prevent crash):", err.message);
        return [];
    } finally {
        if (connection) {
            try { await connection.close(); } catch (e) { }
        }
    }
}

/**
 * GET all clients from both MongoDB and OracleDB.
 */
export const getClients = async (req, res) => {
    try {
        // 1. Fetch persistent clients from MongoDB
        const mongoClients = await Client.find();

        // 2. Fetch external clients from OracleDB (Currently disabled/empty for performance)
        const oracleClients = [];

        // 3. Merge and normalize results
        const allClients = [
            ...mongoClients.map(c => ({
                id: c._id,
                clientId: c.clientId || 'N/A',
                name: c.name,
                email: c.email,
                source: 'MongoDB',
                status: c.status,
                revenue: c.revenue
            })),
            ...oracleClients
        ];

        res.status(200).json(allClients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * POST a new client to MongoDB.
 * Generates a zero-padded 3-digit clientId (e.g., 001, 002).
 */
export const createClient = async (req, res) => {
    const { name, email, revenue, status, phone, company, address } = req.body;

    try {
        // Auto-increment logic: find the highest current ID
        const highestIdClient = await Client.findOne({ clientId: { $exists: true } }).sort({ clientId: -1 });

        let nextIdNum = 1;
        if (highestIdClient && highestIdClient.clientId) {
            const lastIdNum = parseInt(highestIdClient.clientId, 10);
            if (!isNaN(lastIdNum)) {
                nextIdNum = lastIdNum + 1;
            }
        }

        // Hard limit for basic version
        if (nextIdNum > 999) {
            return res.status(400).json({ message: "Client limit (999) reached for this version." });
        }

        const nextIdStr = String(nextIdNum).padStart(3, '0');

        const newClient = new Client({
            clientId: nextIdStr,
            name,
            email,
            status: status || 'Active',
            revenue: Number(revenue) || 0,
            phone,
            company,
            address,
            source: 'MongoDB'
        });

        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * DELETE a client by ID.
 * Distinguishes between MongoDB (long ID) and Oracle (short ID).
 */
export const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        // If ID looks like a MongoDB ObjectID (24 chars), delete from Mongo
        if (id.length > 20) {
            const result = await Client.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({ message: 'Client not found in MongoDB' });
            }
            res.json({ message: 'Client deleted from MongoDB' });
        } else {
            // Otherwise, attempt removal from OracleDB
            let connection;
            try {
                connection = await connectOracle();
                await connection.execute(
                    `DELETE FROM users WHERE id = :id`,
                    [id],
                    { autoCommit: true }
                );
                res.json({ message: 'Client deleted from OracleDB' });
            } finally {
                if (connection) try { await connection.close(); } catch (e) { }
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * PATCH/PUT update an existing MongoDB client.
 */
export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email, revenue, status, phone, company, address } = req.body;

    try {
        if (id.length > 20) {
            const updatedClient = await Client.findByIdAndUpdate(
                id,
                { name, email, revenue: Number(revenue), status, phone, company, address },
                { new: true }
            );
            if (!updatedClient) {
                return res.status(404).json({ message: 'Client not found in MongoDB' });
            }
            res.json(updatedClient);
        } else {
            return res.status(400).json({ message: "Oracle editing not implemented in this version" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
