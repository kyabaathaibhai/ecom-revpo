import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

const PaymentCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'success' | 'failure' | 'loading'>(
    'loading'
  );

  useEffect(() => {
    const paymentStatus = searchParams.get('status')?.toLowerCase();

    if (paymentStatus === 'success') {
      setStatus('success');
      setTimeout(() => navigate('/orders'), 3000);
    } else {
      setStatus('failure');
      setTimeout(() => navigate('/checkout'), 3000);
    }
  }, [searchParams, navigate]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center'>
        {status === 'loading' && (
          <div className='animate-pulse'>
            <div className='h-12 w-12 mx-auto mb-4 rounded-full bg-gray-200'></div>
            <div className='h-4 w-3/4 mx-auto bg-gray-200 rounded'></div>
          </div>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className='h-12 w-12 text-green-500 mx-auto mb-4' />
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Payment Successful!
            </h2>
            <p className='text-gray-600'>
              Your order has been confirmed. Redirecting to orders page...
            </p>
          </>
        )}

        {status === 'failure' && (
          <>
            <XCircle className='h-12 w-12 text-red-500 mx-auto mb-4' />
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Payment Failed
            </h2>
            <p className='text-gray-600'>
              Something went wrong with your payment. Redirecting back to
              checkout...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;
