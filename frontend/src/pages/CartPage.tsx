import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles, Gift, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const CartPage: React.FC = () => {
  const { items, total } = useCart();
  const navigate = useNavigate();

  const shippingCost = total > 50 ? 0 : 5.99;
  const totalWithShipping = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
        <div className='container-max section-padding'>
          <div className='text-center py-20 animate-fade-in-up'>
            <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-8 animate-bounce-gentle'>
              <ShoppingBag className='w-12 h-12 text-white' />
            </div>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Your cart is empty
            </h2>
            <p className='text-xl text-gray-600 mb-8 max-w-md mx-auto'>
              Discover amazing biometric devices and start building your
              security solution.
            </p>
            <Link to='/' className='btn-primary text-lg px-8 py-4'>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      <div className='container-max section-padding'>
        <div className='mb-8 animate-fade-in-up'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Shopping Cart
          </h1>
          <p className='text-gray-600'>
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className='lg:grid lg:grid-cols-12 lg:gap-12'>
          {/* Cart Items */}
          <div className='lg:col-span-8 mb-8 lg:mb-0'>
            <div className='card p-6 animate-fade-in-up stagger-1'>
              <div className='space-y-6'>
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className='animate-fade-in-up'
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CartItem item={item} />
                    {index < items.length - 1 && (
                      <hr className='border-gray-200' />
                    )}
                  </div>
                ))}
              </div>

              <div className='mt-8 pt-6 border-t border-gray-200'>
                <Link
                  to='/'
                  className='inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 group'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300'
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
          <div className='lg:col-span-4'>
            <div className='card p-6 animate-fade-in-up stagger-2 sticky top-24'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Order Summary
              </h2>

              {/* Benefits */}
              <div className='space-y-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl'>
                <div className='flex items-center text-sm text-gray-700'>
                  <Truck className='w-4 h-4 text-blue-500 mr-3' />
                  <span>Free shipping on orders over ₹50</span>
                </div>
                <div className='flex items-center text-sm text-gray-700'>
                  <Gift className='w-4 h-4 text-green-500 mr-3' />
                  <span>30-day return guarantee</span>
                </div>
                <div className='flex items-center text-sm text-gray-700'>
                  <Sparkles className='w-4 h-4 text-purple-500 mr-3' />
                  <span>Premium customer support</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className='space-y-4 mb-6'>
                <div className='flex justify-between text-gray-700'>
                  <span>Subtotal ({items.length} items)</span>
                  <span className='font-semibold'>₹{total.toFixed(2)}</span>
                </div>

                <div className='flex justify-between text-gray-700'>
                  <span>Shipping</span>
                  <span className='font-semibold'>
                    {shippingCost === 0 ? (
                      <span className='text-green-600'>Free</span>
                    ) : (
                      `₹${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {total < 50 && (
                  <div className='text-sm text-amber-600 bg-amber-50 p-3 rounded-lg'>
                    Add ₹{(50 - total).toFixed(2)} more for free shipping!
                  </div>
                )}

                <hr className='border-gray-200' />

                <div className='flex justify-between text-xl font-bold text-gray-900'>
                  <span>Total</span>
                  <span className='gradient-text'>
                    ₹{totalWithShipping.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className='w-full btn-primary text-lg py-4 group flex items-center '
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300' />
              </button>

              {/* Security Badge */}
              <div className='mt-6 text-center'>
                <div className='inline-flex items-center px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600'>
                  <svg
                    className='w-4 h-4 mr-2 text-green-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Secure checkout
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
