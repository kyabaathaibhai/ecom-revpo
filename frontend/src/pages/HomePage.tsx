import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Shield, Zap, Award, Users, ChevronRight, Star, TrendingUp, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  const { loading, error, fetchMore, fetchProducts, products } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Auto-slide for hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      title: "Next-Gen Biometric Security",
      subtitle: "Advanced fingerprint and facial recognition technology",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Explore Solutions"
    },
    {
      title: "Enterprise-Grade Authentication",
      subtitle: "Secure access control for modern businesses",
      image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "View Products"
    },
    {
      title: "Seamless Integration",
      subtitle: "Easy-to-deploy biometric solutions",
      image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Get Started"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Advanced encryption and secure biometric data storage",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second authentication with 99.9% accuracy",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Industry Leading",
      description: "Trusted by Fortune 500 companies worldwide",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Scalable Solutions",
      description: "From small offices to enterprise deployments",
      color: "from-green-500 to-teal-500"
    }
  ];

  const stats = [
    { number: "500K+", label: "Devices Deployed", icon: TrendingUp },
    { number: "99.9%", label: "Accuracy Rate", icon: Star },
    { number: "24/7", label: "Support Available", icon: Clock },
    { number: "150+", label: "Countries Served", icon: Users }
  ];

  if (loading && products.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
        {/* Hero Skeleton */}
        <div className='relative h-[70vh] bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center space-y-4'>
              <div className='h-12 bg-gray-400 rounded-lg w-96 mx-auto'></div>
              <div className='h-6 bg-gray-400 rounded-lg w-64 mx-auto'></div>
              <div className='h-12 bg-gray-400 rounded-lg w-32 mx-auto'></div>
            </div>
          </div>
        </div>
        
        {/* Products Skeleton */}
        <div className='container-max section-padding'>
          <div className='h-8 bg-gray-300 rounded-lg w-48 mb-8 animate-pulse'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className='card p-6 animate-pulse'>
                <div className='h-48 bg-gray-300 rounded-xl mb-4'></div>
                <div className='h-6 bg-gray-300 rounded mb-2'></div>
                <div className='h-4 bg-gray-300 rounded mb-4'></div>
                <div className='h-10 bg-gray-300 rounded'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100'>
        <div className='text-center p-8 card max-w-md'>
          <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-2xl'>⚠️</span>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Oops! Something went wrong</h2>
          <p className='text-gray-600 mb-6'>{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className='btn-primary'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Hero Section with Carousel */}
      <section className='relative h-[80vh] overflow-hidden'>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10'></div>
            <img
              src={slide.image}
              alt={slide.title}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 z-20 flex items-center justify-center'>
              <div className='text-center text-white max-w-4xl px-4 animate-fade-in-up'>
                <h1 className='text-responsive-xl font-bold mb-6 text-shadow'>
                  {slide.title}
                </h1>
                <p className='text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto'>
                  {slide.subtitle}
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <button className='btn-primary text-lg px-8 py-4'>
                    {slide.cta}
                    <ChevronRight className='ml-2 w-5 h-5' />
                  </button>
                  <button className='btn-secondary text-lg px-8 py-4 bg-white/20 text-white border-white/30 hover:bg-white/30'>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Indicators */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3'>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-white'>
        <div className='container-max px-4'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center animate-fade-in-up' style={{ animationDelay: `${index * 0.1}s` }}>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 hover-lift'>
                  <stat.icon className='w-8 h-8 text-white' />
                </div>
                <div className='text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>{stat.number}</div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-white'>
        <div className='container-max section-padding'>
          <div className='text-center mb-16 animate-fade-in-up'>
            <h2 className='text-responsive-lg font-bold text-gray-900 mb-4'>
              Why Choose Our <span className='gradient-text'>Biometric Solutions</span>
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Experience the future of security with our cutting-edge biometric technology designed for modern businesses.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className='card p-8 text-center hover-lift animate-fade-in-up'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>{feature.title}</h3>
                <p className='text-gray-600 leading-relaxed'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className='py-20 bg-white'>
        <div className='container-max section-padding'>
          <div className='flex items-center justify-between mb-12 animate-fade-in-up'>
            <div>
              <h2 className='text-responsive-lg font-bold text-gray-900 mb-4'>
                Featured <span className='gradient-text'>Devices</span>
              </h2>
              <p className='text-xl text-gray-600'>
                Discover our premium collection of biometric security devices
              </p>
            </div>
            <button className='hidden lg:flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors'>
              View All Products
              <ChevronRight className='ml-2 w-5 h-5' />
            </button>
          </div>

          <div className='grid grid-auto-fit gap-8 mb-12'>
            {products?.map((product, index) => (
              <div 
                key={product.id} 
                className='animate-fade-in-up'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className='text-center animate-fade-in-up'>
            <button
              onClick={fetchMore}
              disabled={loading}
              className='btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                  Loading...
                </>
              ) : (
                'Load More Products'
              )}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
        <div className='container-max section-padding text-center'>
          <div className='max-w-3xl mx-auto animate-fade-in-up'>
            <h2 className='text-responsive-lg font-bold mb-6'>
              Ready to Secure Your Business?
            </h2>
            <p className='text-xl mb-8 text-blue-100'>
              Join thousands of companies worldwide who trust our biometric solutions for their security needs.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='btn bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4'>
                Get Free Consultation
              </button>
              <button className='btn border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4'>
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;