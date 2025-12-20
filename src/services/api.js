import axios from 'axios';

/**
 * Backend API Base URLs
 */
const BASE_URL = 'http://localhost:5000/api';
const CLIENT_API_URL = `${BASE_URL}/clients`;
const LEAD_API_URL = `${BASE_URL}/leads`;

/**
 * Service class to handle all asynchronous API communication between the React frontend 
 * and the Express backend.
 */
class ApiService {

    /**
     * Fetches all clients from the backend (merges MongoDB and OracleDB clients).
     * @returns {Promise<Object>} Object containing an array of clients in 'data'.
     */
    async getClients() {
        try {
            const response = await axios.get(CLIENT_API_URL);
            return { data: response.data };
        } catch (error) {
            console.error("API Error:", error);
            return { data: [] }; // Return empty array on failure to prevent UI crashes
        }
    }

    /**
     * Creates a new client record in the backend MongoDB.
     * @param {Object} clientData The specific details of the client to add.
     */
    async createClient(clientData) {
        try {
            const response = await axios.post(CLIENT_API_URL, clientData);
            return { data: response.data, message: "Client created successfully" };
        } catch (error) {
            console.error("Create API Error:", error);
            throw error;
        }
    }

    /**
     * Updates an existing client's information.
     * @param {string} id The database ID of the client to update.
     * @param {Object} clientData The new data fields for the client.
     */
    async updateClient(id, clientData) {
        try {
            const response = await axios.put(`${CLIENT_API_URL}/${id}`, clientData);
            return { data: response.data, message: "Client updated successfully" };
        } catch (error) {
            console.error("Update API Error:", error);
            throw error;
        }
    }

    /**
     * Deletes a client record.
     * @param {string} id The unique ID of the client.
     */
    async deleteClient(id) {
        try {
            const response = await axios.delete(`${CLIENT_API_URL}/${id}`);
            return { message: response.data.message };
        } catch (error) {
            console.error("Delete API Error:", error);
            throw error;
        }
    }

    /* ==========================================================================
       Lead Management Methods
       ========================================================================== */

    /**
     * Fetches all potential clients (Leads) from MongoDB.
     */
    async getLeads() {
        try {
            const response = await axios.get(LEAD_API_URL);
            return { data: response.data };
        } catch (error) {
            console.error("Get Leads API Error:", error);
            return { data: [] };
        }
    }

    /**
     * Registers a new lead.
     */
    async createLead(leadData) {
        try {
            const response = await axios.post(LEAD_API_URL, leadData);
            return { data: response.data, message: "Lead added successfully" };
        } catch (error) {
            console.error("Create Lead API Error:", error);
            throw error;
        }
    }

    /**
     * Removes a lead record.
     */
    async deleteLead(id) {
        try {
            const response = await axios.delete(`${LEAD_API_URL}/${id}`);
            return { message: response.data.message };
        } catch (error) {
            console.error("Delete Lead API Error:", error);
            throw error;
        }
    }

    /**
     * Promotes a lead to a client and deletes the original lead record.
     */
    async convertToClient(id) {
        try {
            const response = await axios.post(`${LEAD_API_URL}/convert/${id}`);
            return { data: response.data, message: "Converted to client successfully" };
        } catch (error) {
            console.error("Convert to Client API Error:", error);
            throw error;
        }
    }

    /**
     * Aggregates stats from both Clients and Leads for the high-level dashboard.
     * @returns {Promise<Object>} Aggregated statistical data.
     */
    async getDashboardStats() {
        try {
            // Fetch both data streams concurrently
            const clientsResponse = await this.getClients();
            const leadsResponse = await this.getLeads();

            const clients = clientsResponse.data;
            const leads = leadsResponse.data;

            // Calculate derived metrics
            const totalClients = clients.length;
            const totalLeads = leads.length;
            const activeClients = clients.filter(c => c.status === 'Active').length;
            const totalRevenue = clients.reduce((sum, c) => sum + (c.revenue || 0), 0);

            return {
                data: {
                    totalClients,
                    totalLeads,
                    activeClients,
                    totalRevenue,
                    dbHealth: { oracle: "Online", mongo: "Online" } // Mocked health status
                }
            };
        } catch (error) {
            // Fallback for failed aggregation
            return {
                data: {
                    totalClients: 0, totalLeads: 0, activeClients: 0, totalRevenue: 0,
                    dbHealth: { oracle: "Offline", mongo: "Unknown" }
                }
            };
        }
    }
}

// Export a singleton instance for use across the app
export const api = new ApiService();
