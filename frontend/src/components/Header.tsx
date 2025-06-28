import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Dashboard.png';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const { items } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const cartItemsCount = items.reduce(
    (total: number, item: { quantity: number }) => total + item.quantity,
    0
  );

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const getShortenedEmail = (email: string | undefined) => {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    if (atIndex <= 3) return email;
    return email.slice(0, 3) + '...@' + email.split('@')[1];
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Left side - Logo */}
          <Link to='/' className='flex-shrink-0 flex items-center'>
            <img
              src={Logo}
              alt='Logo'
              className='h-20 w-auto object-contain hover:opacity-80 transition-opacity'
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-6'>
            {/* Cart */}
            <Link
              to='/cart'
              className='flex gap-1 items-center px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 group'
            >
              <div className='relative'>
                <ShoppingCart className='w-5 h-5 group-hover:scale-110 transition-transform' />
                {cartItemsCount > 0 && (
                  <span className='absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-pulse'>
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </div>
              <span className='ml-1 font-medium'>Cart</span>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className='relative'>
                <button
                  onClick={toggleUserMenu}
                  className='flex items-center px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200'
                >
                  <div className='flex items-center'>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2'>
                      <User className='w-4 h-4 text-blue-600' />
                    </div>
                    <span className='font-medium hidden sm:block'>
                      {getShortenedEmail(user.email)}
                    </span>
                    <ChevronDown className='w-4 h-4 ml-1 transition-transform duration-200' />
                  </div>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
                    <div className='px-4 py-2 border-b border-gray-100'>
                      <p className='text-sm font-medium text-gray-900'>
                        Signed in as
                      </p>
                      <p className='text-sm text-gray-600 truncate'>
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to='/orders'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <hr className='my-2 border-gray-100' />
                    <button
                      onClick={handleSignOut}
                      className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex items-center space-x-3'>
                <Link
                  to='/signin'
                  className='text-gray-600 hover:text-gray-900 font-medium transition-colors'
                >
                  Sign In
                </Link>
                <Link
                  to='/signup'
                  className='bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm'
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center space-x-4'>
            {/* Mobile Cart */}
            <Link
              to='/cart'
              className='relative p-2 text-gray-600 hover:text-gray-900 transition-colors'
            >
              <ShoppingCart className='w-6 h-6' />
              {cartItemsCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center'>
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className='p-2 text-gray-600 hover:text-gray-900 transition-colors'
            >
              {isMobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-gray-100 bg-white'>
            <div className='px-4 py-4 space-y-3'>
              {user ? (
                <>
                  <div className='flex items-center px-3 py-2 bg-gray-50 rounded-lg'>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
                      <User className='w-4 h-4 text-blue-600' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>
                        Signed in as
                      </p>
                      <p className='text-xs text-gray-600'>{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to='/orders'
                    className='block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <hr className='my-2 border-gray-100' />
                  <button
                    onClick={handleSignOut}
                    className='block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className='space-y-3'>
                  <Link
                    to='/signin'
                    className='block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-center'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to='/signup'
                    className='block px-3 py-2 bg-blue-600 text-white rounded-lg transition-colors text-center hover:bg-blue-700'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {(isMobileMenuOpen || isUserMenuOpen) && (
        <div
          className='fixed inset-0 bg-black bg-opacity-25 z-40'
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;