import React, { useState, useEffect } from 'react';
import AOS from 'aos';

interface Employee {
  id: string;
  name: string;
  initials: string;
  department: string;
  role: string;
  status: string;
  performance: number;
  email: string;
  joinDate: string;
}

interface Department {
  name: string;
  employees: number;
  growth: string;
  color: string;
}

interface NewHire {
  name: string;
  role: string;
  department: string;
  startDate: string;
  avatar: string;
}

export const Personnel: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newHires, setNewHires] = useState<NewHire[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });

    // Simulate data loading
    setTimeout(() => {
      setEmployees([
        {
          id: 'EMP001',
          name: 'Alex Rodriguez',
          initials: 'AR',
          department: 'Operations',
          role: 'Senior Driver',
          status: 'Active',
          performance: 4.9,
          email: 'alex.r@logiflow.com',
          joinDate: '2022-03-15'
        },
        {
          id: 'EMP002',
          name: 'Lisa Wang',
          initials: 'LW',
          department: 'Logistics',
          role: 'Fleet Manager',
          status: 'Active',
          performance: 4.7,
          email: 'lisa.w@logiflow.com',
          joinDate: '2021-07-22'
        },
        {
          id: 'EMP003',
          name: 'James Taylor',
          initials: 'JT',
          department: 'Operations',
          role: 'Delivery Driver',
          status: 'On Leave',
          performance: 4.8,
          email: 'james.t@logiflow.com',
          joinDate: '2023-01-10'
        },
        {
          id: 'EMP004',
          name: 'Sarah Chen',
          initials: 'SC',
          department: 'Customer Service',
          role: 'Support Lead',
          status: 'Active',
          performance: 4.6,
          email: 'sarah.c@logiflow.com',
          joinDate: '2022-11-05'
        }
      ]);

      setDepartments([
        { name: 'Operations', employees: 156, growth: '+12%', color: 'blue' },
        { name: 'Logistics', employees: 89, growth: '+8%', color: 'green' },
        { name: 'Customer Service', employees: 67, growth: '+15%', color: 'purple' },
        { name: 'Management', employees: 34, growth: '+5%', color: 'orange' }
      ]);

      setNewHires([
        { name: 'Michael Brown', role: 'Junior Driver', department: 'Operations', startDate: '2024-04-15', avatar: 'MB' },
        { name: 'Emma Davis', role: 'Coordinator', department: 'Logistics', startDate: '2024-04-20', avatar: 'ED' },
        { name: 'Ryan Wilson', role: 'Support Agent', department: 'Customer Service', startDate: '2024-04-25', avatar: 'RW' }
      ]);
    }, 1000);
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNotification = (message: string, type: string = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    showNotification(`Editing ${employee.name}'s profile...`, 'success');
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'Active': 'text-green-600 bg-green-100',
      'On Leave': 'text-orange-600 bg-orange-100',
      'Inactive': 'text-slate-600 bg-slate-100'
    };
    return statusColors[status] || 'text-slate-600 bg-slate-100';
  };

  const getDepartmentColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };
    return colors[color] || 'bg-slate-500';
  };

  const getInitialsColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-purple-500 to-purple-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <main className="pt-24 pb-12 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-navy mb-2">Personnel Management</h1>
          <p className="text-slate-600 text-lg">Manage your team and track employee performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 text-electric rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
            </div>
            <div className="text-3xl font-bold text-navy mb-1">346</div>
            <div className="text-sm text-slate-600">Total Employees</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">98%</span>
            </div>
            <div className="text-3xl font-bold text-navy mb-1">339</div>
            <div className="text-sm text-slate-600">Active Staff</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                </svg>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+8</span>
            </div>
            <div className="text-3xl font-bold text-navy mb-1">4.7</div>
            <div className="text-sm text-slate-600">Avg Performance</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">This Month</span>
            </div>
            <div className="text-3xl font-bold text-navy mb-1">12</div>
            <div className="text-sm text-slate-600">New Hires</div>
          </div>
        </div>

        {/* Department Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-xl font-bold text-navy mb-6">Department Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((dept, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-navy">{dept.name}</h4>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {dept.growth}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-navy">{dept.employees}</div>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${getDepartmentColor(dept.color)} rounded-full`}></div>
                      <span className="text-sm text-slate-600">employees</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Hires */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="500">
            <h3 className="text-xl font-bold text-navy mb-6">Recent Hires</h3>
            <div className="space-y-4">
              {newHires.map((hire, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getInitialsColor(index)} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                    {hire.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-navy">{hire.name}</div>
                    <div className="text-sm text-slate-600">{hire.role}</div>
                    <div className="text-xs text-slate-500">{hire.department} {"\u2022"} Starts {hire.startDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Directory */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="600">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-navy">Employee Directory</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-electric"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-electric text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredEmployees.map((employee, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 bg-gradient-to-br ${getInitialsColor(index)} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                          {employee.initials}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-navy">{employee.name}</div>
                          <div className="text-xs text-slate-500">{employee.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm text-slate-600 mr-2">{employee.performance}</div>
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(employee.performance / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewEmployee(employee)}
                        className="text-electric hover:text-blue-600 mr-3"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="text-slate-600 hover:text-navy"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Employee Details Modal */}
      {showModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-navy mb-4">Employee Details</h3>
            <div className="space-y-3">
              <div><strong>Name:</strong> {selectedEmployee.name}</div>
              <div><strong>ID:</strong> {selectedEmployee.id}</div>
              <div><strong>Department:</strong> {selectedEmployee.department}</div>
              <div><strong>Role:</strong> {selectedEmployee.role}</div>
              <div><strong>Status:</strong> {selectedEmployee.status}</div>
              <div><strong>Performance:</strong> {selectedEmployee.performance}/5.0</div>
              <div><strong>Email:</strong> {selectedEmployee.email}</div>
              <div><strong>Join Date:</strong> {selectedEmployee.joinDate}</div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-electric text-white py-3 rounded-xl hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-4 rounded-xl shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}>
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="font-medium">{notification.message}</div>
          </div>
        </div>
      )}
    </main>
  );
};
