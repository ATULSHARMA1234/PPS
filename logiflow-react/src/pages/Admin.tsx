import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWarehouses, addWarehouse, Warehouse } from '../utils/storage';

export const Admin: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    // Initialize admin dashboard
    console.log('Admin portal loaded');
    setWarehouses(getWarehouses());
  }, []);

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="bg-slate-50 text-slate-800 flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col transition-all">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <Link to="/admin" className="text-2xl font-bold flex items-center gap-2">
            <svg className="w-6 h-6 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            LogiFlow <span className="text-xs text-electric border border-electric rounded px-1 ml-1">ADMIN</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link to="/overview" className="flex items-center gap-3 px-4 py-3 bg-electric/20 text-electric rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            Overview
          </Link>
          <Link to="/personnel" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Personnel
          </Link>
          <Link to="/revenue-hub" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Revenue Hub
          </Link>
          <Link to="/global-fleet-map" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Global Fleet Map
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=2563EB&color=fff" className="w-10 h-10 rounded-lg" alt="Admin" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Super Admin</p>
              <p className="text-xs text-slate-400 truncate">admin@logiflow.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div>
            <h1 className="text-2xl font-bold text-navy">Global Command Center</h1>
            <p className="text-sm text-slate-500">Updated live reporting</p>
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-6 font-medium">
              <Link to="/overview" className="text-slate-600 hover:text-electric transition-colors">Overview</Link>
              <Link to="/revenue-hub" className="text-slate-600 hover:text-electric transition-colors">Revenue Hub</Link>
              <Link to="/global-fleet-map" className="text-slate-600 hover:text-electric transition-colors">Global Fleet Map</Link>
              <Link to="/personnel" className="text-slate-600 hover:text-electric transition-colors">Personnel</Link>
            </nav>
            <div className="h-8 w-px bg-slate-200 hidden lg:block"></div>
            <button
              onClick={() => showToastNotification('System Alert: Heavy Port Congestion reported in Chennai LogiHub.')}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 focus:outline-none transition-colors border border-slate-200 relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 text-electric rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
              </div>
              <div className="text-3xl font-bold text-navy mb-1">1,247</div>
              <div className="text-sm text-slate-600">Active Shipments</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+0.3%</span>
              </div>
              <div className="text-3xl font-bold text-navy mb-1">99.8%</div>
              <div className="text-sm text-slate-600">On-Time Delivery</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+18%</span>
              </div>
              <div className="text-3xl font-bold text-navy mb-1">$2.4M</div>
              <div className="text-sm text-slate-600">Monthly Revenue</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+5%</span>
              </div>
              <div className="text-3xl font-bold text-navy mb-1">847</div>
              <div className="text-sm text-slate-600">Active Vehicles</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
            <h2 className="text-xl font-bold text-navy mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="px-4 py-3 bg-electric text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
                Generate Report
              </button>
              <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium">
                Manage Users
              </button>
              <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium">
                System Settings
              </button>
            </div>
          </div>

          {/* Warehouse Fleet Management */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
            <h2 className="text-xl font-bold text-navy mb-2">Warehouse Fleet Management</h2>
            <p className="text-sm text-slate-500 mb-6">Monitor and establish new Smart Warehouses globally.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add New Warehouse */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-navy mb-4">Add New Facility</h3>
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    const form = e.target as HTMLFormElement;
                    const wName = (form.elements.namedItem('wName') as HTMLInputElement).value;
                    const wLoc = (form.elements.namedItem('wLoc') as HTMLInputElement).value;
                    const wCap = parseInt((form.elements.namedItem('wCap') as HTMLInputElement).value, 10);
                    
                    const newWh = {
                      id: `W-00${warehouses.length + 1}`,
                      name: wName,
                      location: wLoc,
                      totalCapacity: wCap,
                      availableCapacity: wCap
                    };
                    addWarehouse(newWh);
                    setWarehouses(getWarehouses());
                    form.reset();
                    showToastNotification('New warehouse facility securely added to the network.');
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Facility Name</label>
                    <input name="wName" type="text" required className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-electric focus:border-electric sm:text-sm" placeholder="e.g. Hyderabad Main Hub" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <input name="wLoc" type="text" required className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-electric focus:border-electric sm:text-sm" placeholder="e.g. Hyderabad, TS" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total Capacity (sq ft)</label>
                    <input name="wCap" type="number" required min="1000" className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-electric focus:border-electric sm:text-sm" placeholder="50000" />
                  </div>
                  <button type="submit" className="w-full py-2 px-4 rounded-lg text-sm font-bold text-white bg-green-600 hover:bg-green-700 transition-colors">
                    Establish Facility
                  </button>
                </form>
              </div>

              {/* Active Warehouses List */}
              <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 font-bold text-sm text-slate-700">
                  Active Facilities Grid
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {warehouses.map((wh) => (
                    <div key={wh.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-bold text-navy text-sm">{wh.name}</div>
                        <span className="text-xs font-mono bg-slate-200 text-slate-600 px-2 py-0.5 rounded">{wh.id}</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-3">{wh.location}</div>
                      
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1.5">
                        <div className="bg-electric h-1.5 rounded-full" style={{ width: `${(wh.availableCapacity / wh.totalCapacity) * 100}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-electric">{wh.availableCapacity.toLocaleString()} sq ft free</span>
                        <span className="text-slate-500">{wh.totalCapacity.toLocaleString()} total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Manager Account Creation */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-navy mb-2">Create Manager Account</h2>
            <p className="text-sm text-slate-500 mb-6">Generate credentials for new Logistics Managers.</p>
            
            <form className="max-w-xl" onSubmit={(e) => { e.preventDefault(); showToastNotification('Manager credentials generated & saved successfully!'); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Region</label>
                  <select className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-xl shadow-sm focus:ring-electric focus:border-electric sm:text-sm bg-white">
                    <option>North America - Hub A</option>
                    <option>Europe - Hub B</option>
                    <option>Asia Pacific - Hub C</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Generated User ID</label>
                    <input type="text" readOnly value="MGR-089" className="block w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 sm:text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Generated Password</label>
                    <div className="relative">
                      <input type="text" readOnly value="Logi*992kx" className="block w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 sm:text-sm font-mono" />
                      <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center text-electric hover:text-blue-700 text-xs font-bold">
                        Regenerate
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-navy hover:bg-slate-800 transition-colors mt-2">
                  Create Account & Distribute Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-navy text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 transform transition-all duration-300 translate-y-0 opacity-100">
          <svg className="w-6 h-6 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <div className="font-semibold">System Alert</div>
            <div className="text-sm text-slate-300">{toastMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
};
