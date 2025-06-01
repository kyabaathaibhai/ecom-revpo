import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product_name: string;
  product_image_url: string;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  shipping_address: {
    address: string;
    city: string;
    zipCode: string;
  };
  customer_details: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  order_items: OrderItem[];
}

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select(
            `
            *,
            order_items (
              id,
              product_id,
              quantity,
              unit_price,
              product_name,
              product_image_url
            )
          `
          )
          .eq('id', orderId)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600'></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900'>Order not found</h1>
          <p className='mt-2 text-gray-600'>
            We couldn't find the order you're looking for.
          </p>
          <Link to='/' className='mt-6 inline-block btn-primary'>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
      <div className='text-center'>
        <CheckCircle className='mx-auto h-12 w-12 text-green-500' />
        <h1 className='mt-4 text-3xl font-bold text-gray-900'>
          Thank you for your order!
        </h1>
        <p className='mt-2 text-lg text-gray-600'>
          Your order #{order.id.slice(0, 8)} has been confirmed
        </p>
      </div>

      <div className='mt-12'>
        <div className='border-t border-b border-gray-200 py-6'>
          <h2 className='text-lg font-medium text-gray-900'>Order details</h2>
          <div className='mt-6 space-y-4'>
            {order.order_items.map((item) => (
              <div key={item.id} className='flex items-center'>
                <div className='h-20 w-20 flex-shrink-0 overflow-hidden rounded-md'>
                  <img
                    src={item.product_image_url}
                    alt={item.product_name}
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='ml-4 flex-1'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {item.product_name}
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    Quantity: {item.quantity} × ₹{item.unit_price.toFixed(2)}
                  </p>
                </div>
                <p className='text-sm font-medium text-gray-900'>
                  ₹{(item.quantity * item.unit_price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-6'>
          <h2 className='text-lg font-medium text-gray-900'>
            Shipping address
          </h2>
          <div className='mt-2 text-sm text-gray-600'>
            <p>
              {order.customer_details.firstName}{' '}
              {order.customer_details.lastName}
            </p>
            <p>{order.shipping_address.address}</p>
            <p>
              {order.shipping_address.city} {order.shipping_address.zipCode}
            </p>
          </div>
        </div>

        <div className='mt-8'>
          <div className='space-y-2'>
            <div className='flex justify-between text-base text-gray-500'>
              <span>Subtotal</span>
              <span>₹{order.total_amount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-base text-gray-500'>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className='flex justify-between text-lg font-semibold text-gray-900 pt-4 border-t'>
              <span>Total</span>
              <span>₹{order.total_amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <Link to='/' className='btn-primary'>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
