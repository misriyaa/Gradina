import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from './ui/button';

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">Gradina</div>
      <nav className="flex-1 p-4 space-y-2">
        {user.role === 'admin' ? (
          <>
            <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-800">Dashboard</Link>
            <Link to="/sites" className="block px-4 py-2 rounded hover:bg-gray-800">Sites</Link>
            <Link to="/managers" className="block px-4 py-2 rounded hover:bg-gray-800">Managers</Link>
          </>
        ) : (
          <>
            <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-800">Dashboard</Link>
            <Link to="/attendance" className="block px-4 py-2 rounded hover:bg-gray-800">Attendance</Link>
            <Link to="/transactions" className="block px-4 py-2 rounded hover:bg-gray-800">Transactions</Link>
          </>
        )}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="mb-2 text-sm text-gray-400">Logged in as {user.username}</div>
        <Button variant="destructive" className="w-full" onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
