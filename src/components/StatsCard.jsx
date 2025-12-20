import React from 'react';

const StatsCard = ({ title, value, icon: Icon, description, trend, color = 'primary' }) => {
    return (
        <div className="stats shadow bg-base-100 hover:shadow-lg transition-shadow duration-200">
            <div className="stat">
                <div className={`stat-figure text-${color}`}>
                    {Icon && <Icon size={32} />}
                </div>
                <div className="stat-title font-medium">{title}</div>
                <div className={`stat-value text-${color} text-3xl`}>{value}</div>
                {description && <div className="stat-desc mt-1">{description}</div>}
                {trend && (
                    <div className={`stat-desc flex items-center gap-1 ${trend > 0 ? 'text-success' : 'text-error'}`}>
                        {trend > 0 ? '↗︎' : '↘︎'} {Math.abs(trend)}%
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
