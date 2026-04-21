import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

export const SmartWarehousing: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div className="font-sans antialiased text-slate-800 bg-slate-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden border-b border-slate-200 bg-green-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="#166534" points="0,100 100,0 100,100"/>
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-green-500/50" data-aos="fade-down">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight" data-aos="fade-up">
            Smart Warehousing
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto font-medium" data-aos="fade-up" data-aos-delay="100">
            AI-powered storage solutions with real-time inventory management and robotic optimization. Maximize your supply chain efficiency.
          </p>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1 bg-white rounded-3xl p-8 shadow-xl border border-slate-100" data-aos="fade-right">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-6 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Capacity</div>
                  <div className="text-2xl font-black text-navy">10M+ sq. ft.</div>
                </div>
                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Inventory Accuracy</div>
                  <div className="text-2xl font-black text-navy">99.9%</div>
                </div>
                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
            
            <div className="order-1 lg:order-2" data-aos="fade-left">
              <h2 className="text-3xl font-bold text-navy mb-6">Next-Generation Inventory Management</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                LogiFlow integrates Robotics, IoT sensors, and Machine Learning to create warehouses that think for themselves, predicting demand and optimizing storage automatically.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-700 font-medium">Automated Storage and Retrieval Systems (AS/RS).</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-700 font-medium">Predictive inventory restocking alerts via AI forecasting.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-700 font-medium">Strict climate-controlled zones for pharmaceuticals and perishable goods.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-navy mb-4">Core Warehouse Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="100">
               <h3 className="text-xl font-bold text-navy mb-3">Barcode & RFID Tracking</h3>
               <p className="text-slate-600">Every item is tracked dynamically as it enters, moves, or leaves the facility, ensuring zero shrinkage.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="200">
               <h3 className="text-xl font-bold text-navy mb-3">Cross-Docking</h3>
               <p className="text-slate-600">Minimal storage time for high-velocity goods. Unload materials from an incoming semi-trailer and instantly load them outbound.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="300">
               <h3 className="text-xl font-bold text-navy mb-3">Secure Facilities</h3>
               <p className="text-slate-600">24/7 on-site security, biometric access protocols, and advanced CCTV frameworks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-700 text-center text-white">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-6">Upgrade your inventory management</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">Connect your ERP system with LogiFlow's smart warehouses today.</p>
          <Link to="/book-warehouse" className="inline-block bg-white text-navy font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Find a Warehouse
          </Link>
        </div>
      </section>
    </div>
  );
};
