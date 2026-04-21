import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email, password }
        : { email, password, firstName: fullName.split(' ')[0] || '', lastName: fullName.split(' ')[1] || 'User', phone: '9876543210' };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        // Store token in localStorage
        localStorage.setItem('authToken', result.data.accessToken);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        
        // Close modal and redirect to dashboard
        onClose();
        window.location.href = '/dashboard';
      } else {
        setError(result.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/40 backdrop-blur-sm p-4">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-md overflow-hidden z-10 scale-100 opacity-100 transition-all duration-300">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all z-20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Header Tabs */}
        <div className="flex border-b border-slate-100 pt-2 bg-slate-50/50">
          <button 
            className={`flex-1 py-4 text-center font-bold text-lg transition-colors relative ${isLogin ? 'text-electric' : 'text-slate-400 hover:text-slate-600'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
            {isLogin && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-electric rounded-t-xl shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>}
          </button>
          <button 
            className={`flex-1 py-4 text-center font-bold text-lg transition-colors relative ${!isLogin ? 'text-electric' : 'text-slate-400 hover:text-slate-600'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
            {!isLogin && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-electric rounded-t-xl shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>}
          </button>
        </div>
        
        <div className="p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-navy mb-2">
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Join LogiFlow to optimize your supply chain.'}
            </p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-electric focus:bg-white focus:ring-4 focus:ring-electric/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium" 
                  placeholder="John Doe" 
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-electric focus:bg-white focus:ring-4 focus:ring-electric/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium" 
                placeholder="you@example.com" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                {isLogin && <a href="#forgot" className="text-xs font-bold text-electric hover:text-blue-700 hover:underline">Forgot?</a>}
              </div>
              <input 
                type="password" 
                name="password"
                required
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-electric focus:bg-white focus:ring-4 focus:ring-electric/10 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-bold tracking-widest leading-none" 
                placeholder="••••••••" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3.5 bg-electric hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transform hover:-translate-y-0.5 transition-all mt-6 disabled:transform-none disabled:shadow-none"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In Securely' : 'Create Account')}
            </button>
            
            <div className="mt-6 pt-6 border-t border-slate-100">
              <button 
                type="button" 
                className="w-full py-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-3 transition-all"
              >
                <svg className="w-5 h-5 text-current" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
