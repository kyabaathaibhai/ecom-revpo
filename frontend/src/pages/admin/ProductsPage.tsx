import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import ProductFormModal from '../../components/admin/ProductFormModal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  created_at: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?'))
      return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='h-8 bg-gray-200 rounded w-1/4 animate-pulse'></div>
        <div className='h-64 bg-gray-200 rounded animate-pulse'></div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Products</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setShowAddModal(true);
          }}
          className='btn-primary flex items-center'
        >
          <Plus className='w-5 h-5 mr-2' />
          Add Product
        </button>
      </div>

      <div className='bg-white rounded-lg shadow-soft overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Product
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Price
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Stock
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='h-10 w-10 flex-shrink-0'>
                        <img
                          className='h-10 w-10 rounded-full object-cover'
                          src={product.image_url}
                          alt={product.name}
                        />
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>
                          {product.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {product.description.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      ₹{product.price}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {product.stock_quantity}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowAddModal(true);
                      }}
                      className='text-primary-600 hover:text-primary-900 mr-4'
                    >
                      <Pencil className='w-5 h-5' />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className='text-red-600 hover:text-red-900'
                    >
                      <Trash2 className='w-5 h-5' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        isOpen={showAddModal}
        onClose={handleModalClose}
        product={selectedProduct}
        onSuccess={fetchProducts}
      />
    </div>
  );
};

export default ProductsPage;
