import express, { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import asyncHandler from 'express-async-handler';
import { Database } from '../types/database.types';
import { TypedRequest, TypedResponse } from '../types/express';

type Product = Database['public']['Tables']['products']['Row'];

const router = express.Router();

// Get all products
router.get('/', asyncHandler(async (req: Request, res: TypedResponse<Product[]>) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  if (error) throw error;
  res.json(products || []);
}));

// Get a single product
router.get('/:id', asyncHandler(async (req: Request, res: TypedResponse<Product>) => {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) throw error;
  if (!product) {
    res.status(404).json({ message: 'Product not found' } as any);
    return;
  }
  res.json(product);
}));

// Create a product
router.post('/', asyncHandler(async (req: TypedRequest<Omit<Product, 'id' | 'created_at' | 'updated_at'>>, res: TypedResponse<Product>) => {
  const { data: product, error } = await supabase
    .from('products')
    .insert(req.body)
    .select()
    .single();

  if (error) throw error;
  res.status(201).json(product);
}));

// Update a product
router.put('/:id', asyncHandler(async (req: TypedRequest<Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>>, res: TypedResponse<Product>) => {
  const { data: product, error } = await supabase
    .from('products')
    .update(req.body)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) throw error;
  if (!product) {
    res.status(404).json({ message: 'Product not found' } as any);
    return;
  }
  res.json(product);
}));

// Delete a product
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', req.params.id);

  if (error) throw error;
  res.status(204).send();
}));

export const productRoutes = router; 