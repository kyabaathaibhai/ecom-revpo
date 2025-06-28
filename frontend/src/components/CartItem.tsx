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
    <div className='flex items-center py-6 border-b border-gray-100 last:border-b-0 animate-fade-in-up hover:bg-gray-50/50 transition-colors duration-300 rounded-xl px-4'>
      <div className='h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg'>
        <img
          src={item.image_url}
          alt={item.name}
          className='h-full w-full object-cover object-center hover:scale-110 transition-transform duration-300'
        />
      </div>

      <div className='ml-6 flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between text-base font-semibold text-gray-900'>
            <h3 className='text-lg hover:text-blue-600 transition-colors cursor-pointer'>
              {item.name}
            </h3>
            <p className='ml-4 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              ₹{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
          <p className='mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed'>
            {item.description}
          </p>
          <div className='mt-2 flex items-center space-x-2'>
            <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium'>
              Premium Quality
            </span>
            <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium'>
              In Stock
            </span>
          </div>
        </div>

        <div className='flex flex-1 items-end justify-between text-sm mt-4'>
          <div className='flex items-center space-x-4'>
            {/* Quantity Controls */}
            <div className='flex items-center bg-gray-100 rounded-xl p-1'>
              <button
                onClick={() => handleUpdateQuantity(item.quantity - 1)}
                className='p-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 text-gray-600 hover:text-blue-600'
                aria-label='Decrease quantity'
              >
                <Minus size={16} />
              </button>

              <span className='mx-4 font-bold text-lg min-w-[2rem] text-center'>
                {item.quantity}
              </span>

              <button
                onClick={() => handleUpdateQuantity(item.quantity + 1)}
                className='p-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 text-gray-600 hover:text-blue-600'
                aria-label='Increase quantity'
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Unit Price */}
            <div className='text-sm text-gray-500'>
              <span className='font-medium'>₹{item.price.toLocaleString()}</span> each
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            {/* Move to Wishlist */}
            <button
              className='flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200 text-sm font-medium'
              aria-label='Move to wishlist'
            >
              <Heart size={16} className='mr-1' />
              Save for later
            </button>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className='flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200 text-sm font-medium group'
              aria-label='Remove item'
            >
              <Trash2 size={16} className='mr-1 group-hover:scale-110 transition-transform' />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;