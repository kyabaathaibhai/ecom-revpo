import express from 'express';
import { initiatePayment, handlePaymentCallback } from '../controllers/payment.controller';

const router = express.Router();

router.post('/initiate', initiatePayment);
router.post('/callback', handlePaymentCallback);

export const paymentRoutes = router; 