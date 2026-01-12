import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const [signupModal, setSignupModal] = useState(false)
  const [registerType, setRegisterType] = useState('user')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    alert('Login form submitted!')
    setLoginModal(false)
  }

  const handleSignupUserSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    
    if (data.password !== data.confirm) {
      alert('Passwords do not match!')
      return
    }
    
    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(data.password)) {
      alert('Password must contain uppercase letter, number and special character!')
      return
    }
    
    alert('User account created successfully!')
    setSignupModal(false)
    e.target.reset()
  }

  const handleSignupPartnerSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    
    if (data.phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number!')
      return
    }
    
    if (data.password !== data.confirm) {
      alert('Passwords do not match!')
      return
    }
    
    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(data.password)) {
      alert('Password must contain uppercase letter, number and special character!')
      return
    }
    
    alert('Delivery partner registration submitted successfully!')
    setSignupModal(false)
    e.target.reset()
  }

  return (
    <>
      <nav className={`fixed top-0 right-0 z-50 p-6 flex items-center space-x-6 transition-all duration-500 ${
        isScrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-md py-4 shadow-2xl' : ''
      }`}>
        <div className="hidden md:flex space-x-6 text-sm font-bold uppercase tracking-widest items-center">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
          <a href="/#events" className="hover:text-blue-400 transition-colors">Events</a>
          <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          
          <div className="flex items-center space-x-4 border-l pl-6 border-white/20">
            <button onClick={() => setLoginModal(true)} className="hover:text-blue-500 transition-colors">Login</button>
            <button onClick={() => setSignupModal(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all shadow-lg active:scale-95">
              Create Account
            </button>
          </div>
        </div>
        
        <div className="flex space-x-4 text-lg border-l pl-6 border-white/20">
          <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-facebook"></i></a>
          <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-linkedin"></i></a>
        </div>
      </nav>

      <Modal 
        isOpen={loginModal} 
        onClose={() => setLoginModal(false)}
        title="Login"
      >
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-300 mb-2 block">Email</span>
            <input type="email" name="email" required className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none" />
          </label>
          <label className="block">
            <span className="text-gray-300 mb-2 block">Password</span>
            <input type="password" name="password" required className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none" />
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
          <p className="text-gray-400 text-sm mb-4">Select your registration type:</p>
          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={() => setRegisterType('user')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-bold transition-all ${
                registerType === 'user' 
                  ? 'border-blue-600 bg-blue-600/20 text-white' 
                  : 'border-gray-600 bg-transparent text-white hover:border-blue-600'
              }`}
            >
              <i className="fas fa-user mr-2"></i>User
            </button>
            <button 
              type="button"
              onClick={() => setRegisterType('partner')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-bold transition-all ${
                registerType === 'partner' 
                  ? 'border-blue-600 bg-blue-600/20 text-white' 
                  : 'border-gray-600 bg-transparent text-white hover:border-blue-600'
              }`}
            >
              <i className="fas fa-truck mr-2"></i>Delivery Partner
            </button>
          </div>
        </div>

        {registerType === 'user' ? (
          <form onSubmit={handleSignupUserSubmit} className="space-y-4">
            <label className="block">
              <span className="text-gray-300 mb-2 block">Full name</span>
              <input type="text" name="name" required className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-300 mb-2 block">Email</span>
              <input type="email" name="email" required className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-300 mb-2 block">Password</span>
              <input type="password" name="password" required minLength="8" placeholder="Min 8 characters with uppercase, number & special char" className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none text-sm" />
            </label>
            <label className="block">
              <span className="text-gray-300 mb-2 block">Confirm password</span>
              <input type="password" name="confirm" required minLength="8" className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none" />
            </label>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all">Create account</button>
          </form>
        ) : (
          <form onSubmit={handleSignupPartnerSubmit} className="space-y-4">
            <label className="block">
              <span className="text-gray-300 mb-2 block">Full name</span>
              <input type="text" name="name" required className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-300 mb-2 block">Mobile Number</span>
              <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-300 mb-2 block">Email ID</span>
              <input type="email" name="email" required className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none" />
            </label>
            <label className="block">
              <span className="text-gray-300 mb-2 block">Password</span>
              <input type="password" name="password" required minLength="8" placeholder="Min 8 characters with uppercase, number & special char" className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none text-sm" />
            </label>
            <label className="block">
              <span className="text-gray-300 mb-2 block">Confirm password</span>
              <input type="password" name="confirm" required minLength="8" className="w-full p-3 bg-[#121212] border border-blue-600/30 rounded-lg text-white focus:border-blue-500 outline-none" />
            </label>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all">Register as Partner</button>
          </form>
        )}
      </Modal>
    </>
  )
}