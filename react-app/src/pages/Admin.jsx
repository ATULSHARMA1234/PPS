import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

export default function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [activeTab, setActiveTab] = useState('home')
  const [content, setContent] = useState({
    home: {
      heroTitle: 'PPS Logistics',
      heroSubtitle: 'Fast. Reliable. Fiery. Redefining Indian Supply Chains.',
      aboutText: 'Prakash Parcel Services Limited started in 1992...',
      services: [
        { title: 'Full Truck Load (FTL)', desc: 'Exclusive use of a truck...' },
        { title: 'Partial Truck Load (PTL)', desc: 'Optimized cargo sharing...' },
        { title: 'Warehousing', desc: 'Secured hubs with real-time...' }
      ]
    },
    about: {
      historyText: 'Prakash Parcel Services Limited started in 1992...',
      missionText: 'To provide innovative, reliable, and sustainable logistics...',
      visionText: 'To become India\'s most trusted logistics partner...'
    },
    services: {
      introText: 'PPS Logistics offers a wide range of logistics...',
      additionalServices: [
        { title: 'Express Delivery', desc: 'Fast, time-sensitive deliveries...' },
        { title: 'International Logistics', desc: 'Cross-border shipping solutions...' }
      ]
    },
    contact: {
      phone: '+91 999 000 1111',
      email: 'info@ppslogistics.in',
      address: 'PPS Logistics Hub, Plot No. 42-A, Industrial Estate, Phase III, New Delhi - 110020, India'
    }
  })

  useEffect(() => {
    document.title = 'Admin Panel | PPS Logistics'
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (adminPassword === 'Admin@12345') {
      setIsAuthenticated(true)
      setAdminPassword('')
    } else {
      alert('Invalid password!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAdminPassword('')
    navigate('/')
  }

  const handleContentChange = (section, key, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleServiceChange = (section, index, key, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key.includes('Services') ? key : 'services']: prev[section][key.includes('Services') ? key : 'services'].map((item, i) => 
          i === index ? { ...item, [key.split('.')[1] || key]: value } : item
        )
      }
    }))
  }

  const handleSaveChanges = () => {
    localStorage.setItem('ppsAdminContent', JSON.stringify(content))
    alert('Changes saved successfully!')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-black text-center text-gray-900 mb-2">PPS Logistics</h1>
          <p className="text-center text-gray-600 mb-8">Admin Panel</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Admin Password</label>
              <input 
                type="password" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-blue-600">Admin Panel</h1>
            <p className="text-gray-600 text-sm">Manage PPS Logistics Content</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-bold transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-x-auto">
          <div className="flex border-b">
            {['home', 'about', 'services', 'contact'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Hero Section</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Hero Title</label>
                  <input 
                    type="text"
                    value={content.home.heroTitle}
                    onChange={(e) => handleContentChange('home', 'heroTitle', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Hero Subtitle</label>
                  <textarea 
                    value={content.home.heroSubtitle}
                    onChange={(e) => handleContentChange('home', 'heroSubtitle', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">About Section</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">About Text</label>
                <textarea 
                  value={content.home.aboutText}
                  onChange={(e) => handleContentChange('home', 'aboutText', e.target.value)}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Services</h2>
              
              <div className="space-y-6">
                {content.home.services.map((service, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Service Title {idx + 1}</label>
                      <input 
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const newServices = [...content.home.services]
                          newServices[idx].title = e.target.value
                          handleContentChange('home', 'services', newServices)
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Service Description</label>
                      <textarea 
                        value={service.desc}
                        onChange={(e) => {
                          const newServices = [...content.home.services]
                          newServices[idx].desc = e.target.value
                          handleContentChange('home', 'services', newServices)
                        }}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Company History</h2>
              <textarea 
                value={content.about.historyText}
                onChange={(e) => handleContentChange('about', 'historyText', e.target.value)}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Mission</h2>
              <textarea 
                value={content.about.missionText}
                onChange={(e) => handleContentChange('about', 'missionText', e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Vision</h2>
              <textarea 
                value={content.about.visionText}
                onChange={(e) => handleContentChange('about', 'visionText', e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Services Introduction</h2>
              <textarea 
                value={content.services.introText}
                onChange={(e) => handleContentChange('services', 'introText', e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Additional Services</h2>
              
              <div className="space-y-6">
                {content.services.additionalServices.map((service, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Service Title</label>
                      <input 
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const newServices = [...content.services.additionalServices]
                          newServices[idx].title = e.target.value
                          handleContentChange('services', 'additionalServices', newServices)
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                      <textarea 
                        value={service.desc}
                        onChange={(e) => {
                          const newServices = [...content.services.additionalServices]
                          newServices[idx].desc = e.target.value
                          handleContentChange('services', 'additionalServices', newServices)
                        }}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Contact Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel"
                    value={content.contact.phone}
                    onChange={(e) => handleContentChange('contact', 'phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email"
                    value={content.contact.email}
                    onChange={(e) => handleContentChange('contact', 'email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                  <textarea 
                    value={content.contact.address}
                    onChange={(e) => handleContentChange('contact', 'address', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex gap-4 mt-8">
          <button 
            onClick={handleSaveChanges}
            className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
          >
            Save All Changes
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
          >
            View Website
          </button>
        </div>
      </div>
    </div>
  )
}
