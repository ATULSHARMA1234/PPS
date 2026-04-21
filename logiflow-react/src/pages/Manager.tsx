import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWarehouses, Warehouse } from '../utils/storage';

export const Manager: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    setWarehouses(getWarehouses());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/manager" className="text-2xl font-bold text-navy flex items-center gap-2">
              <svg className="w-8 h-8 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              LogiFlow
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy mb-4">Manager Portal</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Manage your team, track performance, and optimize operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="w-16 h-16 bg-blue-100 text-electric rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-navy mb-4">Team Management</h3>
            <p className="text-slate-600 mb-6">
              Oversee your team members, assign tasks, and monitor performance metrics.
            </p>
            <Link to="/personnel" className="text-electric font-semibold hover:text-blue-600">
              Manage Team {">"}
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-navy mb-4">Performance Analytics</h3>
            <p className="text-slate-600 mb-6">
              Track KPIs, generate reports, and analyze team performance data.
            </p>
            <Link to="/revenue-hub" className="text-electric font-semibold hover:text-blue-600">
              View Analytics {">"}
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-navy mb-4">Fleet Operations</h3>
            <p className="text-slate-600 mb-6">
              Monitor fleet status, optimize routes, and manage logistics operations.
            </p>
            <Link to="/global-fleet-map" className="text-electric font-semibold hover:text-blue-600">
              Track Fleet {">"}
            </Link>
          </div>
        </div>

        {/* New Manager Panels: Verification, Allocation & Negotiation */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Driver Verifications Panel */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy mb-6 flex items-center justify-between">
              Pending Verifications
              <span className="bg-amber-100 text-amber-600 text-sm py-1 px-3 rounded-full">2 Pending</span>
            </h2>
            <div className="space-y-4">
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Rahul Sharma</div>
                  <div className="text-sm text-slate-500">4-Wheeler (LCV)</div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-600 flex items-center gap-1"><svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> RC</span>
                    <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-600 flex items-center gap-1"><svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> DL</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="text-xs bg-electric text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 font-bold transition-all">Verify Documents</button>
                  <button className="text-xs bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-300 font-bold transition-all">Reject</button>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Price Negotiation */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy mb-6 flex items-center justify-between">
              Price Negotiations
              <span className="bg-electric/10 text-electric text-sm py-1 px-3 rounded-full">1 Active</span>
            </h2>
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-xs font-bold bg-green-100 text-green-700 rounded-bl-xl">High Priority</div>
              <div className="font-bold text-slate-800 mb-1">Globex Corp (Bulk Order)</div>
              <div className="text-sm text-slate-600 mb-4">Requested 12% discount on standard tariff.</div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-slate-500">Standard Price</div>
                  <div className="font-bold text-slate-800 line-through">$4,500</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Requested Price</div>
                  <div className="font-bold text-electric text-lg">$3,960</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-bold transition-colors">Accept Offer</button>
                <button className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-sm font-bold transition-colors">Counter Offer</button>
              </div>
            </div>
          </div>

          {/* Driver Allocation Panel */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 lg:col-span-2">
            <h2 className="text-2xl font-bold text-navy mb-6">Driver Order Allocation</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-sm font-bold text-slate-600">Parcel ID</th>
                    <th className="p-4 text-sm font-bold text-slate-600">Destination</th>
                    <th className="p-4 text-sm font-bold text-slate-600">Priority</th>
                    <th className="p-4 text-sm font-bold text-slate-600">Assign Driver</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 items-center">
                    <td className="p-4 font-mono text-sm">PX-90021</td>
                    <td className="p-4 text-sm">Mumbai Port Trust</td>
                    <td className="p-4"><span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold">Express</span></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg py-1 px-2 focus:ring-electric focus:border-electric">
                          <option>Select Driver...</option>
                          <option>D-102 (Available)</option>
                          <option>D-145 (Available)</option>
                        </select>
                        <button className="bg-electric text-white text-xs px-3 py-1 rounded hover:bg-blue-600 font-bold">Assign</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 items-center">
                    <td className="p-4 font-mono text-sm">PX-88290</td>
                    <td className="p-4 text-sm">Pune Warehouse Hub</td>
                    <td className="p-4"><span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-bold">Standard</span></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg py-1 px-2 focus:ring-electric focus:border-electric">
                          <option>Select Driver...</option>
                          <option>D-088 (Available)</option>
                          <option>D-102 (Available)</option>
                        </select>
                        <button className="bg-electric text-white text-xs px-3 py-1 rounded hover:bg-blue-600 font-bold">Assign</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Warehouse Integration */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-8 mb-8 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-navy">Global Warehouse Capacity Hub</h2>
                <p className="text-sm text-slate-500 mt-1">Live monitoring of all storage facilities.</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {warehouses.map(wh => (
                  <div key={wh.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-navy text-lg">{wh.name}</h3>
                      <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-mono">{wh.id}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-6">{wh.location}</p>
                    
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(wh.availableCapacity / wh.totalCapacity) * 100}%` }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm font-bold text-green-600">
                        {wh.availableCapacity.toLocaleString()} <span className="text-xs font-normal">sq ft available</span>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        {wh.totalCapacity.toLocaleString()} capacity
                      </div>
                    </div>
                  </div>
                ))}
                {warehouses.length === 0 && (
                  <div className="col-span-3 text-center py-8 text-slate-500">No active warehouses found on the network.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
