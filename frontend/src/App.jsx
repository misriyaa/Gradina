import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManagerDashboard from './pages/Manager/ManagerDashboard';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roleRequired && user.role !== roleRequired) return <Navigate to="/" />;
  
  return children;
};

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <div className="flex">
        {user && <Sidebar />}
        <main className="flex-1 bg-gray-50 min-h-screen overflow-auto">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                {user?.role === 'admin' ? <AdminDashboard /> : <ManagerDashboard />}
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
