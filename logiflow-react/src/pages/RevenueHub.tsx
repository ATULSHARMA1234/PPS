import React, { useState, useEffect } from 'react';
import AOS from 'aos';

interface RevenueMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

interface Transaction {
  id: string;
  client: string;
  amount: string;
  service: string;
  date: string;
  status: string;
}

interface Client {
  name: string;
  revenue: string;
  growth: string;
  color: string;
}

interface ServiceRevenue {
  service: string;
  revenue: string;
  percentage: number;
  color: string;
}

export const RevenueHub: React.FC = () => {
  const [metrics, setMetrics] = useState<RevenueMetric[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<ServiceRevenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });

    setTimeout(() => {
      setMetrics([
        {
          title: 'Total Revenue',
          value: '$2.4M',
          change: '+18%',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ),
          color: 'green'
        },
        {
          title: 'Monthly Growth',
          value: '$340K',
          change: '+12%',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          ),
          color: 'blue'
        },
        {
          title: 'Profit Margin',
          value: '24.5%',
          change: '+2.1%',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          ),
          color: 'purple'
        },
        {
          title: 'Active Clients',
          value: '156',
          change: '+8%',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          ),
          color: 'orange'
        }
      ]);

      setTransactions([
        { id: 'TRX001', client: 'Tech Corp', amount: '$45,000', service: 'Ocean Freight', date: '2024-04-09', status: 'Completed' },
        { id: 'TRX002', client: 'Global Retail', amount: '$28,500', service: 'Last-Mile', date: '2024-04-09', status: 'Completed' },
        { id: 'TRX003', client: 'Fashion Hub', amount: '$67,200', service: 'Warehousing', date: '2024-04-08', status: 'Pending' },
        { id: 'TRX004', client: 'Food Chain', amount: '$89,300', service: 'Ocean Freight', date: '2024-04-08', status: 'Completed' },
        { id: 'TRX005', client: 'Auto Parts Inc', amount: '$34,100', service: 'Last-Mile', date: '2024-04-07', status: 'Completed' }
      ]);

      setClients([
        { name: 'Tech Corp', revenue: '$450K', growth: '+15%', color: 'blue' },
        { name: 'Global Retail', revenue: '$380K', growth: '+12%', color: 'green' },
        { name: 'Fashion Hub', revenue: '$320K', growth: '+8%', color: 'purple' },
        { name: 'Food Chain', revenue: '$280K', growth: '+18%', color: 'orange' }
      ]);

      setServices([
        { service: 'Ocean Freight', revenue: '$1.2M', percentage: 50, color: 'blue' },
        { service: 'Last-Mile Delivery', revenue: '$720K', percentage: 30, color: 'green' },
        { service: 'Smart Warehousing', revenue: '$480K', percentage: 20, color: 'purple' }
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
      'Completed': 'text-green-600 bg-green-100',
      'Pending': 'text-orange-600 bg-orange-100',
      'Failed': 'text-red-600 bg-red-100'
    };
    return statusColors[status] || 'text-slate-600 bg-slate-100';
  };

  const getServiceColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };
    return colors[color] || 'bg-slate-500';
  };

  if (loading) {
    return (
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-electric"></div>
            <p className="mt-4 text-slate-600">Loading revenue data...</p>
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
          <h1 className="text-4xl font-bold text-navy mb-2">Revenue Hub</h1>
          <p className="text-slate-600 text-lg">Financial analytics and revenue tracking</p>
        </div>

        {/* Revenue Overview Cards */}
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

        {/* Revenue Trends and Service Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-xl font-bold text-navy mb-6">Revenue Trends</h3>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl">
              <div className="text-center">
                <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p className="text-slate-600">Revenue trend visualization</p>
                <p className="text-sm text-slate-500 mt-2">Chart integration available</p>
              </div>
            </div>
          </div>

          {/* Revenue by Service */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="500">
            <h3 className="text-xl font-bold text-navy mb-6">Revenue by Service</h3>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-navy">{service.service}</span>
                    <span className="text-sm text-slate-600">{service.revenue}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`${getServiceColor(service.color)} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{service.percentage}% of total</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Clients and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Clients */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="600">
            <h3 className="text-xl font-bold text-navy mb-6">Top Clients</h3>
            <div className="space-y-4">
              {clients.map((client, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${getColorClasses(client.color).bg} ${getColorClasses(client.color).text} rounded-xl flex items-center justify-center`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-navy">{client.name}</div>
                      <div className="text-sm text-slate-600">{client.revenue}</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {client.growth}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="700">
            <h3 className="text-xl font-bold text-navy mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-medium text-navy">{transaction.client}</div>
                    <div className="text-sm text-slate-600">{transaction.service} {"\u2022"} {transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-navy">{transaction.amount}</div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="800">
          <h3 className="text-xl font-bold text-navy mb-6">Financial Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$2.4M</div>
              <div className="text-sm text-slate-600">Total Revenue (YTD)</div>
              <div className="text-xs text-green-600 mt-1">+18% from last year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$588K</div>
              <div className="text-sm text-slate-600">Total Profit (YTD)</div>
              <div className="text-xs text-green-600 mt-1">+22% from last year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24.5%</div>
              <div className="text-sm text-slate-600">Profit Margin</div>
              <div className="text-xs text-green-600 mt-1">+2.1% improvement</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
