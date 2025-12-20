import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * Modal component for capturing new lead information.
 */
const AddLeadModal = ({ isOpen, onClose, onSubmit }) => {
    // STATE: Initial form fields including new contact fields added during overhaul
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        howDidYouFindOut: 'website'
    });
    const [loading, setLoading] = useState(false);

    // If modal is not open, do not render anything
    if (!isOpen) return null;

    /**
     * Updates local state as user types in input fields.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /**
     * Handles form submission and triggers the parent's onSubmit handler.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            // Reset form on success
            setFormData({ name: '', email: '', phone: '', company: '', howDidYouFindOut: 'website' });
            onClose();
        } catch (error) {
            console.error("Submit Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                    <X size={20} />
                </button>

                <h3 className="text-2xl font-bold mb-6">Add New Lead</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Basic Info */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Full Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Type lead name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Email Contact</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Detailed Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Phone</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 890"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Company</span>
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Lead Source */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">How did they find out?</span>
                        </label>
                        <select
                            name="howDidYouFindOut"
                            value={formData.howDidYouFindOut}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="website">website</option>
                            <option value="marketing campaign">marketing campaign</option>
                            <option value="from someone">from someone</option>
                        </select>
                    </div>

                    {/* Form Actions */}
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
                            className={`btn btn-primary px-8 ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLeadModal;
