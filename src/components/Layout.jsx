import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-base-100">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-auto p-8 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
