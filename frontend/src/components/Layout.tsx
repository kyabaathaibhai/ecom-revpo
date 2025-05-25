import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/Dashboard.png';

const Layout: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <Link to='/' className='flex-shrink-0 flex items-center'>
                <img src={Logo} alt='Logo' className='h-10 sm:h-20' />
              </Link>
              <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                <Link
                  to='/cart'
                  className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                >
                  Cart
                </Link>
                {user && (
                  <Link
                    to='/orders'
                    className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  >
                    Orders
                  </Link>
                )}
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              {user ? (
                <>
                  <span className='text-sm text-gray-500'>{user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    className='text-gray-500 hover:text-gray-700 font-medium'
                  >
                    Sign in
                  </Link>
                  <Link
                    to='/signup'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className='py-10'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
