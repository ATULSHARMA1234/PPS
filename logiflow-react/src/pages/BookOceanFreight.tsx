import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const BookOceanFreight: React.FC = () => {
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
          <h2 className="text-3xl font-bold text-navy mb-4">Request Submitted Successfully!</h2>
          <p className="text-slate-600 mb-8">
            Your Ocean Freight quote request has been forwarded to our pricing experts. They will contact you shortly via email with an optimized routing plan and estimate.
          </p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
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
          <Link to="/ocean-freight" className="text-sm font-bold text-slate-500 hover:text-electric transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Ocean Freight
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-navy p-8 text-white">
            <h1 className="text-3xl font-black mb-2">Book Ocean Freight</h1>
            <p className="text-blue-200">Secure container shipping across the globe.</p>
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Origin Port</label>
                  <input type="text" required placeholder="e.g. Nhava Sheva (INNSA)" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-electric focus:border-electric" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Destination Port</label>
                  <input type="text" required placeholder="e.g. Los Angeles (USLAX)" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-electric focus:border-electric" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Container Type</label>
                  <select required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-electric focus:border-electric">
                    <option>Standard 20ft (FCL)</option>
                    <option>Standard 40ft (FCL)</option>
                    <option>High Cube 40ft (FCL)</option>
                    <option>Less than Container Load (LCL)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Weight (kg)</label>
                  <input type="number" required placeholder="2000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-electric focus:border-electric" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Desired Dispatch Date</label>
                <input type="date" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-electric focus:border-electric" />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-electric text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
