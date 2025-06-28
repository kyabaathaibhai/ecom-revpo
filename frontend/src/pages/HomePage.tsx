import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Sparkles, Zap, Shield, Award, ArrowRight, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const { loading, error, fetchMore, fetchProducts, products } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className='container-max section-padding'>
        <div className='text-center py-20'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4'>
            <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
          </div>
          <p className='text-gray-600 font-medium'>Loading amazing products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container-max section-padding'>
        <div className='text-center py-20'>
          <div className='text-red-500 text-xl font-semibold mb-4'>
            Oops! Something went wrong
          </div>
          <p className='text-gray-600'>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-40'></div>
        
        <div className='container-max section-padding relative'>
          <div className='text-center max-w-5xl mx-auto'>
            {/* Floating badge */}
            <div className='inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-soft mb-8 animate-fade-in-up'>
              <Sparkles className='w-4 h-4 text-blue-500 mr-2' />
              <span className='text-sm font-semibold text-gray-700'>
                Next-Generation Biometric Technology
              </span>
            </div>

            {/* Main heading */}
            <h1 className='text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up stagger-1'>
              <span className='gradient-text'>Advanced</span>
              <br />
              <span className='text-gray-900'>Biometric Solutions</span>
            </h1>

            {/* Subtitle */}
            <p className='text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-2'>
              State-of-the-art biometric devices for enhanced security and seamless
              authentication. Experience the future of identity verification.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up stagger-3'>
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className='btn-primary text-lg px-8 py-4'
              >
                Explore Products
                <ArrowRight className='w-5 h-5 ml-2' />
              </button>
              <button className='btn-secondary text-lg px-8 py-4'>
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up stagger-4'>
              {[
                { number: '10K+', label: 'Happy Customers' },
                { number: '99.9%', label: 'Accuracy Rate' },
                { number: '24/7', label: 'Support' },
                { number: '50+', label: 'Countries' },
              ].map((stat, index) => (
                <div key={index} className='text-center'>
                  <div className='text-3xl md:text-4xl font-bold gradient-text mb-2'>
                    {stat.number}
                  </div>
                  <div className='text-gray-600 font-medium'>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className='absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-float'></div>
        <div className='absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float' style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Features Section */}
      <section className='section-padding bg-white'>
        <div className='container-max'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Why Choose Our Solutions?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Cutting-edge technology meets unparalleled security and user experience
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                icon: Shield,
                title: 'Military-Grade Security',
                description: 'Advanced encryption and biometric algorithms ensure maximum protection for your data and identity.',
                color: 'from-blue-500 to-indigo-500'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Sub-second authentication with 99.9% accuracy rate. Experience seamless and instant verification.',
                color: 'from-emerald-500 to-teal-500'
              },
              {
                icon: Award,
                title: 'Industry Leading',
                description: 'Trusted by Fortune 500 companies worldwide. Award-winning technology with proven track record.',
                color: 'from-amber-500 to-orange-500'
              }
            ].map((feature, index) => (
              <div key={index} className='card card-hover p-8 text-center animate-fade-in-up' style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6`}>
                  <feature.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>{feature.title}</h3>
                <p className='text-gray-600 leading-relaxed'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id='products' className='section-padding bg-gradient-to-br from-gray-50 to-blue-50'>
        <div className='container-max'>
          <div className='text-center mb-16'>
            <div className='inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-soft mb-6'>
              <Star className='w-4 h-4 text-amber-500 mr-2' />
              <span className='text-sm font-semibold text-gray-700'>
                Premium Collection
              </span>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Featured Devices
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Discover our latest biometric devices designed for modern security needs
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
            {products?.map((product, index) => (
              <div key={product.id} className='animate-fade-in-up' style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className='text-center'>
            <button
              onClick={fetchMore}
              className='btn-primary text-lg px-8 py-4 group'
            >
              Load More Products
              <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300' />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='section-padding bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
        <div className='container-max'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              Stay Updated
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              Get the latest updates on new products, security insights, and industry trends
            </p>
            <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30'
              />
              <button className='btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 font-semibold'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;