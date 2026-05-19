import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Total Sites</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{stats.totalSites}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Total Managers</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{stats.totalManagers}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Workers Present Today</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{stats.totalWorkersPresentToday}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Total Monthly Payroll</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">${stats.totalMonthlyPayroll.toLocaleString()}</div></CardContent>
        </Card>
      </div>
    </div>
  );
}
