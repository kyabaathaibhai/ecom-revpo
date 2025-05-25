import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Dashboard.png';
import { ShoppingCart, Home, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { cartItems } = useCart();

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className='bg-white shadow-sm sticky top-0 z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Link to='/' className='flex items-center'>
            <img src={Logo} alt='Logo' className='w-10 h-10' />
          </Link>

          <div className='flex items-center space-x-4'>
            <Link
              to='/'
              className='text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-gray-100'
            >
              <Home size={20} />
            </Link>
            <Link
              to='/orders'
              className='text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-gray-100'
            >
              <Package size={20} />
            </Link>
            <Link
              to='/cart'
              className='relative text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-gray-100'
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
