import React from 'react';
import { X, Mail, User, DollarSign, Activity, Phone, Briefcase, MapPin } from 'lucide-react';

/**
 * Detailed Information Modal
 * Displays a full profile view for a specific client, including advanced details like
 * company info, phone, and address.
 */
const ClientDetailsModal = ({ isOpen, onClose, client, onEdit }) => {
    // Basic validation to prevent null renders
    if (!isOpen || !client) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box relative border border-base-300 bg-base-100 p-0 overflow-hidden rounded-2xl">
                {/* Header */}
                <div className="bg-base-200 px-6 py-4 flex items-center justify-between border-b border-base-300">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <User className="text-primary" size={20} />
                        Client Profile
                    </h3>
                    <div className="flex items-center gap-2">
                        {/* Edit Shortcut */}
                        <button
                            className="btn btn-ghost btn-sm btn-circle"
                            onClick={() => onEdit(client)}
                            title="Edit Client"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-5">
                    {/* Hero Section: Name */}
                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                        <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Full Name</div>
                        <div className="font-bold text-2xl text-base-content">{client.name}</div>
                    </div>

                    {/* Contact & Status Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-base-200/50 border border-base-300 rounded-lg">
                            <div className="flex items-center gap-2 text-xs text-base-content/50 font-bold uppercase mb-1">
                                <Mail size={12} /> Email
                            </div>
                            <div className="font-medium truncate" title={client.email}>{client.email}</div>
                        </div>

                        <div className="p-3 bg-base-200/50 border border-base-300 rounded-lg">
                            <div className="flex items-center gap-2 text-xs text-base-content/50 font-bold uppercase mb-1">
                                <Activity size={12} /> Status
                            </div>
                            <div className={`badge badge-sm font-bold ${client.status === 'Active' ? 'badge-primary' : 'badge-ghost'}`}>
                                {client.status || 'Unknown'}
                            </div>
                        </div>

                        <div className="p-3 bg-base-200/50 border border-base-300 rounded-lg">
                            <div className="flex items-center gap-2 text-xs text-base-content/50 font-bold uppercase mb-1">
                                <DollarSign size={12} /> Revenue
                            </div>
                            <div className="font-bold text-success">${client.revenue?.toLocaleString() || 0}</div>
                        </div>

                        <div className="p-3 bg-base-200/50 border border-base-300 rounded-lg">
                            <div className="flex items-center gap-2 text-xs text-base-content/50 font-bold uppercase mb-1">
                                <Phone size={12} /> Phone
                            </div>
                            <div className="font-medium">{client.phone || 'N/A'}</div>
                        </div>

                        <div className="col-span-full p-3 bg-base-200/50 border border-base-300 rounded-lg">
                            <div className="flex items-center gap-2 text-xs text-base-content/50 font-bold uppercase mb-1">
                                <Briefcase size={12} /> Company
                            </div>
                            <div className="font-medium">{client.company || 'Private Individual / Not Specified'}</div>
                        </div>
                    </div>

                    {/* Address: Only shown if available */}
                    {client.address && (
                        <div className="p-4 bg-base-200 rounded-lg border border-base-300">
                            <div className="flex items-center gap-2 text-xs text-base-content/50 font-bold uppercase mb-2">
                                <MapPin size={12} /> Physical Address
                            </div>
                            <div className="font-medium text-sm leading-relaxed">{client.address}</div>
                        </div>
                    )}

                    {/* System Footer Info */}
                    <div className="text-[10px] text-base-content/40 mt-6 flex justify-between px-2">
                        <span>DATABASE ID: {client.id}</span>
                        <span>CLIENT REF: {client.clientId || 'INTERNAL'}</span>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-base-200/30 border-t border-base-300 flex justify-end">
                    <button className="btn btn-sm px-6" onClick={onClose}>Done</button>
                </div>
            </div>
            {/* Backdrop click to close */}
            <div className="modal-backdrop bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
        </div>
    );
};

export default ClientDetailsModal;
