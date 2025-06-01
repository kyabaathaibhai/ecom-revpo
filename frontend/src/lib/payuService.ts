import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export interface PaymentRequest {
  amount?: number;
  productInfo?: string;
  firstName?: string;
  email?: string;
  phone?: string;
  address?: string;
  orderId?: string;
}

export interface PaymentResponse {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  action: string;
}

export const initiatePayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  try {
    const response = await axios.post(`${API_URL}/payments/initiate`, paymentData);
    return response.data;
  } catch (error) {
    console.log({ error }, 'error line 34');
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error initiating payment');
    }
    throw error;
  }
}; 