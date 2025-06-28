import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const CartPage: React.FC = () => {
  const { items, total } = useCart();
  const navigate = useNavigate();

  const shippingCost = total > 50 ? 0 : 5.99;
  const totalWithShipping = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in'>
        <div className='text-center py-12'>
          <ShoppingBag className='mx-auto h-16 w-16 text-gray-400' />
          <h2 className='mt-4 text-2xl font-semibold text-gray-800'>
            Your cart is empty
          </h2>
          <p className='mt-2 text-gray-600'>
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to='/' className='mt-6 inline-block btn-primary'>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in'>
      <h1 className='text-2xl font-bold text-gray-900 mb-6'>
        Your Shopping Cart
      </h1>

      <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
        <div className='lg:col-span-8'>
          <div className='bg-white rounded-lg shadow-soft overflow-hidden'>
            <ul className='divide-y divide-gray-200 px-6'>
              {items.map((item) => (
                <li key={item.id}>
                  <CartItem item={item} />
                </li>
              ))}
            </ul>

            <div className='px-6 py-4 border-t border-gray-200'>
              <Link
                to='/'
                className='text-primary-600 hover:text-primary-700 font-medium flex items-center'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-1'
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

        <div className='mt-8 lg:mt-0 lg:col-span-4'>
          <div className='bg-white rounded-lg shadow-soft p-6 animate-slide-up'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
              Order Summary
            </h2>

            <div className='space-y-3'>
              <div className='flex justify-between text-gray-600'>
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className='flex justify-between text-gray-600'>
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className='pt-3 border-t border-gray-200 flex justify-between font-semibold text-lg'>
                <span>Total</span>
                <span>₹{totalWithShipping.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className='mt-6 w-full btn-primary flex items-center justify-center py-3'
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className='ml-2 h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;