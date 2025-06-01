import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useToast } from '../hooks/useToast';

export const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const orderId = searchParams.get('orderId');
  const txnId = searchParams.get('txnid');

  useEffect(() => {
    // Clear the cart after successful payment
    // clearCart();

    // Show success message
    showToast({
      title: 'Payment Successful',
      message: 'Your order has been placed successfully!',
      type: 'success',
    });
  }, [showToast]);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md'>
        <div className='text-center'>
          <CheckCircleIcon className='mx-auto h-12 w-12 text-green-500' />
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Payment Successful!
          </h2>
          <p className='mt-2 text-sm text-gray-600'>Order ID: {orderId}</p>
          <p className='mt-2 text-sm text-gray-600'>Transaction ID: {txnId}</p>
        </div>

        <div className='mt-8 space-y-4'>
          <button
            onClick={() => navigate('/orders')}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            View Order
          </button>
          <button
            onClick={() => navigate('/')}
            className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
