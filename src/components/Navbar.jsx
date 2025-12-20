import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 border-b border-base-300 px-8 h-16">
            <div className="flex-1">
                <div className="form-control w-full max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={18} />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            className="input input-bordered w-full pl-10 h-10 bg-base-200 focus:bg-base-100 transition-colors"
                        />
                    </div>
                </div>
            </div>
            <div className="flex-none gap-4">
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <Bell size={20} />
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                            <span className="text-xl">A</span>
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
