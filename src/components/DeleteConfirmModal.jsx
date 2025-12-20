import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, clientName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box relative border border-error/20 bg-base-100">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                    ✕
                </button>

                <h3 className="text-lg font-bold flex items-center gap-2 text-error">
                    <AlertTriangle size={24} />
                    Confirm Deletion
                </h3>

                <p className="py-4">
                    Are you sure you want to delete <span className="font-semibold">{clientName}</span>?
                    <br />
                    <span className="text-sm opacity-70">This action cannot be undone.</span>
                </p>

                <div className="modal-action">
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-error"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
};

export default DeleteConfirmModal;
