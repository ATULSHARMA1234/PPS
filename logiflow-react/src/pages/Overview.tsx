import React, { useState, useEffect } from 'react';
import AOS from 'aos';

interface Metric {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

interface Shipment {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: string;
  progress: number;
  eta: string;
}

export const Overview: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });

    // Simulate data loading
    setTimeout(() => {
      setMetrics([
        {
          title: 'Active Shipments',
          value: '1,247',
          change: '+12%',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          ),
          color: 'blue'
        },
        {
          title: 'On-Time Delivery',
          value: '99.8%',
          change: '+0.3%',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ),
          color: 'green'
        },
        {
          title: 'Monthly Revenue',
          value: '$2.4M',
          change: '+18%',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ),
          color: 'purple'
        },
        {
          title: 'Active Vehicles',
          value: '847',
          change: '+5%',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          ),
          color: 'orange'
        }
      ]);

      setShipments([
        { id: 'SHP-001', customer: 'Tech Corp', origin: 'Mumbai', destination: 'Delhi', status: 'In Transit', progress: 65, eta: '2 hours' },
        { id: 'SHP-002', customer: 'Global Retail', origin: 'Chennai', destination: 'Bangalore', status: 'In Transit', progress: 45, eta: '4 hours' },
        { id: 'SHP-003', customer: 'Fashion Hub', origin: 'Kolkata', destination: 'Hyderabad', status: 'Loading', progress: 15, eta: '6 hours' },
        { id: 'SHP-004', customer: 'Food Chain', origin: 'Delhi', destination: 'Mumbai', status: 'Delivered', progress: 100, eta: 'Completed' }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-electric' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'In Transit': 'text-blue-600 bg-blue-100',
      'Loading': 'text-orange-600 bg-orange-100',
      'Delivered': 'text-green-600 bg-green-100'
    };
    return statusColors[status] || 'text-slate-600 bg-slate-100';
  };

  if (loading) {
    return (
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-electric"></div>
            <p className="mt-4 text-slate-600">Loading dashboard...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-12 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-navy mb-2">Overview Dashboard</h1>
          <p className="text-slate-600 text-lg">Real-time logistics operations and performance metrics</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const colorClasses = getColorClasses(metric.color);
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${colorClasses.bg} ${colorClasses.text} rounded-xl flex items-center justify-center`}>
                    {metric.icon}
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {metric.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-navy mb-1">{metric.value}</div>
                <div className="text-sm text-slate-600">{metric.title}</div>
              </div>
            );
          })}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Delivery Performance Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-xl font-bold text-navy mb-6">Delivery Performance</h3>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl">
              <div className="text-center">
                <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p className="text-slate-600">Performance chart visualization</p>
                <p className="text-sm text-slate-500 mt-2">Chart integration available</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="500">
            <h3 className="text-xl font-bold text-navy mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-navy">Shipment SHP-004 delivered</p>
                  <p className="text-xs text-slate-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-navy">New shipment from Tech Corp</p>
                  <p className="text-xs text-slate-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-navy">Vehicle maintenance scheduled</p>
                  <p className="text-xs text-slate-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-navy">Route optimization completed</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Shipments Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="600">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-navy">Active Shipments</h3>
              <a href="/global-fleet-map" className="text-electric hover:text-blue-600 font-medium text-sm">
                View Full Map {">"}
              </a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Shipment ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ETA</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {shipments.map((shipment, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy">{shipment.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{shipment.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{shipment.origin} {">"} {shipment.destination}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-electric h-2 rounded-full"
                              style={{ width: `${shipment.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm text-slate-600">{shipment.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{shipment.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
