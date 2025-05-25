import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import Footer from './components/Footer';
import { Box } from '@mui/material';

// Protected route wrapper for cart and order related pages
function CartProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: window.location.pathname }} />;
  }

  return <>{children}</>;
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignUpPage />} />
            <Route path='product/:id' element={<ProductDetails />} />

            {/* Protected Routes */}
            <Route
              path='cart'
              element={
                <CartProtectedRoute>
                  <CartPage />
                </CartProtectedRoute>
              }
            />
            <Route
              path='checkout'
              element={
                <CartProtectedRoute>
                  <CheckoutPage />
                </CartProtectedRoute>
              }
            />
            <Route
              path='confirmation'
              element={
                <CartProtectedRoute>
                  <ConfirmationPage />
                </CartProtectedRoute>
              }
            />
            <Route
              path='orders'
              element={
                <CartProtectedRoute>
                  <OrderHistoryPage />
                </CartProtectedRoute>
              }
            />
            <Route
              path='orders/:orderId'
              element={
                <CartProtectedRoute>
                  <OrderDetailsPage />
                </CartProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <Footer />
      </Box>
    </AuthProvider>
  );
};

export default App;
