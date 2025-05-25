import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

export async function createOrder(
  supabase: SupabaseClient<Database>,
  userId: string,
  items: { productId: string; quantity: number }[],
  shippingAddress: Record<string, any>
) {
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, price, stock_quantity')
    .in(
      'id',
      items.map((item) => item.productId)
    );

  if (productsError) {
    throw new Error('Error fetching products: ' + productsError.message);
  }

  if (!products || products.length !== items.length) {
    throw new Error('Some products were not found');
  }

  // Calculate total amount and validate stock
  const total_amount = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    if (product.stock_quantity < item.quantity) {
      throw new Error(`Insufficient stock for product ${item.productId}`);
    }
    return sum + product.price * item.quantity;
  }, 0);

  // Start a transaction
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_amount,
      shipping_address: shippingAddress,
    })
    .select()
    .single();

  if (orderError || !order) {
    throw new Error('Error creating order: ' + orderError?.message);
  }

  // Create order items
  const orderItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      unit_price: product.price,
    };
  });

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    throw new Error('Error creating order items: ' + itemsError.message);
  }

  // Update product stock
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId)!;
    const { error: stockError } = await supabase
      .from('products')
      .update({ stock_quantity: product.stock_quantity - item.quantity })
      .eq('id', item.productId);

    if (stockError) {
      throw new Error('Error updating product stock: ' + stockError.message);
    }
  }

  return order;
}

export async function getUserOrders(
  supabase: SupabaseClient<Database>,
  userId: string,
  page = 1,
  limit = 10
) {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data: orders, error: ordersError, count } = await supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(start, end);

  if (ordersError) {
    throw new Error('Error fetching orders: ' + ordersError.message);
  }

  return {
    orders,
    total: count ?? 0,
    page,
    limit,
  };
}

export async function getOrderDetails(
  supabase: SupabaseClient<Database>,
  orderId: string
) {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (orderError || !order) {
    throw new Error('Error fetching order: ' + orderError?.message);
  }

  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select(`
      *,
      products (
        id,
        name,
        description,
        image_url
      )
    `)
    .eq('order_id', orderId);

  if (itemsError) {
    throw new Error('Error fetching order items: ' + itemsError.message);
  }

  return {
    ...order,
    items: items || [],
  };
}

export async function updateOrderStatus(
  supabase: SupabaseClient<Database>,
  orderId: string,
  status: Order['status']
) {
  const { data: order, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error || !order) {
    throw new Error('Error updating order status: ' + error?.message);
  }

  return order;
} 