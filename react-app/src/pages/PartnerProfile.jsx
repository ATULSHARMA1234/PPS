import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

export default function PartnerProfile() {
  const navigate = useNavigate()
  const [partner, setPartner] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [activeTab, setActiveTab] = useState('details')

  useEffect(() => {
    document.title = 'Partner Dashboard | PPS Logistics'
    const userData = localStorage.getItem('ppsUser')
    if (!userData) {
      navigate('/')
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.type !== 'partner') {
      navigate('/')
      return
    }
    setPartner(parsedUser)
    setEditData(parsedUser)
  }, [navigate])

  const mockDeliveries = {
    active: [
      {
        id: 'DEL-2025-001',
        status: 'In Progress',
        pickupLocation: 'Delhi - Plot 42A',
        dropLocation: 'Gurgaon - Sector 21',
        pickupTime: '08:30 AM',
        estimatedDelivery: '11:00 AM',
        distance: '45 km',
        earnings: '₹1,200'
      },
      {
        id: 'DEL-2025-002',
        status: 'Pending',
        pickupLocation: 'Noida - Tech Park',
        dropLocation: 'Delhi - Dwarka',
        pickupTime: '02:00 PM',
        estimatedDelivery: '04:30 PM',
        distance: '35 km',
        earnings: '₹950'
      }
    ],
    completed: [
      {
        id: 'DEL-2024-425',
        status: 'Delivered',
        pickupLocation: 'Delhi - Lajpat Nagar',
        dropLocation: 'Bangalore - Indiranagar',
        completedDate: '2024-12-20',
        distance: '2100 km',
        earnings: '₹8,500',
        rating: 4.8
      },
      {
        id: 'DEL-2024-424',
        status: 'Delivered',
        pickupLocation: 'Mumbai - Andheri',
        dropLocation: 'Pune - Kalyani Nagar',
        completedDate: '2024-12-18',
        distance: '150 km',
        earnings: '₹2,100',
        rating: 5
      }
    ]
  }

  const mockEarnings = {
    thisMonth: '₹45,600',
    thisWeek: '₹10,200',
    today: '₹2,150',
    total: '₹2,34,500'
  }

  const mockRatings = {
    average: 4.85,
    total: 487,
    breakdown: [
      { stars: 5, count: 420 },
      { stars: 4, count: 50 },
      { stars: 3, count: 12 },
      { stars: 2, count: 3 },
      { stars: 1, count: 2 }
    ]
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveProfile = () => {
    setPartner(editData)
    localStorage.setItem('ppsUser', JSON.stringify(editData))
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleLogout = () => {
    localStorage.removeItem('ppsUser')
    navigate('/')
  }

  if (!partner) return null

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return 'fa-check-circle'
      case 'In Progress': return 'fa-truck'
      case 'Pending': return 'fa-hourglass'
      default: return 'fa-question-circle'
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2">Partner Dashboard</h1>
            <p className="text-blue-100">Welcome back, {partner.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold uppercase">Earnings Today</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{mockEarnings.today}</p>
              </div>
              <i className="fas fa-wallet text-blue-600 text-4xl opacity-20"></i>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold uppercase">This Week</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{mockEarnings.thisWeek}</p>
              </div>
              <i className="fas fa-chart-line text-green-600 text-4xl opacity-20"></i>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold uppercase">This Month</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{mockEarnings.thisMonth}</p>
              </div>
              <i className="fas fa-calendar text-purple-600 text-4xl opacity-20"></i>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold uppercase">Avg Rating</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{mockRatings.average} ⭐</p>
              </div>
              <i className="fas fa-star text-orange-600 text-4xl opacity-20"></i>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-x-auto">
          <div className="flex border-b">
            {['details', 'active', 'completed', 'earnings', 'ratings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab === 'details' && 'Profile Details'}
                {tab === 'active' && 'Active Deliveries'}
                {tab === 'completed' && 'Completed'}
                {tab === 'earnings' && 'Earnings'}
                {tab === 'ratings' && 'Ratings'}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Details Tab */}
        {activeTab === 'details' && (
          <RevealSection className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between mb-8 pb-8 border-b">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                  <i className="fas fa-truck text-5xl text-white"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{partner.name}</h2>
                  <p className="text-gray-600 text-lg">{partner.email}</p>
                  <p className="text-gray-500 text-sm mt-2">Partner since 2024</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all"
              >
                <i className="fas fa-edit mr-2"></i>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone || ''}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Type</label>
                    <input
                      type="text"
                      name="vehicleType"
                      value={editData.vehicleType || ''}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="e.g., Two Wheeler, Auto, Truck"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={editData.address || ''}
                    onChange={handleEditChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="Your full address"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold transition-all"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Email Address</h3>
                    <p className="text-lg text-gray-900">{partner.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Phone Number</h3>
                    <p className="text-lg text-gray-900">{partner.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Vehicle Type</h3>
                    <p className="text-lg text-gray-900">{partner.vehicleType || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Member Since</h3>
                    <p className="text-lg text-gray-900">2024</p>
                  </div>
                </div>

                {partner.address && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Address</h3>
                    <p className="text-lg text-gray-900">{partner.address}</p>
                  </div>
                )}
              </div>
            )}
          </RevealSection>
        )}

        {/* Active Deliveries Tab */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            {mockDeliveries.active.length > 0 ? (
              mockDeliveries.active.map(delivery => (
                <RevealSection key={delivery.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-6 pb-6 border-b">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">{delivery.id}</h3>
                      <p className="text-gray-600 text-sm mt-1">Pick-up at {delivery.pickupTime}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(delivery.status)}`}>
                      <i className={`fas ${getStatusIcon(delivery.status)}`}></i>
                      {delivery.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">From</h4>
                      <p className="text-lg text-gray-900">{delivery.pickupLocation}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">To</h4>
                      <p className="text-lg text-gray-900">{delivery.dropLocation}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Distance</h4>
                      <p className="text-lg text-gray-900">{delivery.distance}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Earnings</h4>
                      <p className="text-lg font-black text-green-600">{delivery.earnings}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Est. Delivery:</span> {delivery.estimatedDelivery}
                    </p>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-bold transition-all">
                    Start Delivery
                  </button>
                </RevealSection>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                <p className="text-2xl font-bold text-gray-700">No active deliveries</p>
              </div>
            )}
          </div>
        )}

        {/* Completed Deliveries Tab */}
        {activeTab === 'completed' && (
          <div className="space-y-6">
            {mockDeliveries.completed.length > 0 ? (
              mockDeliveries.completed.map(delivery => (
                <RevealSection key={delivery.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-6 pb-6 border-b">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">{delivery.id}</h3>
                      <p className="text-gray-600 text-sm mt-1">Delivered on {new Date(delivery.completedDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(delivery.status)}`}>
                      <i className={`fas ${getStatusIcon(delivery.status)}`}></i>
                      {delivery.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">From</h4>
                      <p className="text-lg text-gray-900">{delivery.pickupLocation}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">To</h4>
                      <p className="text-lg text-gray-900">{delivery.dropLocation}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Distance</h4>
                      <p className="text-lg text-gray-900">{delivery.distance}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Earnings</h4>
                      <p className="text-lg font-black text-green-600">{delivery.earnings}</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Rating:</span> {delivery.rating} ⭐
                    </p>
                  </div>
                </RevealSection>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <i className="fas fa-history text-6xl text-gray-300 mb-4"></i>
                <p className="text-2xl font-bold text-gray-700">No completed deliveries</p>
              </div>
            )}
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <RevealSection className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Earnings Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
                <p className="text-gray-600 text-sm font-bold uppercase mb-3">Total Earnings</p>
                <p className="text-5xl font-black text-blue-600">{mockEarnings.total}</p>
                <p className="text-gray-600 text-sm mt-3">All time earnings</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200">
                <p className="text-gray-600 text-sm font-bold uppercase mb-3">Total Deliveries</p>
                <p className="text-5xl font-black text-green-600">487</p>
                <p className="text-gray-600 text-sm mt-3">Completed successfully</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <span className="text-gray-700 font-bold">Today</span>
                  <span className="text-2xl font-black text-gray-900">{mockEarnings.today}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <span className="text-gray-700 font-bold">This Week</span>
                  <span className="text-2xl font-black text-gray-900">{mockEarnings.thisWeek}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <span className="text-gray-700 font-bold">This Month</span>
                  <span className="text-2xl font-black text-gray-900">{mockEarnings.thisMonth}</span>
                </div>
              </div>
            </div>
          </RevealSection>
        )}

        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <RevealSection className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Customer Ratings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center">
                <div className="text-6xl font-black text-yellow-500 mb-4">{mockRatings.average}</div>
                <div className="text-2xl text-yellow-500 mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 text-lg">Based on {mockRatings.total} deliveries</p>
              </div>

              <div className="space-y-4">
                {mockRatings.breakdown.map(rating => (
                  <div key={rating.stars} className="flex items-center gap-4">
                    <div className="w-32">
                      <p className="text-sm font-bold text-gray-700">{rating.stars} Star{rating.stars !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex-grow bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-yellow-500 h-3 rounded-full transition-all"
                        style={{ width: `${(rating.count / mockRatings.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-16 text-right">
                      <p className="text-sm font-bold text-gray-700">{rating.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        )}
      </div>
    </div>
  )
}
