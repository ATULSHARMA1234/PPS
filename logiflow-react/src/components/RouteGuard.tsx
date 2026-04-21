import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ 
  children, 
  allowedRoles = [], 
  requireAuth = false 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication state
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (requireAuth && (!token || !userData)) {
      // Redirect to home if authentication is required but user is not logged in
      navigate('/');
      return;
    }

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Check if user has required role
        if (allowedRoles.length > 0 && !allowedRoles.includes(parsedUser.role)) {
          // Redirect to dashboard if user doesn't have required role
          navigate('/dashboard');
          return;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        if (requireAuth) {
          navigate('/');
        }
      }
    }

    setLoading(false);
  }, [allowedRoles, requireAuth, navigate]);

  // List of admin/manager routes that customers should not access
  const protectedRoutes = [
    '/global-fleet-map',
    '/fleet-map',
    '/overview',
    '/personnel',
    '/revenue-hub',
    '/admin',
    '/manager',
    '/driver',
    '/admin/login',
    '/manager/login',
    '/driver/login'
  ];

  useEffect(() => {
    if (user && user.role === 'customer') {
      // Check if current route is protected for admin/manager only
      const isProtectedRoute = protectedRoutes.some(route => 
        location.pathname.startsWith(route)
      );
      
      if (isProtectedRoute) {
        // Redirect customers to their dashboard
        navigate('/dashboard');
      }
    }
  }, [user, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
