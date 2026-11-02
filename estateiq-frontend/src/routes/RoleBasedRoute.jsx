import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.role;
  if (!allowedRoles.includes(role)) {
    // Route user to their own module
    if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'agent') return <Navigate to="/agent/dashboard" replace />;
    if (role === 'seller') return <Navigate to="/seller/dashboard" replace />;
    return <Navigate to="/buyer/dashboard" replace />;
  }

  return children;
};
