import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

const ClientTable = ({ clients, onView, onDelete, onEdit }) => {


    const getStatusBadge = (status) => {
        switch (status) {
            case 'Active': return 'badge-success';
            case 'Inactive': return 'badge-error';
            case 'Pending': return 'badge-warning';
            default: return 'badge-ghost';
        }
    };

    return (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table w-full">
                <thead>
                    <tr className="bg-base-200 text-base-content/70">
                        <th>ID</th>
                        <th>Client</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Revenue</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="hover:bg-base-200/50 transition-colors">
                            <td className="font-mono text-xs opacity-50">#{client.clientId || client.id.substring(0, 6)}</td>
                            <td>
                                <div className="font-bold">{client.name}</div>
                            </td>
                            <td className="text-sm">{client.email}</td>

                            <td>
                                <div className={`badge badge-xs gap-2 ${getStatusBadge(client.status)}`}>
                                    {client.status}
                                </div>
                            </td>
                            <td className="font-mono">${client.revenue?.toLocaleString()}</td>
                            <td className="text-right space-x-2">
                                <button
                                    onClick={() => onView(client.id)}
                                    className="btn btn-ghost btn-xs btn-square hover:bg-info hover:text-info-content"
                                    title="View Details"
                                >
                                    <Eye size={16} />
                                </button>
                                <button
                                    onClick={() => onEdit(client)}
                                    className="btn btn-ghost btn-xs btn-square hover:bg-warning hover:text-warning-content"
                                    title="Edit Client"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(client.id)}
                                    className="btn btn-ghost btn-xs btn-square hover:bg-error hover:text-error-content text-error/70"
                                    title="Delete Client"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {clients.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-8 text-base-content/50">
                                No clients found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTable;
