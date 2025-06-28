import React from 'react';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';
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
    <div className='flex items-center py-6 group animate-fade-in-up'>
      {/* Product Image */}
      <div className='h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:shadow-lg transition-shadow duration-300'>
        <img
          src={item.image_url}
          alt={item.name}
          className='h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300'
        />
      </div>

      {/* Product Details */}
      <div className='ml-6 flex flex-1 flex-col'>
        <div className='flex justify-between'>
          <div className='flex-1'>
            <h3 className='text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300'>
              {item.name}
            </h3>
            <p className='mt-1 text-sm text-gray-600 line-clamp-2 leading-relaxed'>
              {item.description}
            </p>
            <div className='mt-2 flex items-center space-x-4'>
              <span className='text-lg font-bold gradient-text'>
                ₹{item.price.toFixed(2)}
              </span>
              <span className='text-sm text-gray-500'>
                per unit
              </span>
            </div>
          </div>

          {/* Total Price */}
          <div className='text-right ml-4'>
            <p className='text-xl font-bold text-gray-900'>
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Quantity Controls and Actions */}
        <div className='flex items-center justify-between mt-4'>
          {/* Quantity Controls */}
          <div className='flex items-center bg-gray-50 rounded-xl p-1'>
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              className='p-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 text-gray-600 hover:text-gray-900'
              aria-label='Decrease quantity'
            >
              <Minus size={16} />
            </button>

            <span className='mx-4 font-bold text-gray-900 min-w-[2rem] text-center'>
              {item.quantity}
            </span>

            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className='p-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 text-gray-600 hover:text-gray-900'
              aria-label='Increase quantity'
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className='flex items-center space-x-2'>
            <button
              className='p-2 rounded-lg text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200'
              aria-label='Add to wishlist'
            >
              <Heart size={18} />
            </button>

            <button
              onClick={handleRemove}
              className='p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200'
              aria-label='Remove item'
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;