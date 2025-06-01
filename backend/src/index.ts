import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { productRoutes } from './routes/products';
import { orderRoutes } from './routes/orders';
import { profileRoutes } from './routes/profiles';
import { authRoutes } from './routes/auth';
import { couponRoutes } from './routes/coupons';
import { paymentRoutes } from './routes/payment.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Add urlencoded middleware with extended option for nested objects
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});