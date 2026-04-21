import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Driver: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isPending = searchParams.get('status') === 'pending';
  const needsRegistration = searchParams.get('status') === 'needs_registration';

  const [currentDelivery, setCurrentDelivery] = useState({
    id: 'DEL-001',
    customer: 'Tech Corp',
    address: '123 Tech Park, Bangalore',
    status: 'In Progress',
    estimatedTime: '25 mins'
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/driver" className="text-2xl font-bold text-navy flex items-center gap-2">
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
          <h1 className="text-4xl font-bold text-navy mb-4">Driver Portal</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Manage your deliveries, track routes, and update delivery status
          </p>
        </div>

        {needsRegistration ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-2">Vehicle & Document Registration</h2>
            <p className="text-slate-500 mb-8">Before you can receive orders, you must register your vehicle and upload your KYC documents for verification.</p>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href='/driver?status=pending'; }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-electric transition-colors cursor-pointer bg-slate-50">
                  <div className="text-sm font-bold text-slate-700">Aadhaar Card</div>
                  <div className="text-xs text-slate-500 mt-1">Upload PDF / Image</div>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-electric transition-colors cursor-pointer bg-slate-50">
                  <div className="text-sm font-bold text-slate-700">Driver License</div>
                  <div className="text-xs text-slate-500 mt-1">Upload Front & Back</div>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-electric transition-colors cursor-pointer bg-slate-50">
                  <div className="text-sm font-bold text-slate-700">Registration Certificate (RC)</div>
                  <div className="text-xs text-slate-500 mt-1">Upload Document</div>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-electric transition-colors cursor-pointer bg-slate-50">
                  <div className="text-sm font-bold text-slate-700">Vehicle Insurance</div>
                  <div className="text-xs text-slate-500 mt-1">Valid Insurance Copy</div>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-electric transition-colors cursor-pointer bg-slate-50 md:col-span-2">
                  <div className="text-sm font-bold text-slate-700">PUC (Pollution Certificate)</div>
                  <div className="text-xs text-slate-500 mt-1">Active Pollution Check</div>
                </div>
              </div>
              <button type="submit" className="w-full py-4 px-4 rounded-xl text-sm font-bold text-white bg-electric hover:bg-blue-700 transition-colors shadow-md">
                Submit Documents for Verification
              </button>
            </form>
          </div>
        ) : isPending ? (
          <div className="bg-amber-50 rounded-2xl p-12 shadow-sm border border-amber-200 mb-8 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-black text-amber-800 mb-4">Account Locked</h2>
            <p className="text-lg text-amber-700 font-medium mb-6">
              Your profile is currently under review by a Logistics Manager. Once your Driving License, Registration Certificate, and Vehicle Insurance are verified, this restriction will be lifted and you can start accepting orders.
            </p>
            <div className="inline-block bg-amber-100 text-amber-800 font-bold px-4 py-2 rounded-lg text-sm border border-amber-200 shadow-sm">
              Status: Pending Verification
            </div>
          </div>
        ) : (
          <>
            {/* Current Delivery */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
              <h2 className="text-2xl font-bold text-navy mb-6">Current Delivery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-600">Delivery ID</label>
                  <div className="text-lg font-semibold text-navy">{currentDelivery.id}</div>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Customer</label>
                  <div className="text-lg font-semibold text-navy">{currentDelivery.customer}</div>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Delivery Address</label>
                  <div className="text-lg font-semibold text-navy">{currentDelivery.address}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-600">Status</label>
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {currentDelivery.status}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Estimated Time</label>
                  <div className="text-lg font-semibold text-navy">{currentDelivery.estimatedTime}</div>
                </div>
                <div className="pt-4">
                  <button className="w-full bg-electric text-white py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-2xl font-bold text-navy mb-6">Today's Schedule</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-electric rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-navy">DEL-001</div>
                  <div className="text-sm text-slate-600">Tech Corp {"\u2022"} 9:00 AM</div>
                </div>
              </div>
              <div className="text-blue-600 font-medium">In Progress</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-navy">DEL-002</div>
                  <div className="text-sm text-slate-600">Global Retail {"\u2022"} 11:30 AM</div>
                </div>
              </div>
              <div className="text-slate-600 font-medium">Pending</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-navy">DEL-003</div>
                  <div className="text-sm text-slate-600">Fashion Hub {"\u2022"} 2:00 PM</div>
                </div>
              </div>
              <div className="text-slate-600 font-medium">Pending</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Complete Delivery</h3>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Mark as Delivered
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Report Issue</h3>
            <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Report Delay
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-blue-100 text-electric rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">View Route</h3>
            <Link to="/global-fleet-map" className="w-full bg-electric text-white py-2 rounded-lg hover:bg-blue-600 transition-colors inline-block text-center">
              Track Location
            </Link>
          </div>
        </div>
        </>
        )}
      </main>
    </div>
  );
};
