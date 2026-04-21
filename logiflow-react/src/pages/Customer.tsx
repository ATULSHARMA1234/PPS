import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Customer: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrackShipment = () => {
    if (!trackingNumber) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingResult({
        id: trackingNumber,
        status: 'In Transit',
        currentLocation: 'Bangalore, Karnataka',
        estimatedDelivery: '2024-04-11',
        progress: 65,
        updates: [
          { time: '2024-04-09 09:00', location: 'Mumbai', status: 'Package picked up' },
          { time: '2024-04-09 14:30', location: 'Pune', status: 'In transit' },
          { time: '2024-04-10 08:00', location: 'Bangalore', status: 'Arrived at destination city' }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-navy flex items-center gap-2">
              <svg className="w-8 h-8 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              LogiFlow
            </Link>
            <nav className="flex space-x-6">
              <Link to="/" className="text-slate-600 hover:text-electric transition-colors">Home</Link>
              <Link to="/overview" className="text-slate-600 hover:text-electric transition-colors">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy mb-4">Customer Tracking</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Track your shipments in real-time and get detailed delivery information
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-2xl font-bold text-navy mb-6">Track Your Shipment</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter tracking number (e.g., SHP-001)"
              className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-electric"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button
              onClick={handleTrackShipment}
              disabled={loading || !trackingNumber}
              className="px-8 py-3 bg-electric text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Tracking...' : 'Track Shipment'}
            </button>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold text-navy mb-6">Tracking Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-electric mb-2">{trackingResult.id}</div>
                <div className="text-sm text-slate-600">Tracking Number</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{trackingResult.status}</div>
                <div className="text-sm text-slate-600">Current Status</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{trackingResult.estimatedDelivery}</div>
                <div className="text-sm text-slate-600">Estimated Delivery</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-navy">Delivery Progress</span>
                <span className="text-sm text-slate-600">{trackingResult.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-electric h-3 rounded-full transition-all duration-500"
                  style={{ width: `${trackingResult.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-navy mb-4">Shipment Updates</h3>
              {trackingResult.updates.map((update: any, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    index === 0 ? 'bg-green-500' : 'bg-slate-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-navy">{update.status}</div>
                    <div className="text-sm text-slate-600">{update.location}</div>
                    <div className="text-xs text-slate-500">{update.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-blue-100 text-electric rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">New Shipment</h3>
            <button className="w-full bg-electric text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Book Delivery
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Delivery History</h3>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              View History
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0h4"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Get Support</h3>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Contact Us
            </button>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-navy mb-6">Popular Delivery Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <div className="font-semibold text-navy">Mumbai to Delhi</div>
              <div className="text-sm text-slate-600">2-3 days</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <div className="font-semibold text-navy">Bangalore to Chennai</div>
              <div className="text-sm text-slate-600">1-2 days</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <div className="font-semibold text-navy">Kolkata to Hyderabad</div>
              <div className="text-sm text-slate-600">2-3 days</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <div className="font-semibold text-navy">Pune to Ahmedabad</div>
              <div className="text-sm text-slate-600">1-2 days</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
