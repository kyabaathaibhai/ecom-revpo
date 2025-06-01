import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import AdminProductsPage from './pages/admin/ProductsPage';
import CartProtectedRoute from './components/CartProtectedRoute';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProductDetails from './components/ProductDetails';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { PaymentFailure } from './pages/PaymentFailure';
import OrderHistoryPage from './pages/OrderHistoryPage';

function App() {
  return (
    <Box>
      <Toaster position='top-right' />
      <Routes>
        {/* Customer Routes */}
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='orders' element={<OrderHistoryPage />} />
          <Route path='signin' element={<SignInPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='product/:id' element={<ProductDetails />} />
          <Route path='payment/success' element={<PaymentSuccess />} />
          <Route path='payment/failure' element={<PaymentFailure />} />
          <Route
            path='checkout'
            element={
              <CartProtectedRoute>
                <CheckoutPage />
              </CartProtectedRoute>
            }
          />
          <Route
            path='order-confirmation/:orderId'
            element={<OrderConfirmationPage />}
          />
          <Route path='orders/:orderId' element={<OrderDetailsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path='/admin'
          element={
            <CartProtectedRoute requireAdmin>
              <AdminLayout />
            </CartProtectedRoute>
          }
        >
          <Route path='products' element={<AdminProductsPage />} />
          {/* Add more admin routes here */}
        </Route>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
