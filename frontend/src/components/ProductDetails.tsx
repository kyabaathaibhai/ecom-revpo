import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useToast } from '../hooks/useToast';
import {
  Box,
  Button,
  CardMedia,
  Typography,
  Container,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Rating,
  Paper,
} from '@mui/material';

import { ArrowBack, ShoppingCart } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { user } = useAuth();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadProduct = async () => {
      try {
        if (id) {
          const data = await getProduct(id);
          setProduct(data);
        }
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, getProduct]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/signin', { state: { from: window.location.pathname } });
      return;
    }
    if (product) {
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
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Alert severity='error'>{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Alert severity='warning'>Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 4 }}
      >
        Back to Products
      </Button>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Left side - Product Image */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: '#f5f5f5',
            borderRadius: 2,
          }}
        >
          <CardMedia
            component='img'
            image={product.image_url}
            alt={product.name}
            className='h-[300px] sm:h-[600px]'
            sx={{
              width: '100%',
              p: 2,
            }}
          />
        </Paper>

        {/* Right side - Product Details */}
        <Box sx={{ position: 'sticky', top: 24 }}>
          <Box sx={{ mb: 3 }}>
            <Chip
              label={product.category}
              color='primary'
              variant='outlined'
              sx={{ mb: 2 }}
            />
            <Typography
              variant='h4'
              component='h1'
              gutterBottom
              sx={{
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={4.5} readOnly precision={0.5} />
              <Typography
                variant='body2'
                sx={{ ml: 1, color: 'text.secondary' }}
              >
                (24 reviews)
              </Typography>
            </Box>

            <Typography
              variant='h4'
              color='primary'
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              ₹{product.price.toFixed(2)}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography
              variant='h6'
              gutterBottom
              sx={{
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              Description
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: 'text.secondary',
                lineHeight: 1.7,
              }}
            >
              {product.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              Stock Status:
              <Chip
                label={product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                color={product.stock_quantity > 0 ? 'success' : 'error'}
                size='small'
                sx={{ ml: 1 }}
              />
            </Typography>
            {product.stock_quantity > 0 && (
              <Typography variant='body2' color='text.secondary'>
                Quantity Available: {product.stock_quantity} units
              </Typography>
            )}
          </Box>

          <Button
            variant='contained'
            color='primary'
            size='large'
            fullWidth
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            sx={{
              mb: 4,
              py: 1,
              fontSize: '1.1rem',
            }}
          >
            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>

          <Paper
            elevation={0}
            sx={{ bgcolor: '#f8f8f8', p: 3, borderRadius: 2 }}
          ></Paper>
        </Box>
      </div>
    </Container>
  );
};

export default ProductDetails;
