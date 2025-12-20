import React, { useEffect, useState } from 'react';
import AddClientModal from '../components/AddClientModal';
import ClientDetailsModal from '../components/ClientDetailsModal';
import EditClientModal from '../components/EditClientModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ClientTable from '../components/ClientTable';
import { api } from '../services/api';
import { Plus, Search } from 'lucide-react';

/**
 * Client Management Page
 * Handles CRUD operations for clients across hybrid databases.
 */
const ClientList = () => {
    // STATE: Core client data
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Details Modal: Controls detailed profile view
    const [selectedClient, setSelectedClient] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Delete Modal: Controls deletion confirmation flow
    const [clientToDelete, setClientToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Edit Modal: Controls client information updates
    const [clientToEdit, setClientToEdit] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    /**
     * Loads the master list of clients from the backend.
     */
    const loadClients = async () => {
        setLoading(true);
        try {
            const response = await api.getClients();
            setClients(response.data);
        } catch (error) {
            console.error("Failed to fetch clients", error);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        loadClients();
    }, []);

    /**
     * Initializes the deletion process by opening the confirmation modal.
     */
    const handleDeleteClick = (id) => {
        const client = clients.find(c => c.id === id);
        if (client) {
            setClientToDelete(client);
            setIsDeleteModalOpen(true);
        }
    };

    /**
     * Executes the final deletion once user confirms.
     */
    const confirmDelete = async () => {
        if (!clientToDelete) return;

        try {
            await api.deleteClient(clientToDelete.id);
            await loadClients(); // Refresh table
            setIsDeleteModalOpen(false);
            setClientToDelete(null);
        } catch (error) {
            console.error("Failed to delete client", error);
            alert("Failed to delete client");
        }
    };

    const handleCreateClick = () => {
        setIsModalOpen(true);
    };

    /**
     * Opens the detailed profile modal for a specific client.
     */
    const handleViewClick = (client) => {
        setSelectedClient(client);
        setIsDetailsOpen(true);
    };

    /**
     * Initializes the edit flow.
     */
    const handleEditClick = (client) => {
        setClientToEdit(client);
        setIsEditModalOpen(true);
        setIsDetailsOpen(false); // Ensure only one modal is open
    };

    /**
     * Sends update payload to API and refreshes UI.
     */
    const handleEditSubmit = async (id, formData) => {
        try {
            await api.updateClient(id, formData);
            await loadClients();
        } catch (error) {
            console.error("Failed to update client", error);
            throw error;
        }
    };

    /**
     * Handles new client submissions with detailed contact info.
     */
    const handleClientSubmit = async (formData) => {
        try {
            // Prepare payload including detailed fields
            const payload = {
                name: formData.name,
                email: formData.email,
                revenue: formData.revenue,
                status: formData.status,
                phone: formData.phone,
                company: formData.company,
                address: formData.address
            };
            await api.createClient(payload);
            await loadClients();
        } catch (error) {
            console.error("Failed to create client", error);
            alert(`Failed to create client: ${error.message}`);
        }
    };

    /**
     * CLIENT-SIDE SEARCH
     * Filters the clients array in real-time.
     */
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.clientId?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fade-in">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold">Client Management</h2>
                    <p className="text-gray-500 mt-1">Manage active account profiles and database records</p>
                </div>
                <button
                    onClick={handleCreateClick}
                    className="btn btn-primary gap-2"
                >
                    <Plus size={20} />
                    Add Client
                </button>
            </div>

            {/* Global Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search clients by name, email, ID or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered w-full pl-10 bg-base-200"
                />
            </div>

            {/* Results Table View */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : (
                <ClientTable
                    clients={filteredClients}
                    onDelete={handleDeleteClick}
                    onEdit={handleEditClick}
                    onView={(id) => {
                        const client = clients.find(c => c.id === id);
                        if (client) handleViewClick(client);
                    }}
                />
            )}

            {/* CRUD Modals */}
            <AddClientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleClientSubmit}
            />

            <ClientDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                client={selectedClient}
                onEdit={handleEditClick}
            />

            <EditClientModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditSubmit}
                client={clientToEdit}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                clientName={clientToDelete?.name}
            />
        </div>
    );
};

export default ClientList;
