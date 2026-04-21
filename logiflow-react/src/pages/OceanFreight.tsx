import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

export const OceanFreight: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div className="font-sans antialiased text-slate-800 bg-slate-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden border-b border-slate-200 bg-navy text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 C20,60 40,40 60,50 C80,60 100,50 100,50 L100,100 L0,100 Z" fill="#2563EB" opacity="0.3"></path>
            <path d="M0,60 C30,70 50,40 80,60 C100,70 100,60 100,60 L100,100 L0,100 Z" fill="#2563EB" opacity="0.1"></path>
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="w-20 h-20 bg-electric/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-electric/50" data-aos="fade-down">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
            </svg>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight" data-aos="fade-up">
            Ocean Freight Solutions
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-medium" data-aos="fade-up" data-aos-delay="100">
            Secure, cost-effective, and globally connected. Navigate international trade with LogiFlow's expansive ocean freight networks.
          </p>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-navy mb-6">Full Container Load (FCL) & Less Than Container Load (LCL)</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Whether you have enough cargo to fill an entire 40ft container or just a few pallets worth of goods, our flexible shipping options cater to businesses of all sizes. 
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-electric flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-700 font-medium">Dedicated FCL shipments for maximum security and faster transit times.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-electric flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-700 font-medium">Cost-effective LCL consolidation for smaller shipments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-electric flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-700 font-medium">Temperature-controlled reefers available for perishables.</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100" data-aos="fade-left">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-6 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Transit Time</div>
                  <div className="text-2xl font-black text-navy">15 - 45 Days</div>
                </div>
                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Global Ports</div>
                  <div className="text-2xl font-black text-navy">500+</div>
                </div>
                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-navy mb-4">Why Choose LogiFlow Ocean Freight?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="100">
              <div className="w-14 h-14 bg-electric/10 text-electric rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Customs Clearance</h3>
              <p className="text-slate-600">We handle the complex paperwork and regulatory compliance across all international borders.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 bg-electric/10 text-electric rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Real-time Visibility</h3>
              <p className="text-slate-600">Track your cargo live on our global fleet map with AI-predicted arrival times.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="300">
              <div className="w-14 h-14 bg-electric/10 text-electric rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Sustainable Routes</h3>
              <p className="text-slate-600">Optimized shipping routes that minimize fuel consumption and lower your carbon footprint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-electric text-center text-white">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-6">Ready to set sail?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Get a customized ocean freight quote tailored to your volume and route.</p>
          <Link to="/book-ocean-freight" className="inline-block bg-white text-navy font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
};
