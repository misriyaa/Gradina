import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const StatCard = ({ label, value, icon, accent }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${accent}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-3xl sm:text-4xl font-bold text-[#002042] leading-none">{value}</p>
    </div>
    {/* decorative bar */}
    <div className={`absolute bottom-0 left-0 h-1 w-full ${accent.replace('bg-', 'bg-').replace('text-', 'bg-')}`} />
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get('/stats/dashboard')
      .then(res => setStats(res.data))
      .catch(() => setError(true));
  }, []);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <p className="text-red-500 text-sm">Failed to load dashboard stats.</p>
    </div>
  );

  if (!stats) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-[#002042] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400 tracking-wide">Loading dashboard…</p>
      </div>
    </div>
  );

  const cards = [
    {
      label: 'Total Sites',
      value: stats.totalSites ?? 0,
      icon: '🏗️',
      accent: 'bg-blue-50 text-blue-500',
    },
    {
      label: 'Total Managers',
      value: stats.totalManagers ?? 0,
      icon: '👷',
      accent: 'bg-amber-50 text-amber-500',
    },
    {
      label: 'Workers Present Today',
      value: stats.totalWorkersPresentToday ?? 0,
      icon: '✅',
      accent: 'bg-green-50 text-green-500',
    },
    {
      label: 'Monthly Payroll',
      value: `₹${(stats.totalMonthlyPayroll ?? 0).toLocaleString('en-IN')}`,
      icon: '💰',
      accent: 'bg-purple-50 text-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Overview</p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002042]">Admin Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

    </div>
  );
}