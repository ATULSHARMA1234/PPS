import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [activeTab, setActiveTab] = useState('details')

  useEffect(() => {
    document.title = 'My Profile | PPS Logistics'
    const userData = localStorage.getItem('ppsUser')
    if (!userData) {
      navigate('/')
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setEditData(parsedUser)
  }, [navigate])

  const mockOrders = {
    current: [
      {
        id: 'ORD-2025-001',
        status: 'In Transit',
        from: 'Delhi',
        to: 'Mumbai',
        date: '2025-01-15',
        estimatedDelivery: '2025-01-18',
        items: 3,
        weight: '250 kg'
      },
      {
        id: 'ORD-2025-002',
        status: 'Processing',
        from: 'Bangalore',
        to: 'Chennai',
        date: '2025-01-16',
        estimatedDelivery: '2025-01-20',
        items: 5,
        weight: '180 kg'
      }
    ],
    previous: [
      {
        id: 'ORD-2024-145',
        status: 'Delivered',
        from: 'Pune',
        to: 'Hyderabad',
        date: '2024-12-20',
        deliveredDate: '2024-12-23',
        items: 2,
        weight: '120 kg'
      },
      {
        id: 'ORD-2024-144',
        status: 'Delivered',
        from: 'Kolkata',
        to: 'Ahmedabad',
        date: '2024-12-10',
        deliveredDate: '2024-12-14',
        items: 4,
        weight: '300 kg'
      }
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
    setUser(editData)
    localStorage.setItem('ppsUser', JSON.stringify(editData))
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleLogout = () => {
    localStorage.removeItem('ppsUser')
    navigate('/')
  }

  if (!user) return null

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800'
      case 'In Transit': return 'bg-blue-100 text-blue-800'
      case 'Processing': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return 'fa-check-circle'
      case 'In Transit': return 'fa-truck'
      case 'Processing': return 'fa-hourglass'
      default: return 'fa-question-circle'
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2">My Profile</h1>
            <p className="text-blue-100">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-x-auto">
          <div className="flex border-b">
            {['details', 'current', 'previous'].map(tab => (
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
                {tab === 'current' && `Current Orders (${mockOrders.current.length})`}
                {tab === 'previous' && `Order History (${mockOrders.previous.length})`}
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
                  <i className="fas fa-user text-5xl text-white"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{user.name}</h2>
                  <p className="text-gray-600 text-lg">{user.email}</p>
                  <p className="text-gray-500 text-sm mt-2">Member since 2024</p>
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
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={editData.company || ''}
                      onChange={handleEditChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="Your company"
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
                    <p className="text-lg text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Phone Number</h3>
                    <p className="text-lg text-gray-900">{user.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Company Name</h3>
                    <p className="text-lg text-gray-900">{user.company || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Registration Type</h3>
                    <p className="text-lg text-gray-900 capitalize">{user.type || 'User'}</p>
                  </div>
                </div>

                {user.address && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Address</h3>
                    <p className="text-lg text-gray-900">{user.address}</p>
                  </div>
                )}
              </div>
            )}
          </RevealSection>
        )}

        {/* Current Orders Tab */}
        {activeTab === 'current' && (
          <div className="space-y-6">
            {mockOrders.current.length > 0 ? (
              mockOrders.current.map(order => (
                <RevealSection key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-6 pb-6 border-b">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">{order.id}</h3>
                      <p className="text-gray-600 text-sm mt-1">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      <i className={`fas ${getStatusIcon(order.status)}`}></i>
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">From</h4>
                      <p className="text-lg text-gray-900">{order.from}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">To</h4>
                      <p className="text-lg text-gray-900">{order.to}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Items</h4>
                      <p className="text-lg text-gray-900">{order.items} items</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Weight</h4>
                      <p className="text-lg text-gray-900">{order.weight}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                    <p className="text-sm text-gray-600">
                      <span className="font-bold">Estimated Delivery:</span> {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>

                  <button className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-bold transition-all">
                    Track Order
                  </button>
                </RevealSection>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                <p className="text-2xl font-bold text-gray-700">No current orders</p>
                <p className="text-gray-600 mt-2">Start shipping with us today!</p>
              </div>
            )}
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === 'previous' && (
          <div className="space-y-6">
            {mockOrders.previous.length > 0 ? (
              mockOrders.previous.map(order => (
                <RevealSection key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-6 pb-6 border-b">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">{order.id}</h3>
                      <p className="text-gray-600 text-sm mt-1">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      <i className={`fas ${getStatusIcon(order.status)}`}></i>
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">From</h4>
                      <p className="text-lg text-gray-900">{order.from}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">To</h4>
                      <p className="text-lg text-gray-900">{order.to}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Items</h4>
                      <p className="text-lg text-gray-900">{order.items} items</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Weight</h4>
                      <p className="text-lg text-gray-900">{order.weight}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                    <p className="text-sm text-gray-600">
                      <span className="font-bold">Delivered on:</span> {new Date(order.deliveredDate).toLocaleDateString()}
                    </p>
                  </div>
                </RevealSection>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <i className="fas fa-history text-6xl text-gray-300 mb-4"></i>
                <p className="text-2xl font-bold text-gray-700">No order history</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
