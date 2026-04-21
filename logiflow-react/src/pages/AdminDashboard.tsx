import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface FleetStats {
  total: number;
  active: number;
  inTransit: number;
  maintenance: number;
}

interface WarehouseStats {
  total: number;
  totalCapacity: number;
  averageUtilization: number;
  available: number;
}

export const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fleetStats, setFleetStats] = useState<FleetStats | null>(null);
  const [warehouseStats, setWarehouseStats] = useState<WarehouseStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication and load user data
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      // Redirect to home if not authenticated
      window.location.href = '/';
      return;
    }

    try {
      setUser(JSON.parse(userData));
      loadDashboardData();
    } catch (error) {
      console.error('Error parsing user data:', error);
      window.location.href = '/';
    }
  }, []);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Load fleet statistics for admin
      const fleetResponse = await fetch('http://localhost:5000/api/fleet/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (fleetResponse.ok) {
        const fleetData = await fleetResponse.json();
        setFleetStats(fleetData.data);
      }

      // Load warehouse statistics for admin
      const warehouseResponse = await fetch('http://localhost:5000/api/warehouse/warehouses/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (warehouseResponse.ok) {
        const warehouseData = await warehouseResponse.json();
        setWarehouseStats(warehouseData.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-navy flex items-center gap-2">
              <svg className="w-8 h-8 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              LogiFlow Admin
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link to="/admin" className="text-electric font-medium">Dashboard</Link>
              <Link to="/global-fleet-map" className="text-slate-600 hover:text-electric transition-colors">Fleet Map</Link>
              <Link to="/overview" className="text-slate-600 hover:text-electric transition-colors">Overview</Link>
              <Link to="/personnel" className="text-slate-600 hover:text-electric transition-colors">Personnel</Link>
              <Link to="/revenue-hub" className="text-slate-600 hover:text-electric transition-colors">Revenue Hub</Link>
              
              {/* User profile section */}
              <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-slate-500">{user?.role}</p>
                </div>
                <div className="w-8 h-8 bg-electric text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600">
            Complete fleet management and system oversight.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Fleet Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <span className="text-sm text-slate-500">Fleet</span>
            </div>
            <h3 className="text-2xl font-bold text-navy mb-1">{fleetStats?.total || 0}</h3>
            <p className="text-sm text-slate-600">Total Vehicles</p>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Active: {fleetStats?.active || 0}</span>
                <span className="text-blue-600">In Transit: {fleetStats?.inTransit || 0}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-orange-600">Maintenance: {fleetStats?.maintenance || 0}</span>
              </div>
            </div>
          </div>

          {/* Warehouse Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <span className="text-sm text-slate-500">Warehouses</span>
            </div>
            <h3 className="text-2xl font-bold text-navy mb-1">{warehouseStats?.total || 0}</h3>
            <p className="text-sm text-slate-600">Total Facilities</p>
            <div className="mt-3">
              <div className="text-xs text-slate-600">
                Avg Utilization: {warehouseStats?.averageUtilization?.toFixed(1) || 0}%
              </div>
              <div className="text-xs text-green-600">
                Available: {warehouseStats?.available || 0}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <span className="text-sm text-slate-500">Actions</span>
            </div>
            <h3 className="text-lg font-bold text-navy mb-3">Admin Actions</h3>
            <div className="space-y-2">
              <Link
                to="/global-fleet-map"
                className="block w-full text-center px-3 py-2 bg-electric hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
              >
                Manage Fleet
              </Link>
              <Link
                to="/personnel"
                className="block w-full text-center px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors"
              >
                Manage Personnel
              </Link>
              <Link
                to="/revenue-hub"
                className="block w-full text-center px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors"
              >
                View Revenue
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="text-sm text-slate-500">System</span>
            </div>
            <h3 className="text-lg font-bold text-navy mb-3">System Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-600">All systems operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-slate-600">Database connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-slate-600">API services active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fleet Management */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-xl font-bold text-navy mb-4">Fleet Management</h2>
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 text-electric mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                <h3 className="text-lg font-semibold text-navy mb-2">Interactive Fleet Map</h3>
                <p className="text-slate-600 mb-4">Monitor and manage your entire fleet in real-time</p>
                <Link
                  to="/global-fleet-map"
                  className="inline-flex items-center px-4 py-2 bg-electric hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Open Fleet Management
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-xl font-bold text-navy mb-4">Performance Metrics</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Fleet Efficiency</span>
                    <span className="font-medium text-navy">85%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Warehouse Utilization</span>
                    <span className="font-medium text-navy">{warehouseStats?.averageUtilization?.toFixed(1) || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${warehouseStats?.averageUtilization || 0}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">On-Time Delivery</span>
                    <span className="font-medium text-navy">92%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">System Uptime</span>
                    <span className="font-medium text-navy">99.9%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
