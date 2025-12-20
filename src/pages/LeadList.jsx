import React, { useEffect, useState } from 'react';
import AddLeadModal from '../components/AddLeadModal';
import { api } from '../services/api';
import { Plus, CheckCircle, Trash2, Search, Filter } from 'lucide-react';

/**
 * Lead Management Page
 * Allows viewing, searching, filtering, and converting potential clients.
 */
const LeadList = () => {
    // STATE: Lead data and UI controls
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSource, setFilterSource] = useState('all');

    /**
     * Fetches fresh lead data from the backend.
     */
    const loadLeads = async () => {
        setLoading(true);
        try {
            const response = await api.getLeads();
            setLeads(response.data);
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoading(false);
        }
    };

    // Initial load on mount
    useEffect(() => {
        loadLeads();
    }, []);

    const handleCreateClick = () => {
        setIsModalOpen(true);
    };

    /**
     * Submits the new lead form to the backend and refreshes the list.
     */
    const handleLeadSubmit = async (formData) => {
        try {
            await api.createLead(formData);
            await loadLeads();
        } catch (error) {
            console.error("Failed to create lead", error);
            alert(`Failed to create lead: ${error.message}`);
        }
    };

    /**
     * Promotes a Lead to a Client.
     * Triggers the conversion API which handles data transfer and lead deletion.
     */
    const handleConfirm = async (id) => {
        try {
            await api.convertToClient(id);
            await loadLeads(); // Refresh list to reflect removal of the lead
            alert("Lead successfully converted to client!");
        } catch (error) {
            console.error("Failed to convert lead", error);
            alert("Failed to convert lead to client");
        }
    };

    /**
     * Deletes a lead record with user confirmation.
     */
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this lead?")) return;
        try {
            await api.deleteLead(id);
            await loadLeads();
        } catch (error) {
            console.error("Failed to delete lead", error);
            alert("Failed to delete lead");
        }
    };

    /**
     * CLIENT-SIDE FILTERING & SEARCH
     * Filters the leads array based on the search query and discovery source.
     */
    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterSource === 'all' || lead.howDidYouFindOut === filterSource;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="fade-in">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold">Lead Management</h2>
                    <p className="text-gray-500 mt-1">Manage potential clients and convert them to active accounts</p>
                </div>
                <button
                    onClick={handleCreateClick}
                    className="btn btn-primary gap-2"
                >
                    <Plus size={20} />
                    Add Lead
                </button>
            </div>

            {/* Search and Filter Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 bg-base-200 p-4 rounded-xl">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search leads by name, email or company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input input-bordered w-full pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400" size={18} />
                    <select
                        value={filterSource}
                        onChange={(e) => setFilterSource(e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="all">All Sources</option>
                        <option value="website">Website</option>
                        <option value="marketing campaign">Marketing Campaign</option>
                        <option value="from someone">From Someone</option>
                    </select>
                </div>
            </div>

            {/* Results Table */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg">
                    <table className="table w-full">
                        <thead className="bg-base-200 text-base-content/70">
                            <tr>
                                <th>Name</th>
                                <th>Contact (Email)</th>
                                <th>Discovery Source</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-400">
                                        No leads found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr key={lead._id} className="hover:bg-base-200 transition-colors">
                                        <td>
                                            <div className="font-bold">{lead.name}</div>
                                            <div className="text-xs text-gray-500">{lead.company || 'Private Individual'}</div>
                                        </td>
                                        <td>
                                            <div className="font-medium text-base-content/80 text-sm">{lead.email}</div>
                                            <div className="text-xs text-gray-500">{lead.phone || 'No phone'}</div>
                                        </td>
                                        <td>
                                            <span className="badge badge-outline capitalize font-medium text-xs">{lead.howDidYouFindOut}</span>
                                        </td>
                                        <td>
                                            <span className="badge badge-info text-xs font-bold">{lead.status}</span>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleConfirm(lead._id)}
                                                    className="btn btn-sm btn-success gap-2"
                                                    title="Promote to Client"
                                                >
                                                    <CheckCircle size={16} />
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(lead._id)}
                                                    className="btn btn-sm btn-square btn-ghost text-error"
                                                    title="Delete Lead"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Components */}
            <AddLeadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleLeadSubmit}
            />
        </div>
    );
};

export default LeadList;
