import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  description: string;
}

interface Coupon {
  code: string;
  discount: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => void;
  couponError: string | null;
  getDiscountedTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const addItem = (item: CartItem) => {
    console.log(item, 'item');
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === item.id);
      if (existingItem) {
        return currentItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...currentItems, item];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const applyCoupon = async (code: string) => {
    try {
      setCouponError(null);
      // Fetch coupon from the database
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code)
        .single();

      if (error) throw new Error('Invalid coupon code');

      if (!data) {
        setCouponError('Invalid coupon code');
        return;
      }

      setAppliedCoupon({
        code: data.code,
        discount: data.discount,
      });
    } catch (error) {
      setCouponError(
        error instanceof Error ? error.message : 'Failed to apply coupon'
      );
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const getDiscountedTotal = () => {
    if (!appliedCoupon) return total;
    const discount = (total * appliedCoupon.discount) / 100;
    return total - discount;
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    getDiscountedTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
