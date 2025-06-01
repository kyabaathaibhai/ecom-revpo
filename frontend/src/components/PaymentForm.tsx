import React, { useState, useRef, FormEvent } from 'react';
import {
  initiatePayment,
  PaymentRequest,
  PaymentResponse,
} from '../lib/payuService';

interface PaymentFormProps {
  amount: number;
  productInfo: string;
  onSuccess?: () => void;
  onFailure?: (error: Error) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  productInfo,
  onSuccess,
  onFailure,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const paymentData: PaymentRequest = {
      amount,
      productInfo,
      firstName: formData.get('firstName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    try {
      const response: PaymentResponse = await initiatePayment(paymentData);

      // Create a dynamic form for PayU submission
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = response.action;

      // Add all required fields
      Object.entries(response).forEach(([key, value]) => {
        if (key !== 'action') {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value.toString();
          form.appendChild(input);
        }
      });

      // Submit the form
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      onSuccess?.();
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      onFailure?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
      <form onSubmit={handleSubmit} ref={formRef} className='space-y-4'>
        <div>
          <label
            htmlFor='firstName'
            className='block text-sm font-medium text-gray-700'
          >
            Full Name
          </label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='phone'
            className='block text-sm font-medium text-gray-700'
          >
            Phone Number
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          />
        </div>

        <div className='bg-gray-50 p-4 rounded-md'>
          <p className='text-sm text-gray-600'>Amount: ₹{amount}</p>
          <p className='text-sm text-gray-600'>Product: {productInfo}</p>
        </div>

        {error && <div className='text-red-600 text-sm'>{error}</div>}

        <button
          type='submit'
          disabled={loading}
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};
