import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />

      <main className='py-10'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
