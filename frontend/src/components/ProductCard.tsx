import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder, Visibility, Star } from '@mui/icons-material';
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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    showToast({
      title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      message: product.name,
      type: 'info',
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)',
          '& .product-image': {
            transform: 'scale(1.1)',
          },
          '& .quick-actions': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component='img'
          image={product.image_url}
          alt={product.name}
          className='product-image'
          sx={{
            objectFit: 'cover',
            backgroundColor: '#f8fafc',
            height: '240px',
            transition: 'transform 0.3s ease',
          }}
        />
        
        {/* Category Badge */}
        <Chip
          label={product.category}
          size='small'
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
            '& .MuiChip-label': {
              px: 1.5,
            },
          }}
        />

        {/* Stock Badge */}
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <Chip
            label={`Only ${product.stock_quantity} left`}
            size='small'
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              animation: 'pulse 2s infinite',
            }}
          />
        )}

        {/* Quick Actions */}
        <Box
          className='quick-actions'
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateY(20px)',
            opacity: 0,
            transition: 'all 0.3s ease',
            display: 'flex',
            gap: 1,
          }}
        >
          <Tooltip title='Quick View'>
            <IconButton
              onClick={handleQuickView}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Visibility sx={{ color: '#3b82f6' }} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
            <IconButton
              onClick={handleWishlistToggle}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'scale(1.1)',
                },
              }}
            >
              {isWishlisted ? (
                <Favorite sx={{ color: '#ef4444' }} />
              ) : (
                <FavoriteBorder sx={{ color: '#6b7280' }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Rating */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            px: 1,
            py: 0.5,
          }}
        >
          <Star sx={{ color: '#fbbf24', fontSize: 16, mr: 0.5 }} />
          <Typography variant='caption' sx={{ fontWeight: 600, color: '#374151' }}>
            4.8
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant='h6'
          component='h2'
          gutterBottom
          sx={{
            fontSize: '1.125rem',
            fontWeight: 700,
            mb: 1.5,
            color: '#1f2937',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            mb: 3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
            color: '#6b7280',
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography
              variant='h5'
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 700,
                fontSize: '1.5rem',
              }}
            >
              ₹{product.price.toLocaleString()}
            </Typography>
            <Chip
              label={product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
              size='small'
              sx={{
                bgcolor: product.stock_quantity > 0 ? '#dcfce7' : '#fee2e2',
                color: product.stock_quantity > 0 ? '#166534' : '#dc2626',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          </Box>

          <Button
            variant='contained'
            fullWidth
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            sx={{
              background: product.stock_quantity === 0 
                ? '#e5e7eb' 
                : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: product.stock_quantity === 0 ? '#9ca3af' : 'white',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              boxShadow: product.stock_quantity === 0 
                ? 'none' 
                : '0 4px 14px 0 rgba(59, 130, 246, 0.3)',
              '&:hover': {
                background: product.stock_quantity === 0 
                  ? '#e5e7eb' 
                  : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                transform: product.stock_quantity === 0 ? 'none' : 'translateY(-2px)',
                boxShadow: product.stock_quantity === 0 
                  ? 'none' 
                  : '0 8px 25px 0 rgba(59, 130, 246, 0.4)',
              },
              '&:disabled': {
                background: '#e5e7eb',
                color: '#9ca3af',
              },
            }}
          >
            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;