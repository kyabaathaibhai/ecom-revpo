import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const HomePage: React.FC = () => {
  const { loading, error, fetchMore, fetchProducts, products } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <div className='text-center'>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Hero Section */}
      <div className='py-12 md:py-16 lg:py-20 text-center animate-fade-in'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
          Advanced Biometric Solutions
        </h1>
        <p className='max-w-2xl mx-auto text-xl text-gray-600 mb-8'>
          State-of-the-art biometric devices for enhanced security and seamless
          authentication.
        </p>
      </div>

      <div className='mb-16'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
          Featured Devices
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className='flex justify-center w-full mt-4'>
          <button
            onClick={fetchMore}
            className='text-white bg-black border-none text-md font-semibold py-2 px-8 rounded-md'
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
