import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Package, LayoutGrid, Users, ShoppingBag } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-64 bg-white shadow-soft'>
        <div className='p-4 border-b'>
          <h1 className='text-xl font-bold text-gray-800'>Admin Panel</h1>
        </div>
        <nav className='p-4 space-y-2'>
          <Link
            to='/admin/dashboard'
            className={`flex items-center p-3 rounded-lg transition-colors ${
              isActiveRoute('/admin/dashboard')
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid className='w-5 h-5 mr-3' />
            Dashboard
          </Link>
          <Link
            to='/admin/products'
            className={`flex items-center p-3 rounded-lg transition-colors ${
              isActiveRoute('/admin/products')
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Package className='w-5 h-5 mr-3' />
            Products
          </Link>
          <Link
            to='/admin/orders'
            className={`flex items-center p-3 rounded-lg transition-colors ${
              isActiveRoute('/admin/orders')
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className='w-5 h-5 mr-3' />
            Orders
          </Link>
          <Link
            to='/admin/customers'
            className={`flex items-center p-3 rounded-lg transition-colors ${
              isActiveRoute('/admin/customers')
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className='w-5 h-5 mr-3' />
            Customers
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-auto'>
        <div className='p-8'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
