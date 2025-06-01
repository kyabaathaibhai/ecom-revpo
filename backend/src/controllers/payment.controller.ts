import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PayUService, PaymentRequest } from '../services/payu.service';
import { supabase } from '../config/supabase.config';
const payuService = new PayUService();

export const initiatePayment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const paymentData: PaymentRequest = req.body;
  const { orderId } = req.body;

  if (!orderId) {
    res.status(400).json({
      success: false,
      message: 'Order ID is required'
    });
    return;
  }

  try {
    const paymentRequest = await payuService.createPaymentRequest({
      ...paymentData,
      orderId
    });
    res.json(paymentRequest);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error initiating payment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export const handlePaymentCallback = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // PayU sends data as form-urlencoded
  const paymentResponse = req.body;

  console.log('Payment response:', paymentResponse);

  try {
    // Only verify signature if we have the required fields
    if (paymentResponse.hash) {
      const isValid = payuService.verifyPayment(paymentResponse);
      
      if (!isValid) {
        console.error('Invalid payment signature for data:', paymentResponse);
        const failureUrl = new URL(`${process.env.FRONTEND_URL}/payment/failure`);
        failureUrl.searchParams.append('error_Message', 'Invalid payment signature');
        res.redirect(failureUrl.toString());
        return;
      }
    }

    // Extract relevant information from PayU response
    const {
      txnid: transactionId,
      status: paymentStatus,
      mihpayid: payuTransactionId,
      mode: paymentMode,
      error_Message: errorMessage,
      udf1: orderId, // PayU custom field containing orderId
      firstname,
      email,
      productinfo,
      field9: bankMessage
    } = paymentResponse;

    console.log('Extracted payment details:', {
      transactionId,
      paymentStatus,
      payuTransactionId,
      orderId,
      firstname,
      email,
      productinfo,
      bankMessage
    });

    if (!orderId) {
      console.error('Order ID not found in payment response');
      const failureUrl = new URL(`${process.env.FRONTEND_URL}/payment/failure`);
      failureUrl.searchParams.append('error_Message', 'Order ID not found');
      res.redirect(failureUrl.toString());
      return;
    }

    console.log('Attempting to update order with ID:', orderId);

    // First update the order
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: (paymentStatus || 'pending').toLowerCase(),
        payment_id: payuTransactionId,
        payment_mode: paymentMode,
        transaction_id: transactionId,
        payment_error: errorMessage || bankMessage || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Error updating order:', updateError);
      const failureUrl = new URL(`${process.env.FRONTEND_URL}/payment/failure`);
      failureUrl.searchParams.append('error_Message', 'Failed to update order status');
      res.redirect(failureUrl.toString());
      return;
    }

    // First check if order exists
    const { data: orderExists, error: checkError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', orderId)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking order existence:', checkError);
    } else {
      console.log('Order exists check result:', orderExists);
    }

    // Then fetch the updated order
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (fetchError) {
      console.error('Error fetching updated order:', fetchError);
      console.error('OrderId used in query:', orderId);
      const failureUrl = new URL(`${process.env.FRONTEND_URL}/payment/failure`);
      failureUrl.searchParams.append('error_Message', 'Failed to fetch updated order');
      res.redirect(failureUrl.toString());
      return;
    }

    // Handle successful payment
    if (paymentStatus?.toLowerCase() === 'success') {
      console.log('Payment successful for order:', orderId);
      const successUrl = new URL(`${process.env.FRONTEND_URL}/payment/success`);
      successUrl.searchParams.append('orderId', orderId);
      successUrl.searchParams.append('txnid', transactionId);
      res.redirect(successUrl.toString());
    } else {
      console.log('Payment failed for order:', orderId);
      const failureUrl = new URL(`${process.env.FRONTEND_URL}/payment/failure`);
      failureUrl.searchParams.append('orderId', orderId);
      failureUrl.searchParams.append('txnid', transactionId);
      failureUrl.searchParams.append('error_Message', encodeURIComponent(errorMessage || bankMessage || 'Payment failed'));
      res.redirect(failureUrl.toString());
    }
  } catch (error) {
    console.error('Error processing payment callback:', error);
    const errorUrl = new URL(`${process.env.FRONTEND_URL}/payment/failure`);
    errorUrl.searchParams.append('error_Message', encodeURIComponent('Internal server error'));
    res.redirect(errorUrl.toString());
  }
}); 