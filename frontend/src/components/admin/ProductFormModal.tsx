import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSuccess: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  product,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    image: null as File | null,
    imagePreview: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock_quantity: product.stock_quantity.toString(),
        image: null,
        imagePreview: product.image_url,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        image: null,
        imagePreview: '',
      });
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let image_url = product?.image_url || '';

      // Upload image if a new one is selected
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, formData.image);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('products').getPublicUrl(filePath);

        image_url = publicUrl;
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        image_url,
      };

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

        <div className='relative bg-white rounded-lg max-w-lg w-full'>
          <div className='absolute right-0 top-0 p-4'>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-500'
            >
              <X className='w-6 h-6' />
            </button>
          </div>

          <div className='p-6'>
            <h2 className='text-xl font-semibold mb-4'>
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>

            {error && (
              <div className='mb-4 p-3 bg-red-50 text-red-600 rounded'>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Product Name
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Price (₹)
                    </label>
                    <input
                      type='number'
                      required
                      min='0'
                      step='0.01'
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Stock Quantity
                    </label>
                    <input
                      type='number'
                      required
                      min='0'
                      value={formData.stock_quantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock_quantity: e.target.value,
                        })
                      }
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Product Image
                  </label>
                  <div className='mt-1 flex items-center'>
                    {formData.imagePreview && (
                      <div className='mr-4'>
                        <img
                          src={formData.imagePreview}
                          alt='Preview'
                          className='h-20 w-20 object-cover rounded'
                        />
                      </div>
                    )}
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100'
                    />
                  </div>
                </div>

                <div className='flex justify-end space-x-3'>
                  <button
                    type='button'
                    onClick={onClose}
                    className='btn-secondary'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={loading}
                    className='btn-primary'
                  >
                    {loading
                      ? 'Saving...'
                      : product
                      ? 'Update Product'
                      : 'Add Product'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
