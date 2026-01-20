import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from './Modal'

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loginModal, setLoginModal] = useState(false)
  const [signupModal, setSignupModal] = useState(false)
  const [registerType, setRegisterType] = useState('user')
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('ppsUser')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    const userData = {
      name: 'User',
      email: formData.email,
      type: 'user'
    }
    localStorage.setItem('ppsUser', JSON.stringify(userData))
    setUser(userData)
    setLoginModal(false)
    alert('Logged in successfully!')
    e.target.reset()
  }

  const handleSignupUserSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    
    if (formData.password !== formData.confirm) {
      alert('Passwords do not match!')
      return
    }
    
    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
      alert('Password must contain uppercase letter, number and special character!')
      return
    }
    
    const userData = {
      name: formData.name,
      email: formData.email,
      type: 'user'
    }
    localStorage.setItem('ppsUser', JSON.stringify(userData))
    setUser(userData)
    setSignupModal(false)
    alert('Account created successfully!')
    e.target.reset()
  }

  const handleSignupPartnerSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    
    if (formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number!')
      return
    }
    
    if (formData.password !== formData.confirm) {
      alert('Passwords do not match!')
      return
    }
    
    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
      alert('Password must contain uppercase letter, number and special character!')
      return
    }
    
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: 'partner'
    }
    localStorage.setItem('ppsUser', JSON.stringify(userData))
    setUser(userData)
    setSignupModal(false)
    alert('Partner account created successfully!')
    e.target.reset()
  }

  const handleLogout = () => {
    localStorage.removeItem('ppsUser')
    setUser(null)
    setShowProfileMenu(false)
    navigate('/')
  }

  const getProfilePath = () => {
    if (!user) return '/profile'
    return user.type === 'partner' ? '/partner-profile' : '/profile'
  }

  return (
    <>
      <nav id="mainNav" className="fixed top-0 right-0 z-50 p-6 flex items-center space-x-6 transition-all duration-500 text-gray-800">
        <div className="hidden md:flex space-x-6 text-sm font-bold uppercase tracking-widest items-center">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
          <Link to="/events" className="hover:text-blue-400 transition-colors">Events</Link>
          <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          
          <div className="flex items-center space-x-4 border-l pl-6 border-gray-300">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                >
                  <i className="fas fa-user-circle text-2xl"></i>
                  <span className="text-xs hidden sm:inline">{user.name}</span>
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-2">
                    <Link 
                      to={getProfilePath()}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <i className="fas fa-user mr-2"></i>
                      {user.type === 'partner' ? 'Dashboard' : 'View Profile'}
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => setLoginModal(true)} className="hover:text-blue-500 transition-colors">Login</button>
                <button onClick={() => setSignupModal(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all shadow-lg active:scale-95">
                  Create Account
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex space-x-4 text-lg border-l pl-6 border-gray-300">
          <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook"></i></a>
          <a href="#" className="hover:text-blue-500"><i className="fab fa-linkedin"></i></a>
        </div>
      </nav>

      <Modal 
        isOpen={loginModal} 
        onClose={() => setLoginModal(false)}
        title="Login"
      >
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700 mb-2 block">Email</span>
            <input type="email" name="email" required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none" />
          </label>
          <label className="block">
            <span className="text-gray-700 mb-2 block">Password</span>
            <input type="password" name="password" required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none" />
          </label>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all">Sign in</button>
        </form>
      </Modal>

      <Modal 
        isOpen={signupModal} 
        onClose={() => setSignupModal(false)}
        title="Create Account"
      >
        <div className="space-y-4 mb-6">
          <p className="text-gray-700 text-sm mb-4">Select your registration type:</p>
          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={() => setRegisterType('user')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-bold transition-all ${
                registerType === 'user' 
                  ? 'border-blue-600 bg-blue-50 text-gray-900' 
                  : 'border-gray-300 bg-transparent text-gray-900 hover:border-blue-600'
              }`}
            >
              <i className="fas fa-user mr-2"></i>User
            </button>
            <button 
              type="button"
              onClick={() => setRegisterType('partner')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-bold transition-all ${
                registerType === 'partner' 
                  ? 'border-blue-600 bg-blue-50 text-gray-900' 
                  : 'border-gray-300 bg-transparent text-gray-900 hover:border-blue-600'
              }`}
            >
              <i className="fas fa-truck mr-2"></i>Delivery Partner
            </button>
          </div>
        </div>

        {registerType === 'user' ? (
          <form onSubmit={handleSignupUserSubmit} className="space-y-4">
            <label className="block">
              <span className="text-gray-700 mb-2 block">Full name</span>
              <input type="text" name="name" required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-700 mb-2 block">Email</span>
              <input type="email" name="email" required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-700 mb-2 block">Password</span>
              <input type="password" name="password" required minLength="8" placeholder="Min 8 characters with uppercase, number & special char" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none text-sm" />
            </label>
            <label className="block">
              <span className="text-gray-700 mb-2 block">Confirm password</span>
              <input type="password" name="confirm" required minLength="8" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none" />
            </label>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all">Create account</button>
          </form>
        ) : (
          <form onSubmit={handleSignupPartnerSubmit} className="space-y-4">
            <label className="block">
              <span className="text-gray-700 mb-2 block">Full name</span>
              <input type="text" name="name" required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-700 mb-2 block">Mobile Number</span>
              <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-700 mb-2 block">Email ID</span>
              <input type="email" name="email" required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-700 mb-2 block">Password</span>
              <input type="password" name="password" required minLength="8" placeholder="Min 8 characters with uppercase, number & special char" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none text-sm" />
            </label>
            <label className="block">
              <span className="text-gray-700 mb-2 block">Confirm password</span>
              <input type="password" name="confirm" required minLength="8" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 outline-none" />
            </label>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all">Register as Partner</button>
          </form>
        )}
      </Modal>
    </>
  )
}