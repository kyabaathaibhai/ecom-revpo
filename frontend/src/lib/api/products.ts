import api from './interceptor';
import { Database } from '../../types/database.types';

export type Product = Database['public']['Tables']['products']['Row'];

interface FetchProductsParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Fetch all products with pagination and search
export const fetchProducts = async (params: FetchProductsParams = {}): Promise<Product[]> => {
  const { page = 1, limit = 10, search = '' } = params;
  const response = await api.get<Product[]>('/products', {
    params: { page, limit, search }
  });
  return response.data;
};

// Fetch a single product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

// Create a new product
export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
  const response = await api.post<Product>('/products', product);
  return response.data;
};

// Update a product
export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, product);
  return response.data;
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string, params: FetchProductsParams = {}): Promise<Product[]> => {
  const { page = 1, limit = 10 } = params;
  const response = await api.get<Product[]>('/products', {
    params: { page, limit, category }
  });
  return response.data;
};

// Search products
export const searchProducts = async (query: string, params: FetchProductsParams = {}): Promise<Product[]> => {
  const { page = 1, limit = 10 } = params;
  const response = await api.get<Product[]>('/products/search', {
    params: { page, limit, query }
  });
  return response.data;
}; 