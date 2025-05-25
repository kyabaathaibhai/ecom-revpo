import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Package, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { format } from 'date-fns';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  items: Array<{
    product_id: number;
    quantity: number;
    price: number;
    name: string;
    image: string;
  }>;
}

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error);
        } else {
          setOrders(data || []);
        }
      }
      
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-soft">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <Package className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">No orders yet</h2>
          <p className="mt-2 text-gray-600">Start shopping to see your order history here.</p>
          <Link to="/" className="mt-6 inline-block btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block bg-white rounded-lg shadow-soft hover:shadow-hover transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {format(new Date(order.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    ${order.total_amount.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center">
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${order.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                    ${order.status === 'processing' ? 'bg-blue-100 text-blue-800' : ''}
                    ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                {order.items.slice(0, 3).map((item) => (
                  <div key={item.product_id} className="h-16 w-16 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                    <span className="text-sm text-gray-600">+{order.items.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;