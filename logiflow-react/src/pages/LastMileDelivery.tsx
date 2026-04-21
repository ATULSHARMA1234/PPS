import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

export const LastMileDelivery: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div className="font-sans antialiased text-slate-800 bg-slate-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden border-b border-slate-200 bg-orange-600 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-300 via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/50" data-aos="fade-down">
            <svg className="w-10 h-10 text-orange-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight" data-aos="fade-up">
            Last-Mile Delivery
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto font-medium" data-aos="fade-up" data-aos-delay="100">
            Speed, Reliability, and Precision. The final step of the logistics chain executed flawlessly.
          </p>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-navy mb-6">Guaranteed Customer Satisfaction</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The last mile is often the most critical point of the supply chain. We pair a high-density hyper-local delivery network with dynamic routing algorithms to ensure packages arrive exactly when promised.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-700 font-medium">Same-Day and Next-Day Express Delivery Options.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-700 font-medium">Real-time SMS & Email tracking for the end recipient.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-700 font-medium">Digital Proof of Delivery (e-Signature & Photo).</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100" data-aos="fade-left">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-6 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">On-Time Rate</div>
                  <div className="text-2xl font-black text-navy">99.8%</div>
                </div>
                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Fleet</div>
                  <div className="text-2xl font-black text-navy">2,500+</div>
                </div>
                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-navy mb-4">The Final Stretch Edge</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="100">
               <h3 className="text-xl font-bold text-navy mb-3">Eco-Friendly Vehicles</h3>
               <p className="text-slate-600">A growing portion of our last-mile fleet consists of EV vans and bikes, reducing urban emissions.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="200">
               <h3 className="text-xl font-bold text-navy mb-3">Dynamic Routing</h3>
               <p className="text-slate-600">Our LogiAI automatically reroutes drivers around traffic, weather, and road closures in real time.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="300">
               <h3 className="text-xl font-bold text-navy mb-3">Reverse Logistics</h3>
               <p className="text-slate-600">Easy and hassle-free returns management integrated directly into the last-mile pipeline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy text-center text-white">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-6">Deliver with impact.</h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">Enhance your customer's doorstep experience.</p>
          <Link to="/book-last-mile" className="inline-block bg-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-orange-600 hover:-translate-y-0.5 transition-all">
            Book Delivery Now
          </Link>
        </div>
      </section>
    </div>
  );
};
