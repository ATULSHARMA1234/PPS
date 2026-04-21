import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const BookLastMile: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 max-w-lg text-center">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-navy mb-4">Delivery Scheduled!</h2>
          <p className="text-slate-600 mb-8">
            Your Last-Mile delivery has been successfully routed. A LogiFlow driver will arrive at the pickup location shortly. You can track this delivery in your dashboard.
          </p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/last-mile-delivery" className="text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Last-Mile Services
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-orange-500 p-8 text-white">
            <h1 className="text-3xl font-black mb-2">Book Last-Mile Delivery</h1>
            <p className="text-orange-100">Hyper-local, rapid urban package delivery.</p>
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-navy border-b border-slate-100 pb-2">Routing Details</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Address</label>
                  <input type="text" required placeholder="Full Street Address" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Drop-off Destination</label>
                  <input type="text" required placeholder="Full Destination Address" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500" />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-navy border-b border-slate-100 pb-2">Package Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Package Dimensions (L x W x H)</label>
                    <input type="text" required placeholder="e.g. 10x10x5 inches" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Service Priority</label>
                    <select required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500">
                      <option>Standard (Next Day)</option>
                      <option>Express (Same Day)</option>
                      <option>Hyper (Under 2 Hours)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all text-lg">
                  Confirm Booking Pickup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
