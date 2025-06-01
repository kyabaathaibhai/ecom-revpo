import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface CartProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const CartProtectedRoute: React.FC<CartProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { user, loading, isAdmin } = useAuth();

  console.log('CartProtectedRoute:', { requireAdmin, isAdmin, user, loading });

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600'></div>
      </div>
    );
  }

  if (!user) {
    console.log('No user, redirecting to signin');
    return <Navigate to='/signin' state={{ from: window.location.pathname }} />;
  }

  if (requireAdmin && loading && !isAdmin) {
    console.log('User is not admin, redirecting to home');
    return <Navigate to='/' />;
  }

  return <>{children}</>;
};

export default CartProtectedRoute;
