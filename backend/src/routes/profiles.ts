import express from 'express';
import { supabase } from '../lib/supabase';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Get user profile
router.get('/', asyncHandler(async (req, res) => {
  const userId = req.headers['user-id'] as string;
  if (!userId) {
    res.status(401).json({ message: 'User ID is required' });
    return;
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  if (!profile) {
    res.status(404).json({ message: 'Profile not found' });
    return;
  }

  res.json(profile);
}));

// Update user profile
router.put('/', asyncHandler(async (req, res) => {
  const userId = req.headers['user-id'] as string;
  if (!userId) {
    res.status(401).json({ message: 'User ID is required' });
    return;
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .update(req.body)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  if (!profile) {
    res.status(404).json({ message: 'Profile not found' });
    return;
  }

  res.json(profile);
}));

export const profileRoutes = router; 