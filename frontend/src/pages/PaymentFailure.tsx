import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useToast } from '../hooks/useToast';

export const PaymentFailure: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const orderId = searchParams.get('orderId');
  const txnId = searchParams.get('txnid');
  const error = searchParams.get('error_Message') || 'Payment failed';

  useEffect(() => {
    // Show error message
    showToast({
      title: 'Payment Failed',
      message: error,
      type: 'error',
    });
  }, [error, showToast]);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md'>
        <div className='text-center'>
          <XCircleIcon className='mx-auto h-12 w-12 text-red-500' />
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Payment Failed
          </h2>
          <p className='mt-2 text-sm text-gray-600'>Order ID: {orderId}</p>
          <p className='mt-2 text-sm text-gray-600'>Transaction ID: {txnId}</p>
          <p className='mt-2 text-sm text-red-600'>{error}</p>
        </div>

        <div className='mt-8 space-y-4'>
          <button
            onClick={() => window.history.back()}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/checkout')}
            className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Return to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
