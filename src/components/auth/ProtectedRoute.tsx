import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    // Show loading spinner or skeleton while checking authentication
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If adminOnly route and user is not admin, redirect to dashboard
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated and passes role check, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
