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
import { ShoppingCart, Favorite, FavoriteBorder, Visibility, Star, Zap, Shield } from '@mui/icons-material';
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
        borderRadius: 4,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe)',
          backgroundSize: '200% 100%',
          animation: 'borderGlow 3s linear infinite',
        },
        '&:hover': {
          transform: 'translateY(-12px) scale(1.03)',
          boxShadow: '0 30px 60px -12px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(102, 126, 234, 0.1)',
          '& .product-image': {
            transform: 'scale(1.15) rotate(2deg)',
          },
          '& .quick-actions': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          '& .glow-effect': {
            opacity: 1,
          },
        },
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Glow Effect */}
        <Box
          className='glow-effect'
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            opacity: 0,
            transition: 'opacity 0.5s ease',
            zIndex: 1,
          }}
        />

        <CardMedia
          component='img'
          image={product.image_url}
          alt={product.name}
          className='product-image'
          sx={{
            objectFit: 'cover',
            backgroundColor: '#f8fafc',
            height: '280px',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            zIndex: 2,
          }}
        />
        
        {/* Category Badge */}
        <Chip
          label={product.category}
          size='small'
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem',
            zIndex: 3,
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            '& .MuiChip-label': {
              px: 2,
            },
          }}
        />

        {/* Premium Badge */}
        <Chip
          icon={<Shield sx={{ color: 'white !important', fontSize: 16 }} />}
          label="Premium"
          size='small'
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem',
            zIndex: 3,
            boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)',
          }}
        />

        {/* Stock Badge */}
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <Chip
            label={`Only ${product.stock_quantity} left`}
            size='small'
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.75rem',
              animation: 'pulse 2s infinite',
              zIndex: 3,
              boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
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
            gap: 1.5,
            zIndex: 4,
          }}
        >
          <Tooltip title='Quick View'>
            <IconButton
              onClick={handleQuickView}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'scale(1.1)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
                },
              }}
            >
              <Visibility sx={{ color: '#667eea' }} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
            <IconButton
              onClick={handleWishlistToggle}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'scale(1.1)',
                  boxShadow: '0 12px 40px rgba(239, 68, 68, 0.3)',
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
            bottom: 16,
            right: 16,
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 3,
            px: 1.5,
            py: 1,
            zIndex: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Star sx={{ color: '#fbbf24', fontSize: 18, mr: 0.5 }} />
          <Typography variant='caption' sx={{ fontWeight: 700, color: '#374151' }}>
            4.9
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant='h6'
          component='h2'
          gutterBottom
          sx={{
            fontSize: '1.25rem',
            fontWeight: 800,
            mb: 2,
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
            mb: 4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
            color: '#6b7280',
            fontSize: '0.95rem',
          }}
        >
          {product.description}
        </Typography>

        {/* Features */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              icon={<Zap sx={{ fontSize: 14 }} />}
              label="Fast"
              size="small"
              sx={{
                bgcolor: '#dbeafe',
                color: '#1e40af',
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            />
            <Chip
              icon={<Shield sx={{ fontSize: 14 }} />}
              label="Secure"
              size="small"
              sx={{
                bgcolor: '#dcfce7',
                color: '#166534',
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              variant='h4'
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 900,
                fontSize: '1.75rem',
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
                fontWeight: 700,
                fontSize: '0.75rem',
                boxShadow: product.stock_quantity > 0 
                  ? '0 4px 12px rgba(34, 197, 94, 0.2)' 
                  : '0 4px 12px rgba(239, 68, 68, 0.2)',
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
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              backgroundSize: '200% 200%',
              color: product.stock_quantity === 0 ? '#9ca3af' : 'white',
              fontWeight: 700,
              py: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: product.stock_quantity === 0 
                ? 'none' 
                : '0 8px 32px rgba(102, 126, 234, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transition: 'left 0.5s',
              },
              '&:hover': {
                background: product.stock_quantity === 0 
                  ? '#e5e7eb' 
                  : 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 50%, #ec4899 100%)',
                transform: product.stock_quantity === 0 ? 'none' : 'translateY(-2px)',
                boxShadow: product.stock_quantity === 0 
                  ? 'none' 
                  : '0 12px 40px rgba(102, 126, 234, 0.4)',
                '&::before': {
                  left: '100%',
                },
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