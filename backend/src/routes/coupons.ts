import express from 'express';
import { supabase } from '../lib/supabase';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Validate coupon
router.post('/validate', asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code) {
    res.status(400).json({ message: 'Coupon code is required' });
    return;
  }

  const { data: coupon, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .single();

  if (error || !coupon) {
    res.status(404).json({ message: 'Invalid coupon code' });
    return;
  }

  const now = new Date();
  
  // Check if coupon is expired
  if (coupon.valid_until && new Date(coupon.valid_until) < now) {
    res.status(400).json({ message: 'Coupon has expired' });
    return;
  }

  // Check if coupon valid period has started
  if (new Date(coupon.valid_from) > now) {
    res.status(400).json({ message: 'Coupon is not yet valid' });
    return;
  }

  // Check if maximum uses reached
  if (coupon.max_uses && coupon.times_used >= coupon.max_uses) {
    res.status(400).json({ message: 'Coupon has reached maximum uses' });
    return;
  }

  // Update times_used
  const { error: updateError } = await supabase
    .from('coupons')
    .update({ times_used: coupon.times_used + 1 })
    .eq('code', code);

  if (updateError) {
    console.error('Error updating coupon usage:', updateError);
  }

  res.json({
    code: coupon.code,
    discount_percentage: coupon.discount_percentage
  });
}));

export const couponRoutes = router;