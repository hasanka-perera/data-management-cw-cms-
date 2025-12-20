import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const EditClientModal = ({ isOpen, onClose, onSubmit, client }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        revenue: '',
        status: 'Active',
        phone: '',
        company: '',
        address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name || '',
                email: client.email || '',
                revenue: client.revenue || '',
                status: client.status || 'Active',
                phone: client.phone || '',
                company: client.company || '',
                address: client.address || ''
            });
        }
    }, [client]);

    if (!isOpen || !client) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(client.id, formData);
            onClose();
        } catch (error) {
            console.error("Submit error", error);
            alert("Failed to update client");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="modal-box bg-base-100 w-full max-w-md p-6 rounded-lg shadow-xl relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    <X size={20} />
                </button>

                <h3 className="font-bold text-lg mb-6 text-base-content">Edit Client</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Client Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full focus:input-primary"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email Address</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full focus:input-primary"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="input input-bordered w-full focus:input-primary"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Company</span>
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="input input-bordered w-full focus:input-primary"
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="input input-bordered w-full focus:input-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Revenue</span>
                            </label>
                            <input
                                type="number"
                                name="revenue"
                                value={formData.revenue}
                                onChange={handleChange}
                                className="input input-bordered w-full focus:input-primary"
                                min="0"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Status</span>
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="select select-bordered w-full focus:select-primary"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-action mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`btn btn-primary gap-2 ${isSubmitting ? 'loading' : ''}`}
                            disabled={isSubmitting}
                        >
                            {!isSubmitting && <Save size={18} />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditClientModal;
