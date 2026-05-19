import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export default function ManagerDashboard() {
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
      <h1 className="text-3xl font-bold mb-6">Dashboard - {stats.siteName || 'Unassigned'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Site Budget</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">${stats.budget?.toLocaleString() || 0}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Today's Attendance</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{stats.todayAttendance} Present</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">This Month's Spending</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">${stats.thisMonthSpending.toLocaleString()}</div></CardContent>
        </Card>
      </div>
    </div>
  );
}
