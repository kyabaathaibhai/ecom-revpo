import express from 'express';
import { supabase } from '../lib/supabase';
import asyncHandler from 'express-async-handler';
import { TypedRequest, TypedResponse } from '../types/express';

const router = express.Router();

interface SignUpBody {
  email: string;
  password: string;
  full_name?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface ResetPasswordBody {
  email: string;
}

// Sign up
router.post('/signup', asyncHandler(async (req: TypedRequest<SignUpBody>, res: TypedResponse<any>) => {
  const { email, password, full_name } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name
      }
    }
  });

  if (signUpError) {
    res.status(400).json({ message: signUpError.message });
    return;
  }

  // If signup successful, create profile
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        full_name: full_name || null,
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Error creating profile:', profileError);
    }
  }

  res.status(201).json({
    message: 'Signup successful! Please check your email for verification.',
    user: authData.user
  });
}));

// Login
router.post('/login', asyncHandler(async (req: TypedRequest<LoginBody>, res: TypedResponse<any>) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    res.status(401).json({ message: error.message });
    return;
  }

  res.json({ user, session });
}));

// Request password reset
router.post('/reset-password', asyncHandler(async (req: TypedRequest<ResetPasswordBody>, res: TypedResponse<any>) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL}/reset-password`
  });

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  res.json({ message: 'Password reset instructions sent to your email' });
}));

// Get current user
router.get('/me', asyncHandler(async (req: TypedRequest, res: TypedResponse<any>) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header is required' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    res.status(401).json({ message: error.message });
    return;
  }

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  res.json({ user, profile });
}));

// Logout
router.post('/logout', asyncHandler(async (req: TypedRequest, res: TypedResponse<any>) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header is required' });
    return;
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  res.json({ message: 'Logged out successfully' });
}));

export const authRoutes = router; 