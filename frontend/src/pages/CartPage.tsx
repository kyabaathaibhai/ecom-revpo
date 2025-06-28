import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Shield, Truck, RefreshCw, Gift } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const CartPage: React.FC = () => {
  const { items, total } = useCart();
  const navigate = useNavigate();

  const shippingCost = total > 50 ? 0 : 5.99;
  const totalWithShipping = total + shippingCost;
  const savings = total > 100 ? total * 0.05 : 0; // 5% discount for orders over ₹100

  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
        <div className='container-max section-padding'>
          <div className='text-center py-20 animate-fade-in-up'>
            <div className='w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8'>
              <ShoppingBag className='h-16 w-16 text-gray-400' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Your cart is empty
            </h2>
            <p className='text-xl text-gray-600 mb-8 max-w-md mx-auto'>
              Looks like you haven't added anything to your cart yet. Start exploring our amazing products!
            </p>
            <Link to='/' className='btn-primary text-lg px-8 py-4 inline-flex items-center'>
              <ShoppingBag className='mr-2 w-5 h-5' />
              Continue Shopping
            </Link>
            
            {/* Featured Categories */}
            <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
              {[
                { name: 'Fingerprint Scanners', icon: '👆', color: 'from-blue-500 to-cyan-500' },
                { name: 'Face Recognition', icon: '👤', color: 'from-purple-500 to-pink-500' },
                { name: 'Access Control', icon: '🔐', color: 'from-green-500 to-teal-500' }
              ].map((category, index) => (
                <div key={index} className='card p-6 text-center hover-lift'>
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl`}>
                    {category.icon}
                  </div>
                  <h3 className='font-semibold text-gray-900'>{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='container-max section-padding'>
        <div className='animate-fade-in-up'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Shopping Cart
          </h1>
          <p className='text-gray-600 mb-8'>
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-8'>
            <div className='card overflow-hidden animate-fade-in-left'>
              <div className='p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50'>
                <h2 className='text-xl font-semibold text-gray-900'>Order Items</h2>
              </div>
              
              <div className='divide-y divide-gray-100'>
                {items.map((item, index) => (
                  <div key={item.id} className='animate-fade-in-up' style={{ animationDelay: `${index * 0.1}s` }}>
                    <CartItem item={item} />
                  </div>
                ))}
              </div>

              <div className='p-6 border-t border-gray-100 bg-gray-50'>
                <Link
                  to='/'
                  className='text-blue-600 hover:text-blue-700 font-semibold flex items-center transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-2'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='mt-8 lg:mt-0 lg:col-span-4'>
            <div className='card p-6 animate-fade-in-right sticky top-24'>
              <h2 className='text-xl font-semibold text-gray-900 mb-6'>
                Order Summary
              </h2>

              <div className='space-y-4 mb-6'>
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal ({items.length} items)</span>
                  <span className='font-medium'>₹{total.toLocaleString()}</span>
                </div>

                {savings > 0 && (
                  <div className='flex justify-between text-green-600'>
                    <span className='flex items-center'>
                      <Gift className='w-4 h-4 mr-1' />
                      Bulk Discount (5%)
                    </span>
                    <span className='font-medium'>-₹{savings.toFixed(2)}</span>
                  </div>
                )}

                <div className='flex justify-between text-gray-600'>
                  <span className='flex items-center'>
                    <Truck className='w-4 h-4 mr-1' />
                    Shipping
                  </span>
                  <span className='font-medium'>
                    {shippingCost === 0 ? (
                      <span className='text-green-600 font-semibold'>Free</span>
                    ) : (
                      `₹${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {total < 50 && (
                  <div className='text-sm text-blue-600 bg-blue-50 p-3 rounded-lg'>
                    Add ₹{(50 - total).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className='pt-4 border-t border-gray-200 flex justify-between font-bold text-xl'>
                  <span>Total</span>
                  <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    ₹{(totalWithShipping - savings).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className='w-full btn-primary py-4 text-lg flex items-center justify-center mb-4'
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className='ml-2 h-5 w-5' />
              </button>

              {/* Security Features */}
              <div className='space-y-3 pt-6 border-t border-gray-100'>
                <div className='flex items-center text-sm text-gray-600'>
                  <Shield className='w-4 h-4 mr-2 text-green-500' />
                  Secure SSL encryption
                </div>
                <div className='flex items-center text-sm text-gray-600'>
                  <RefreshCw className='w-4 h-4 mr-2 text-blue-500' />
                  30-day return policy
                </div>
                <div className='flex items-center text-sm text-gray-600'>
                  <Truck className='w-4 h-4 mr-2 text-purple-500' />
                  Free shipping on orders over ₹50
                </div>
              </div>

              {/* Trust Badges */}
              <div className='mt-6 pt-6 border-t border-gray-100'>
                <p className='text-xs text-gray-500 text-center mb-3'>Trusted by 500K+ customers</p>
                <div className='flex justify-center space-x-4 opacity-60'>
                  <div className='w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold'>
                    SSL
                  </div>
                  <div className='w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold'>
                    256
                  </div>
                  <div className='w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold'>
                    PCI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;