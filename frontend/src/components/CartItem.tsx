import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import type { CartItem as CartItemType } from '../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className='flex items-center py-4 border-b border-gray-200 animate-fade-in'>
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md'>
        <img
          src={item.image_url}
          alt={item.name}
          className='h-full w-full object-cover object-center'
        />
      </div>

      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between text-base font-medium text-gray-800'>
            <h3>{item.name}</h3>
            <p className='ml-4'>₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className='mt-1 text-sm text-gray-500 line-clamp-1'>
            {item.description}
          </p>
        </div>

        <div className='flex flex-1 items-end justify-between text-sm mt-2'>
          <div className='flex items-center'>
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              className='p-1 rounded-full hover:bg-gray-100 transition-colors'
              aria-label='Decrease quantity'
            >
              <Minus size={16} />
            </button>

            <span className='mx-3 font-medium'>{item.quantity}</span>

            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className='p-1 rounded-full hover:bg-gray-100 transition-colors'
              aria-label='Increase quantity'
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className='text-gray-500 hover:text-red-500 transition-colors'
            aria-label='Remove item'
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
