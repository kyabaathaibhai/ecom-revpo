import express from 'express';
import { supabase } from '../lib/supabase';
import asyncHandler from 'express-async-handler';
import { createOrder, getUserOrders, getOrderDetails, updateOrderStatus } from '../utils/orders';

const router = express.Router();

// Get user's orders with pagination
router.get('/', asyncHandler(async (req, res) => {
  const userId = req.headers['user-id'] as string;
  if (!userId) {
    res.status(401).json({ message: 'User ID is required' });
    return;
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const orders = await getUserOrders(supabase, userId, page, limit);
  res.json(orders);
}));

// Get order details
router.get('/:id', asyncHandler(async (req, res) => {
  const userId = req.headers['user-id'] as string;
  if (!userId) {
    res.status(401).json({ message: 'User ID is required' });
    return;
  }

  const order = await getOrderDetails(supabase, req.params.id);
  
  // Verify order belongs to user
  if (order.user_id !== userId) {
    res.status(403).json({ message: 'Unauthorized' });
    return;
  }

  res.json(order);
}));

// Create a new order
router.post('/', asyncHandler(async (req, res) => {
  const userId = req.headers['user-id'] as string;
  if (!userId) {
    res.status(401).json({ message: 'User ID is required' });
    return;
  }

  const { items, shippingAddress,customerDetails,couponCode } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: 'Items array is required' });
    return;
  }

  if (!shippingAddress) {
    res.status(400).json({ message: 'Shipping address is required' });
    return;
  }

  const order = await createOrder(supabase, userId, items, shippingAddress,customerDetails);
  res.status(201).json(order);
}));

// Update order status
router.patch('/:id/status', asyncHandler(async (req, res) => {
  const userId = req.headers['user-id'] as string;
  if (!userId) {
    res.status(401).json({ message: 'User ID is required' });
    return;
  }

  const { status } = req.body;
  if (!status) {
    res.status(400).json({ message: 'Status is required' });
    return;
  }

  const order = await updateOrderStatus(supabase, req.params.id, status);
  
  // Verify order belongs to user
  if (order.user_id !== userId) {
    res.status(403).json({ message: 'Unauthorized' });
    return;
  }

  res.json(order);
}));

export const orderRoutes = router; 