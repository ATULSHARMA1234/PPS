import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

export const Home: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <div className="font-sans antialiased text-slate-800 bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(/assets/hero.png)'}}></div>
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white" data-aos="fade-up" data-aos-duration="1000">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-electric/20 border border-electric/50 rounded-full text-blue-300 font-semibold text-sm uppercase tracking-wide backdrop-blur-sm">
              Global Logistics Leader
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Connecting the World Through 
              <span className="text-electric"> Smart Logistics</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Experience the future of global supply chain management with our cutting-edge logistics solutions, real-time tracking, and sustainable delivery networks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="px-8 py-4 bg-electric hover:bg-blue-600 text-white font-semibold rounded-full transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] text-center">
                Explore Services
              </a>
              <a href="#workflow" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all backdrop-blur-md border border-white/30 text-center">
                How It Works
              </a>
            </div>
          </div>
          <div className="relative" data-aos="fade-left" data-aos-duration="1200">
            <div className="absolute inset-0 bg-electric/20 rounded-3xl transform rotate-6"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Active Shipments</span>
                  <span className="text-2xl font-bold text-white">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Global Locations</span>
                  <span className="text-2xl font-bold text-white">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">On-Time Delivery</span>
                  <span className="text-2xl font-bold text-white">98.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Happy Clients</span>
                  <span className="text-2xl font-bold text-white">5,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-navy mb-4">Our Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive logistics solutions tailored to meet your global supply chain needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Ocean Freight */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Ocean Freight</h3>
              <p className="text-slate-600 mb-6">
                Reliable and cost-effective sea freight solutions for large-scale shipments worldwide.
              </p>
              <Link to="/ocean-freight" className="text-electric font-semibold hover:text-blue-600">
                Learn More <span className="ml-1">{">"}</span>
              </Link>
            </div>

            {/* Smart Warehousing */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Smart Warehousing</h3>
              <p className="text-slate-600 mb-6">
                AI-powered storage solutions with real-time inventory management and optimization.
              </p>
              <Link to="/smart-warehousing" className="text-electric font-semibold hover:text-blue-600">
                Learn More <span className="ml-1">{">"}</span>
              </Link>
            </div>

            {/* Last-Mile Delivery */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Last-Mile Delivery</h3>
              <p className="text-slate-600 mb-6">
                Fast and efficient delivery solutions with real-time tracking and customer notifications.
              </p>
              <Link to="/last-mile-delivery" className="text-electric font-semibold hover:text-blue-600">
                Learn More <span className="ml-1">{">"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-navy mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Simple, streamlined process from pickup to delivery
            </p>
          </div>

          <div className="relative">
            <div className="timeline-line"></div>
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex items-center timeline-line" data-aos="fade-right">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-bold text-navy mb-2">Book Your Shipment</h3>
                  <p className="text-slate-600">Enter your details and requirements in our easy-to-use booking system</p>
                </div>
                <div className="w-12 h-12 bg-electric rounded-full flex items-center justify-center text-white font-bold z-10">
                  1
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center timeline-line" data-aos="fade-left">
                <div className="flex-1 pr-8"></div>
                <div className="w-12 h-12 bg-electric rounded-full flex items-center justify-center text-white font-bold z-10">
                  2
                </div>
                <div className="flex-1 pl-8">
                  <h3 className="text-2xl font-bold text-navy mb-2">We Process & Plan</h3>
                  <p className="text-slate-600">Our AI system optimizes the best route and handles all documentation</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center timeline-line" data-aos="fade-right">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-bold text-navy mb-2">Real-Time Tracking</h3>
                  <p className="text-slate-600">Monitor your shipment every step of the way with our tracking system</p>
                </div>
                <div className="w-12 h-12 bg-electric rounded-full flex items-center justify-center text-white font-bold z-10">
                  3
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center" data-aos="fade-left">
                <div className="flex-1 pr-8"></div>
                <div className="w-12 h-12 bg-electric rounded-full flex items-center justify-center text-white font-bold z-10">
                  4
                </div>
                <div className="flex-1 pl-8">
                  <h3 className="text-2xl font-bold text-navy mb-2">Safe Delivery</h3>
                  <p className="text-slate-600">Your package arrives safely and on time at its destination</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section id="goals" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-navy mb-4">Future Goals</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Pioneering the future of sustainable logistics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Carbon Neutral by 2025</h3>
              <p className="text-slate-600">Achieving zero carbon emissions through sustainable practices and green technology</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">100% Digital Operations</h3>
              <p className="text-slate-600">Complete digital transformation with AI-powered automation and smart contracts</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Global Network Expansion</h3>
              <p className="text-slate-600">Expanding to 500+ locations across 100 countries by 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">Ready to Transform Your Logistics?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Join thousands of businesses that trust LogiFlow for their global supply chain needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
            <button className="px-8 py-4 bg-electric hover:bg-blue-600 text-white font-semibold rounded-full transition-all">
              Get Started
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all backdrop-blur-md border border-white/30">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer / Staff Access */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} LogiFlow Logistics. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Staff Access:</span>
            <a href="/driver/login" className="text-slate-400 hover:text-electric text-sm transition-colors">Driver</a>
            <a href="/manager/login" className="text-slate-400 hover:text-electric text-sm transition-colors">Manager</a>
            <a href="/admin/login" className="text-slate-400 hover:text-electric text-sm transition-colors">Admin</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
