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
import { ShoppingCart } from '@mui/icons-material';
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
    e.stopPropagation(); // Prevent card click when clicking the button
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
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      }}
      onClick={handleClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component='img'
          image={product.image_url}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            backgroundColor: '#f5f5f5',
            height: '200px',
          }}
        />
        <Chip
          label={product.category}
          size='small'
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: 'text.primary',
            fontWeight: 500,
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant='h6'
          component='h2'
          gutterBottom
          sx={{
            fontSize: '1.1rem',
            fontWeight: 600,
            mb: 1,
            color: 'text.primary',
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '40px',
          }}
        >
          {product.description}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h6'
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '1.25rem',
              }}
            >
              ₹{product.price.toFixed(2)}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color:
                  product.stock_quantity > 0 ? 'success.main' : 'error.main',
                fontWeight: 500,
              }}
            >
              {product.stock_quantity > 0
                ? `In Stock (${product.stock_quantity})`
                : 'Out of Stock'}
            </Typography>
          </Box>

          <Button
            variant='contained'
            color='primary'
            startIcon={<ShoppingCart />}
            fullWidth
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            sx={{
              mt: 'auto',
              textTransform: 'none',
              '&:hover': {
                transform: 'scale(1.02)',
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