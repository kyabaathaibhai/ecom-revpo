import api from './interceptor';
import { supabase } from '../supabaseClient';

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
    name: string;
    image_url: string;
    price: number;
    description: string;
  }>;
  shippingAddress: {
    address: string;
    city: string;
    zipCode: string;
  };
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  shippingAddress: any;
  createdAt: string;
}

export const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
  const { data: { session } } = await supabase.auth.getSession();
  console.log(session,"session");
  const response = await api.post<Order>('/orders', orderData, {
    headers: {
      'user-id': session?.user?.id || '',
    },
  });
  return response.data;
};