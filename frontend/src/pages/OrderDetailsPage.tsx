import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { format } from 'date-fns';

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product_name: string;
  product_image_url: string;
  product_description: string;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  payment_status: string;
  payment_id: string | null;
  payment_mode: string | null;
  transaction_id: string | null;
  payment_error: string | null;
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

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
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
              product_image_url,
              product_description
            )
          `
          )
          .eq('id', orderId)
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching order:', error);
        } else {
          setOrder(data);
        }
      }

      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-200 rounded w-1/4 mb-6'></div>
          <div className='bg-white p-6 rounded-lg shadow-soft'>
            <div className='h-6 bg-gray-200 rounded w-1/3 mb-4'></div>
            <div className='h-4 bg-gray-200 rounded w-1/4'></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center py-12'>
          <Package className='mx-auto h-16 w-16 text-gray-400' />
          <h2 className='mt-4 text-2xl font-semibold text-gray-800'>
            Order not found
          </h2>
          <p className='mt-2 text-gray-600'>
            The order you're looking for doesn't exist.
          </p>
          <Link to='/orders' className='mt-6 inline-block btn-primary'>
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (order.status) {
      case 'completed':
        return <CheckCircle className='h-6 w-6 text-green-500' />;
      case 'processing':
        return <Truck className='h-6 w-6 text-blue-500' />;
      default:
        return <Package className='h-6 w-6 text-yellow-500' />;
    }
  };

  console.log({ order }, 'order');

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='mb-8'>
        <Link
          to='/orders'
          className='text-gray-600 hover:text-gray-900 flex items-center'
        >
          <ArrowLeft className='h-5 w-5 mr-2' />
          Back to Orders
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow-soft overflow-hidden'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-bold text-gray-900'>
              Order #{order.id.slice(0, 8)}
            </h1>
            <div className='flex items-center space-x-2'>
              {getStatusIcon()}
              <span
                className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${
                  order.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : ''
                }
                ${
                  order.status === 'processing'
                    ? 'bg-blue-100 text-blue-800'
                    : ''
                }
                ${
                  order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : ''
                }
              `}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>

          <div className='text-sm text-gray-500'>
            Placed on {format(new Date(order.created_at), 'MMMM d, yyyy')}
          </div>
        </div>

        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            Order Items
          </h2>
          <div className='space-y-4'>
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
                <div className='text-right'>
                  <p className='text-base font-medium text-gray-900'>
                    ₹{(item.quantity * item.unit_price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            Shipping Address
          </h2>
          <address className='not-italic'>
            <p>{order.shipping_address.address}</p>
            <p>
              {order.shipping_address.city} {order.shipping_address.zipCode}
            </p>
          </address>
        </div>

        <div className='p-6'>
          <div className='space-y-2'>
            <div className='flex justify-between text-base text-gray-500'>
              <span>Subtotal</span>
              <span>${order.total_amount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-base text-gray-500'>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className='flex justify-between text-lg font-semibold text-gray-900 pt-4 border-t'>
              <span>Total</span>
              <span>${order.total_amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
