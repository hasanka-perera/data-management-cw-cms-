import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Leads', path: '/leads', icon: Users },
        { name: 'Clients', path: '/clients', icon: Users },
    ];

    return (
        <div className="w-64 premium-sidebar min-h-screen text-slate-100 flex flex-col border-r border-white/5">
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <LayoutDashboard className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">CMS <span className="text-indigo-400">Pro</span></h1>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                ? 'premium-gradient text-white shadow-lg shadow-indigo-500/20 translate-x-1'
                                : 'hover:bg-white/5 text-slate-400 hover:text-white'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-base-300">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-base-300 text-error transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
