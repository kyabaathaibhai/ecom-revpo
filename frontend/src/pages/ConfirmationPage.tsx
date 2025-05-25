import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';

const ConfirmationPage: React.FC = () => {
  const orderNumber = `ORDER-${Math.floor(100000 + Math.random() * 900000)}`;

  // Animation when component mounts
  useEffect(() => {
    const timeout = setTimeout(() => {
      const checkmark = document.getElementById('checkmark');
      if (checkmark) {
        checkmark.classList.add('animate-bounce');
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in'>
      <div className='max-w-2xl mx-auto text-center'>
        <div className='mb-6' id='checkmark'>
          <CheckCircle className='h-16 w-16 text-secondary-500 mx-auto' />
        </div>

        <h1 className='text-3xl font-bold text-gray-900 mb-3'>
          Order Confirmed!
        </h1>
        <p className='text-lg text-gray-600 mb-4'>
          Thank you for your purchase. We've received your order and it's being
          processed.
        </p>

        <div className='bg-gray-50 rounded-lg p-6 mb-8 mt-6 inline-block'>
          <div className='flex items-center justify-center'>
            <Package className='h-5 w-5 text-gray-500 mr-2' />
            <span className='text-gray-700 font-medium'>Order Number: </span>
            <span className='ml-1 font-mono text-primary-600 font-semibold'>
              {orderNumber}
            </span>
          </div>
        </div>

        {/* <p className="text-gray-600 mb-8">
          We've sent a confirmation email with your order details and tracking information.
        </p> */}

        <div className='space-y-4'>
          <Link
            to='/'
            className='inline-block btn-primary w-full md:w-auto md:px-8 py-3'
          >
            Continue Shopping
          </Link>
        </div>

        <div className='mt-12 p-6 border border-gray-200 rounded-lg bg-white'>
          <h3 className='font-semibold text-lg text-gray-800 mb-4'>
            What Happens Next?
          </h3>

          <div className='space-y-6'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <div className='h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center'>
                  <span className='text-primary-600 font-semibold'>1</span>
                </div>
              </div>
              <div className='ml-4'>
                <h4 className='text-sm font-medium text-gray-800'>
                  Order Processing
                </h4>
                <p className='mt-1 text-sm text-gray-600'>
                  We're preparing your items for shipment.
                </p>
              </div>
            </div>

            <div className='flex'>
              <div className='flex-shrink-0'>
                <div className='h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center'>
                  <span className='text-primary-600 font-semibold'>2</span>
                </div>
              </div>
              <div className='ml-4'>
                <h4 className='text-sm font-medium text-gray-800'>Shipping</h4>
                <p className='mt-1 text-sm text-gray-600'>
                  Your order will be shipped within 1-2 business days.
                </p>
              </div>
            </div>

            <div className='flex'>
              <div className='flex-shrink-0'>
                <div className='h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center'>
                  <span className='text-primary-600 font-semibold'>3</span>
                </div>
              </div>
              <div className='ml-4'>
                <h4 className='text-sm font-medium text-gray-800'>Delivery</h4>
                <p className='mt-1 text-sm text-gray-600'>
                  Enjoy your new products! Don't forget to leave a review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
