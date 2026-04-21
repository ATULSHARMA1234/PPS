import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthModal } from './AuthModal';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check authentication state
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const isDashboardPage = ['/overview', '/personnel', '/revenue-hub', '/global-fleet-map'].includes(location.pathname);
  const isCustomerDashboard = location.pathname === '/dashboard';

  // Hide the global navbar entirely on specific portal pages
  const hiddenOnPages = ['/admin', '/manager', '/driver', '/admin/login', '/manager/login', '/driver/login'];
  if (hiddenOnPages.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header 
      id="navbar" 
      className={`fixed w-full z-50 transition-all duration-300 py-4 h-20 ${
        isHomePage && !isScrolled ? '' : 'bg-white border-b border-slate-200'
      }`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold tracking-tighter flex items-center gap-2">
          <svg 
            className={`w-8 h-8 ${isHomePage && !isScrolled ? 'text-white' : 'text-electric'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span className={isHomePage && !isScrolled ? 'text-white' : 'text-navy'}>
            LogiFlow
          </span>
        </Link>
        
        <nav className="hidden md:flex flex-row space-x-8 items-center font-medium">
          {user ? (
            // Authenticated user navigation
            <>
              {isCustomerDashboard || isDashboardPage ? (
                // Customer dashboard navigation
                <>
                  <Link to="/dashboard" className={`${location.pathname === '/dashboard' ? 'text-electric font-semibold' : 'text-navy'} hover:text-electric transition-colors`}>
                    Dashboard
                  </Link>
                  <Link to="/book-warehouse" className={`${location.pathname === '/book-warehouse' ? 'text-electric font-semibold' : 'text-navy'} hover:text-electric transition-colors`}>
                    Book Warehouse
                  </Link>
                  <Link to="/book-ocean-freight" className={`${location.pathname === '/book-ocean-freight' ? 'text-electric font-semibold' : 'text-navy'} hover:text-electric transition-colors`}>
                    Ocean Freight
                  </Link>
                  <Link to="/book-last-mile" className={`${location.pathname === '/book-last-mile' ? 'text-electric font-semibold' : 'text-navy'} hover:text-electric transition-colors`}>
                    Last Mile
                  </Link>
                </>
              ) : (
                // Regular pages when logged in
                <>
                  <Link to="/" className={`${isHomePage && !isScrolled ? 'text-white' : 'text-navy'} hover:text-electric transition-colors`}>Home</Link>
                  <Link to="/dashboard" className={`${isHomePage && !isScrolled ? 'text-white' : 'text-navy'} hover:text-electric transition-colors`}>Dashboard</Link>
                  <a href={isHomePage ? "#services" : "/#services"} className={`${isHomePage && !isScrolled ? 'text-white' : 'text-navy'} hover:text-electric transition-colors`}>Services</a>
                  <a href={isHomePage ? "#about" : "/#about"} className={`${isHomePage && !isScrolled ? 'text-white' : 'text-navy'} hover:text-electric transition-colors`}>About Us</a>
                </>
              )}
              
              {/* User profile section */}
              <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
                <div className="text-right">
                  <p className={`text-sm font-medium ${isHomePage && !isScrolled ? 'text-white' : 'text-slate-900'}`}>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className={`text-xs ${isHomePage && !isScrolled ? 'text-white/80' : 'text-slate-500'}`}>{user.role}</p>
                </div>
                <div className={`w-8 h-8 ${isHomePage && !isScrolled ? 'bg-white/20' : 'bg-electric'} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                  {user.firstName.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className={`px-3 py-1 text-sm ${isHomePage && !isScrolled ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-500 hover:bg-red-600 text-white'} rounded-lg transition-colors`}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            // Non-authenticated user navigation
            <>
              {isDashboardPage ? (
                <>
                  <Link to="/overview" className={`${location.pathname === '/overview' ? 'text-electric font-semibold' : 'text-navy'} hover:text-electric transition-colors`}>
                    Overview
                  </Link>
                  <Link to="/personnel" className={`${location.pathname === '/personnel' ? 'text-electric font-semibold' : 'text-navy'} hover:text-electric transition-colors`}>
                    Personnel
                  </Link>
                  <Link to="/revenue-hub" className={`${location.pathname === '/revenue-hub' ? 'text-electric font-semibold' : 'text-navy'} hover:text-electric transition-colors`}>
                    Revenue Hub
                  </Link>
                  <Link to="/global-fleet-map" className={`${location.pathname === '/global-fleet-map' ? 'text-electric font-semibold' : 'text-navy'} hover:text-electric transition-colors`}>
                    Global Fleet Map
                  </Link>
                  <Link to="/" className="text-navy hover:text-electric transition-colors">Home</Link>
                </>
              ) : (
                <>
                  <Link to="/" className={`${isHomePage && !isScrolled ? 'text-white' : 'text-navy'} hover:text-electric transition-colors`}>Home</Link>
                  <a href={isHomePage ? "#services" : "/#services"} className={`${isHomePage && !isScrolled ? 'text-white' : 'text-navy'} hover:text-electric transition-colors`}>Services</a>
                  <a href={isHomePage ? "#events" : "/#events"} className={`${isHomePage && !isScrolled ? 'text-white' : 'text-navy'} hover:text-electric transition-colors`}>Events</a>
                  <a href={isHomePage ? "#about" : "/#about"} className={`${isHomePage && !isScrolled ? 'text-white' : 'text-navy'} hover:text-electric transition-colors`}>About Us</a>
                </>
              )}
              
              <button 
                onClick={() => setIsAuthModalOpen(true)} 
                className="bg-electric hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                Sign In / Login
              </button>
            </>
          )}
        </nav>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};
