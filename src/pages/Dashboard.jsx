import React, { useEffect, useState } from 'react';
import StatsCard from '../components/StatsCard';
import { api } from '../services/api';
import { Users, DollarSign, Activity, Target } from 'lucide-react';

/**
 * Main Dashboard Page
 * Visualizes high-level business metrics across clients and leads.
 */
const Dashboard = () => {
    // STATE: Statistical data from the backend
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // EFFECT: Fetch fresh stats once the component mounts
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.getDashboardStats();
                setStats(response.data);
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // RENDER: Loading spinner while fetching data
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="fade-in">
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Clients Stat: Merged MongoDB and OracleDB data */}
                <StatsCard
                    title="Total Clients"
                    value={stats?.totalClients}
                    icon={Users}
                    description="Across all databases"
                    trend={12}
                    color="primary"
                />

                {/* Total Leads Stat: New potential client pipeline */}
                <StatsCard
                    title="Total Leads"
                    value={stats?.totalLeads || 0}
                    icon={Target}
                    description="New sign-ups"
                    color="info"
                />

                {/* Financial Metric: Displayed in Thousands (k) */}
                <StatsCard
                    title="Total Revenue"
                    value={`$${(stats?.totalRevenue / 1000).toFixed(1)} k`}
                    icon={DollarSign}
                    description="Monthly Recurring"
                    trend={5.4}
                    color="secondary"
                />

                {/* Operational Stat: Active billing count */}
                <StatsCard
                    title="Active Clients"
                    value={stats?.activeClients}
                    icon={Activity}
                    description="Currently billing"
                    color="accent"
                />
            </div>
        </div>
    );
};

export default Dashboard;
