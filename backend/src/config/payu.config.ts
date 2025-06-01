import dotenv from 'dotenv';

dotenv.config();

export interface PayUConfig {
  merchantKey: string;
  merchantSalt: string;
  payuBaseUrl: string;
  successUrl: string;
  failureUrl: string;
  webhookUrl: string;
}

if (!process.env.PAYU_MERCHANT_KEY || !process.env.PAYU_MERCHANT_SALT) {
  throw new Error('PayU credentials are required. Please check your .env file.');
}

// Base URLs
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5001';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Callback URLs
const CALLBACK_URL = `${BACKEND_URL}/api/payments/callback`;

const payuConfig: PayUConfig = {
  merchantKey: process.env.PAYU_MERCHANT_KEY,
  merchantSalt: process.env.PAYU_MERCHANT_SALT,
  payuBaseUrl: process.env.PAYU_BASE_URL || 'https://test.payu.in/_payment',
  successUrl: CALLBACK_URL,
  failureUrl: CALLBACK_URL,
  webhookUrl: CALLBACK_URL
};

export default payuConfig; 