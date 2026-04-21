import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface WarehouseStats {
  total: number;
  totalCapacity: number;
  averageUtilization: number;
  available: number;
}

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
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
      
      // Load warehouse statistics only for customers
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
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
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
              LogiFlow
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-electric font-medium">Dashboard</Link>
              <Link to="/book-warehouse" className="text-slate-600 hover:text-electric transition-colors">Book Warehouse</Link>
              <Link to="/book-ocean-freight" className="text-slate-600 hover:text-electric transition-colors">Ocean Freight</Link>
              <Link to="/book-last-mile" className="text-slate-600 hover:text-electric transition-colors">Last Mile</Link>
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
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy mb-2">
            Welcome back, {user?.firstName}! 
          </h1>
          <p className="text-slate-600">
            Here's what's happening with your logistics operations today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

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
            <h3 className="text-lg font-bold text-navy mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                to="/book-warehouse"
                className="block w-full text-center px-3 py-2 bg-electric hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
              >
                Book Warehouse
              </Link>
              <Link
                to="/book-ocean-freight"
                className="block w-full text-center px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors"
              >
                Ocean Freight
              </Link>
              <Link
                to="/book-last-mile"
                className="block w-full text-center px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors"
              >
                Last Mile Delivery
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="text-sm text-slate-500">Activity</span>
            </div>
            <h3 className="text-lg font-bold text-navy mb-3">Recent</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-600">Warehouse booking available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-slate-600">Ocean freight ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-slate-600">Last mile delivery active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Services Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-xl font-bold text-navy mb-4">Logistics Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/book-warehouse"
                  className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-navy mb-1">Smart Warehousing</h3>
                  <p className="text-sm text-slate-600">Book warehouse space for your inventory</p>
                </Link>

                <Link
                  to="/book-ocean-freight"
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-navy mb-1">Ocean Freight</h3>
                  <p className="text-sm text-slate-600">International shipping solutions</p>
                </Link>

                <Link
                  to="/book-last-mile"
                  className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-navy mb-1">Last Mile Delivery</h3>
                  <p className="text-sm text-slate-600">Final delivery to your customers</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-xl font-bold text-navy mb-4">Performance Metrics</h2>
              <div className="space-y-4">
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
                    <span className="text-slate-600">Service Availability</span>
                    <span className="font-medium text-navy">98%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
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
