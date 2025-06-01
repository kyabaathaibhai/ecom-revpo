import { useState } from 'react';
import { initiatePayment, PaymentRequest } from '../lib/payuService';

interface UsePaymentReturn {
  initiatePayu: (paymentData: PaymentRequest) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const usePayment = (): UsePaymentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayu = async (paymentData: PaymentRequest) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await initiatePayment(paymentData);
      
      // Create and submit the form to PayU
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
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment initiation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    initiatePayu,
    loading,
    error,
  };
}; 