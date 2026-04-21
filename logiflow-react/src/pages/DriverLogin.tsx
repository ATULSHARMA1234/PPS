import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const DriverLogin: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/driver');
  };

  const handeRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/driver?status=needs_registration');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg className="w-12 h-12 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-navy">
          Driver Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Earn on your own schedule. Join the LogiFlow logistics network.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100 relative">
          
          <div className="flex border-b border-slate-100 mb-6">
            <button 
              className={`flex-1 py-3 text-center font-bold text-sm transition-colors border-b-2 ${activeTab === 'login' ? 'text-electric border-electric' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button 
              className={`flex-1 py-3 text-center font-bold text-sm transition-colors border-b-2 ${activeTab === 'register' ? 'text-electric border-electric' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
              onClick={() => setActiveTab('register')}
            >
              Register Credentials
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form className="space-y-6 animate-fade-in" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email Address or Phone</label>
                <input type="text" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-xl shadow-sm focus:ring-electric focus:border-electric sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input type="password" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-xl shadow-sm focus:ring-electric focus:border-electric sm:text-sm" />
              </div>
              <button type="submit" className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-electric hover:bg-blue-700 transition-colors">
                Sign In & View Orders
              </button>
            </form>
          )}

          {/* Registration Form */}
          {activeTab === 'register' && (
            <form className="space-y-5 animate-fade-in" onSubmit={handeRegisterSubmit}>
              <div className="text-sm font-bold text-navy mb-4">Initial Registration</div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <input type="text" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-xl shadow-sm focus:ring-electric focus:border-electric sm:text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-xl shadow-sm focus:ring-electric focus:border-electric sm:text-sm" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-xl shadow-sm focus:ring-electric focus:border-electric sm:text-sm" placeholder="+91 9999999999" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Create Password</label>
                <input type="password" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-xl shadow-sm focus:ring-electric focus:border-electric sm:text-sm" />
              </div>
              <button type="submit" className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-electric hover:bg-blue-700 transition-colors mt-4">
                Create Profile &rarr;
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-slate-500 hover:text-electric font-medium">
              &larr; Return to Main Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
