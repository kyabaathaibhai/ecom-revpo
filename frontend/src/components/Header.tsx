import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Dashboard.png';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, User, Menu, X, ChevronDown, Search, Bell, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const { items } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    <header className='bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Left side - Logo */}
          <Link to='/' className='flex-shrink-0 flex items-center group'>
            <div className='relative'>
              <img
                src={Logo}
                alt='BiometricTech Logo'
                className='h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>
          </Link>

          {/* Center - Search Bar (Desktop) */}
          <div className='hidden md:flex flex-1 max-w-2xl mx-8'>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Search biometric devices...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 placeholder-gray-500'
              />
              {searchQuery && (
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <button
                    onClick={() => setSearchQuery('')}
                    className='text-gray-400 hover:text-gray-600 transition-colors'
                  >
                    <X className='h-4 w-4' />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-4'>
            {/* Wishlist */}
            <button className='relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group'>
              <Heart className='w-6 h-6 group-hover:scale-110 transition-transform' />
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                0
              </span>
            </button>

            {/* Notifications */}
            <button className='relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group'>
              <Bell className='w-6 h-6 group-hover:scale-110 transition-transform' />
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                3
              </span>
            </button>

            {/* Cart */}
            <Link
              to='/cart'
              className='relative flex items-center px-4 py-3 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 group'
            >
              <div className='relative mr-2'>
                <ShoppingCart className='w-6 h-6 group-hover:scale-110 transition-transform' />
                {cartItemsCount > 0 && (
                  <span className='absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse'>
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
                  className='flex items-center px-4 py-3 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 group'
                >
                  <div className='flex items-center'>
                    <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform'>
                      <User className='w-5 h-5 text-white' />
                    </div>
                    <div className='hidden lg:block text-left'>
                      <p className='font-semibold text-sm'>
                        {getShortenedEmail(user.email)}
                      </p>
                      <p className='text-xs text-gray-500'>Account</p>
                    </div>
                    <ChevronDown className='w-4 h-4 ml-2 transition-transform duration-200 group-hover:rotate-180' />
                  </div>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className='absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fade-in-up'>
                    <div className='px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50'>
                      <p className='text-sm font-semibold text-gray-900'>
                        Signed in as
                      </p>
                      <p className='text-sm text-gray-600 truncate'>
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to='/orders'
                      className='flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
                        📦
                      </div>
                      My Orders
                    </Link>
                    <Link
                      to='/profile'
                      className='flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3'>
                        👤
                      </div>
                      Profile Settings
                    </Link>
                    <hr className='my-2 border-gray-100' />
                    <button
                      onClick={handleSignOut}
                      className='flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors'
                    >
                      <div className='w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3'>
                        🚪
                      </div>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex items-center space-x-3'>
                <Link
                  to='/signin'
                  className='text-gray-600 hover:text-blue-600 font-semibold transition-colors px-4 py-2 rounded-xl hover:bg-blue-50'
                >
                  Sign In
                </Link>
                <Link
                  to='/signup'
                  className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center space-x-3'>
            {/* Mobile Cart */}
            <Link
              to='/cart'
              className='relative p-2 text-gray-600 hover:text-blue-600 transition-colors'
            >
              <ShoppingCart className='w-6 h-6' />
              {cartItemsCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className='p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50'
            >
              {isMobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className='md:hidden pb-4'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search products...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300'
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md animate-fade-in-up'>
            <div className='px-4 py-4 space-y-3'>
              {user ? (
                <>
                  <div className='flex items-center px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl'>
                    <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3'>
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
                    className='flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
                      📦
                    </div>
                    My Orders
                  </Link>
                  <hr className='my-2 border-gray-100' />
                  <button
                    onClick={handleSignOut}
                    className='flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors'
                  >
                    <div className='w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3'>
                      🚪
                    </div>
                    Sign Out
                  </button>
                </>
              ) : (
                <div className='space-y-3'>
                  <Link
                    to='/signin'
                    className='block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors text-center font-semibold'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to='/signup'
                    className='block px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl transition-colors text-center font-semibold hover:from-blue-700 hover:to-purple-700'
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
          className='fixed inset-0 bg-black/25 backdrop-blur-sm z-40'
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