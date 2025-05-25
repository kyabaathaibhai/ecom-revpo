import { useState, useCallback } from 'react';
import { Product, fetchProducts, fetchProductById } from '../lib/api/products';

interface UseProductsOptions {
  initialPage?: number;
  initialLimit?: number;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  total: number;
  page: number;
  limit: number;
  fetchProducts: (search?: string) => Promise<void>;
  fetchMore: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  getProduct: (id: string) => Promise<Product>;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const { initialPage = 1, initialLimit = 10 } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);

  const loadProducts = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProducts({ page, limit, search });
      setProducts(response);
      setTotal(response.length);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  const fetchMore = useCallback(async () => {
    if (loading || products.length >= total) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await fetchProducts({ page: nextPage, limit });
      setProducts(prev => [...prev, ...response]);
      setPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch more products'));
    } finally {
      setLoading(false);
    }
  }, [loading, total, page, limit]);

  const refreshProducts = useCallback(async () => {
    setPage(initialPage);
    await loadProducts();
  }, [initialPage, loadProducts]);

  const getProduct = useCallback(async (id: string): Promise<Product> => {
    try {
      return await fetchProductById(id);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to fetch product');
    }
  }, []);

  return {
    products,
    loading,
    error,
    total,
    page,
    limit,
    fetchProducts: loadProducts,
    fetchMore,
    refreshProducts,
    getProduct,
  };
}; 