import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { ShoppingCart, Star, Zap, Shield } from 'lucide-react';
import { Product } from '../lib/api/products';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/useToast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/signin', { state: { from: window.location.pathname } });
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
      description: product.description,
    });
    showToast({
      title: 'Success',
      message: `${product.name} added to cart`,
      type: 'success',
    });
  };

  return (
    <div className='group cursor-pointer' onClick={handleClick}>
      <div className='card card-hover overflow-hidden h-full flex flex-col'>
        {/* Image Container */}
        <div className='relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100'>
          <img
            src={product.image_url}
            alt={product.name}
            className='w-full h-64 object-cover transition-all duration-500 group-hover:scale-110'
          />
          
          {/* Overlay badges */}
          <div className='absolute top-4 left-4'>
            <Chip
              label={product.category}
              size='small'
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          </div>

          {/* Quick action overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className='absolute bottom-4 left-4 right-4 flex gap-2'>
              <div className='flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700'>
                <Star className='w-3 h-3 text-amber-500 mr-1' />
                4.8
              </div>
              <div className='flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700'>
                <Zap className='w-3 h-3 text-blue-500 mr-1' />
                Fast
              </div>
              <div className='flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700'>
                <Shield className='w-3 h-3 text-green-500 mr-1' />
                Secure
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 flex-1 flex flex-col'>
          <div className='flex-1'>
            <h3 className='text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300'>
              {product.name}
            </h3>

            <p className='text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2'>
              {product.description}
            </p>
          </div>

          {/* Price and Stock */}
          <div className='flex items-center justify-between mb-4'>
            <div className='text-3xl font-bold gradient-text'>
              ₹{product.price.toFixed(2)}
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              product.stock_quantity > 0 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {product.stock_quantity > 0 
                ? `${product.stock_quantity} in stock` 
                : 'Out of stock'
              }
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
              product.stock_quantity === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'btn-primary group-hover:shadow-glow'
            }`}
          >
            <ShoppingCart className='w-5 h-5 mr-2' />
            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;