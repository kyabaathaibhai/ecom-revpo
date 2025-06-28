import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Dashboard.png';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, User, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
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
    <header className='bg-white/80 backdrop-blur-md shadow-soft border-b border-white/20 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Left side - Logo */}
          <Link to='/' className='flex-shrink-0 flex items-center group'>
            <div className='relative'>
              <img
                src={Logo}
                alt='Logo'
                className='h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105'
              />
              <div className='absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm'></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {/* Cart */}
            <Link
              to='/cart'
              className='relative flex items-center px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 group'
            >
              <div className='relative mr-2'>
                <ShoppingCart className='w-6 h-6 group-hover:scale-110 transition-transform duration-300' />
                {cartItemsCount > 0 && (
                  <span className='absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse-glow'>
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </div>
              <span className='font-semibold'>Cart</span>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className='relative'>
                <button
                  onClick={toggleUserMenu}
                  className='flex items-center px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 group'
                >
                  <div className='flex items-center'>
                    <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300'>
                      <User className='w-5 h-5 text-white' />
                    </div>
                    <span className='font-semibold hidden lg:block'>
                      {getShortenedEmail(user.email)}
                    </span>
                    <ChevronDown className='w-4 h-4 ml-2 transition-transform duration-300 group-hover:rotate-180' />
                  </div>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className='absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-hover border border-white/20 py-3 z-50 animate-fade-in-scale'>
                    <div className='px-6 py-3 border-b border-gray-100/50'>
                      <p className='text-sm font-semibold text-gray-900'>
                        Signed in as
                      </p>
                      <p className='text-sm text-gray-600 truncate'>
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to='/orders'
                      className='block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-colors duration-200'
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className='flex items-center'>
                        <Sparkles className='w-4 h-4 mr-3' />
                        My Orders
                      </div>
                    </Link>
                    <hr className='my-2 border-gray-100/50' />
                    <button
                      onClick={handleSignOut}
                      className='block w-full text-left px-6 py-3 text-sm text-red-600 hover:bg-red-50/50 transition-colors duration-200'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <Link
                  to='/signin'
                  className='text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300'
                >
                  Sign In
                </Link>
                <Link
                  to='/signup'
                  className='btn-primary'
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
              className='relative p-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 rounded-xl hover:bg-blue-50/50'
            >
              <ShoppingCart className='w-6 h-6' />
              {cartItemsCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className='p-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 rounded-xl hover:bg-blue-50/50'
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
          <div className='md:hidden border-t border-gray-100/50 bg-white/90 backdrop-blur-md animate-slide-down'>
            <div className='px-4 py-6 space-y-4'>
              {user ? (
                <>
                  <div className='flex items-center px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl'>
                    <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-4'>
                      <User className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-gray-900'>
                        Signed in as
                      </p>
                      <p className='text-xs text-gray-600'>{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to='/orders'
                    className='flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 rounded-xl transition-colors duration-200'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Sparkles className='w-5 h-5 mr-3' />
                    My Orders
                  </Link>
                  <hr className='my-3 border-gray-100/50' />
                  <button
                    onClick={handleSignOut}
                    className='block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50/50 rounded-xl transition-colors duration-200'
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className='space-y-3'>
                  <Link
                    to='/signin'
                    className='block px-4 py-3 text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 rounded-xl transition-colors duration-200 text-center font-semibold'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to='/signup'
                    className='block px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl transition-colors duration-200 text-center font-semibold hover:from-blue-700 hover:to-indigo-700'
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
          className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
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