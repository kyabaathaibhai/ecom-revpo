import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Shield, Zap, Award, Users, ChevronRight, Star, TrendingUp, Clock, Sparkles, Rocket, Globe, Lock } from 'lucide-react';

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
      title: "🚀 Revolutionary Biometric Tech",
      subtitle: "Experience the future of security with AI-powered authentication",
      gradient: "from-purple-600 via-pink-600 to-red-600",
      cta: "Explore Now"
    },
    {
      title: "⚡ Lightning-Fast Recognition",
      subtitle: "Sub-millisecond authentication with 99.99% accuracy",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      cta: "See Demo"
    },
    {
      title: "🌟 Enterprise-Grade Security",
      subtitle: "Trusted by Fortune 500 companies worldwide",
      gradient: "from-green-600 via-emerald-600 to-cyan-600",
      cta: "Get Started"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Advanced quantum encryption and secure biometric data storage with zero-knowledge architecture",
      color: "from-blue-500 via-purple-500 to-pink-500",
      glow: "shadow-blue-500/50"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-millisecond authentication with 99.99% accuracy using advanced AI algorithms",
      color: "from-yellow-500 via-orange-500 to-red-500",
      glow: "shadow-yellow-500/50"
    },
    {
      icon: Award,
      title: "Industry Leading",
      description: "Trusted by Fortune 500 companies and government agencies worldwide",
      color: "from-purple-500 via-pink-500 to-red-500",
      glow: "shadow-purple-500/50"
    },
    {
      icon: Users,
      title: "Scalable Solutions",
      description: "From small offices to enterprise deployments handling millions of users",
      color: "from-green-500 via-teal-500 to-blue-500",
      glow: "shadow-green-500/50"
    }
  ];

  const stats = [
    { number: "500K+", label: "Devices Deployed", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
    { number: "99.99%", label: "Accuracy Rate", icon: Star, color: "from-yellow-500 to-orange-500" },
    { number: "24/7", label: "Support Available", icon: Clock, color: "from-purple-500 to-pink-500" },
    { number: "150+", label: "Countries Served", icon: Globe, color: "from-green-500 to-teal-500" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      content: "Revolutionary technology that transformed our security infrastructure. The accuracy is phenomenal!",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Security Director, GlobalBank",
      content: "Best investment we've made in cybersecurity. The ROI was immediate and substantial.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "IT Manager, HealthSystem",
      content: "Seamless integration and outstanding support. Our patients love the convenience!",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 5
    }
  ];

  if (loading && products.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
        {/* Hero Skeleton */}
        <div className='relative h-screen overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center space-y-8'>
                <div className='h-16 bg-white/20 rounded-2xl w-96 mx-auto animate-shimmer'></div>
                <div className='h-8 bg-white/20 rounded-2xl w-64 mx-auto animate-shimmer'></div>
                <div className='h-14 bg-white/20 rounded-2xl w-40 mx-auto animate-shimmer'></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Skeleton */}
        <div className='container-max section-padding'>
          <div className='h-12 bg-white/20 rounded-2xl w-64 mb-12 animate-shimmer'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className='card p-8 animate-pulse'>
                <div className='h-64 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-2xl mb-6 animate-shimmer'></div>
                <div className='h-8 bg-white/20 rounded-xl mb-4 animate-shimmer'></div>
                <div className='h-6 bg-white/20 rounded-xl mb-6 animate-shimmer'></div>
                <div className='h-12 bg-white/20 rounded-xl animate-shimmer'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-purple-900 to-pink-900'>
        <div className='text-center p-12 card max-w-md animate-bounce-in'>
          <div className='w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-ring'>
            <span className='text-4xl'>⚠️</span>
          </div>
          <h2 className='text-3xl font-bold text-white mb-4'>Oops! Something went wrong</h2>
          <p className='text-gray-300 mb-8 text-lg'>{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className='btn-primary text-xl px-8 py-4'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      {/* Animated Background */}
      <div className='fixed inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'></div>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
      </div>

      {/* Hero Section with Carousel */}
      <section className='relative h-screen overflow-hidden flex items-center justify-center'>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-20`}></div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center text-white max-w-6xl px-4 animate-fade-in-up'>
                <h1 className='text-6xl md:text-8xl lg:text-9xl font-black mb-8 text-shadow-lg leading-tight'>
                  <span className='gradient-text'>{slide.title}</span>
                </h1>
                <p className='text-2xl md:text-3xl lg:text-4xl mb-12 text-gray-200 max-w-4xl mx-auto font-light'>
                  {slide.subtitle}
                </p>
                <div className='flex flex-col sm:flex-row gap-6 justify-center'>
                  <button className='btn-primary text-2xl px-12 py-6 relative overflow-hidden group'>
                    <span className='relative z-10 flex items-center'>
                      <Rocket className='mr-3 w-6 h-6' />
                      {slide.cta}
                      <ChevronRight className='ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform' />
                    </span>
                  </button>
                  <button className='btn-secondary text-2xl px-12 py-6 text-white border-white/30 hover:bg-white/10'>
                    <Sparkles className='mr-3 w-6 h-6' />
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Indicators */}
        <div className='absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex space-x-4'>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125 shadow-glow' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className='absolute w-2 h-2 bg-white/20 rounded-full animate-particle-float'
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-24 bg-white/5 backdrop-blur-md border-y border-white/10'>
        <div className='container-max px-4'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center animate-fade-in-up group' style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-6 hover-lift group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
                  <stat.icon className='w-10 h-10 text-white' />
                </div>
                <div className='text-4xl lg:text-5xl font-black text-white mb-3 gradient-text'>{stat.number}</div>
                <div className='text-gray-300 font-semibold text-lg'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-32 bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md'>
        <div className='container-max section-padding'>
          <div className='text-center mb-20 animate-fade-in-up'>
            <h2 className='text-5xl lg:text-6xl font-black text-white mb-8'>
              Why Choose Our <span className='gradient-text'>Biometric Solutions</span>
            </h2>
            <p className='text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed'>
              Experience the future of security with our cutting-edge biometric technology designed for modern businesses.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`card p-12 text-center hover-lift animate-fade-in-up group relative overflow-hidden ${feature.glow}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <div className={`w-24 h-24 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500 shadow-2xl relative z-10`}>
                  <feature.icon className='w-12 h-12 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white mb-6 relative z-10'>{feature.title}</h3>
                <p className='text-gray-300 leading-relaxed text-lg relative z-10'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className='py-32 bg-white/5 backdrop-blur-md'>
        <div className='container-max section-padding'>
          <div className='flex items-center justify-between mb-16 animate-fade-in-up'>
            <div>
              <h2 className='text-5xl lg:text-6xl font-black text-white mb-6'>
                Featured <span className='gradient-text'>Devices</span>
              </h2>
              <p className='text-2xl text-gray-300 max-w-2xl'>
                Discover our premium collection of biometric security devices
              </p>
            </div>
            <button className='hidden lg:flex items-center text-white hover:text-purple-300 font-bold transition-colors text-xl group'>
              View All Products
              <ChevronRight className='ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform' />
            </button>
          </div>

          <div className='grid grid-auto-fit gap-10 mb-16'>
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
              className='btn-primary text-xl px-12 py-6 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group'
            >
              {loading ? (
                <>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3'></div>
                  Loading More...
                </>
              ) : (
                <>
                  <Sparkles className='mr-3 w-6 h-6' />
                  Load More Products
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-32 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-md'>
        <div className='container-max section-padding'>
          <div className='text-center mb-20 animate-fade-in-up'>
            <h2 className='text-5xl lg:text-6xl font-black text-white mb-8'>
              What Our <span className='gradient-text'>Clients Say</span>
            </h2>
            <p className='text-2xl text-gray-300 max-w-3xl mx-auto'>
              Trusted by industry leaders worldwide
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className='card p-8 hover-lift animate-fade-in-up group'
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className='flex items-center mb-6'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='w-5 h-5 text-yellow-400 fill-current' />
                  ))}
                </div>
                <p className='text-gray-300 mb-6 text-lg leading-relaxed italic'>
                  "{testimonial.content}"
                </p>
                <div className='flex items-center'>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className='w-12 h-12 rounded-full mr-4 border-2 border-purple-500'
                  />
                  <div>
                    <h4 className='text-white font-bold'>{testimonial.name}</h4>
                    <p className='text-gray-400 text-sm'>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-32 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='container-max section-padding text-center relative z-10'>
          <div className='max-w-4xl mx-auto animate-fade-in-up'>
            <h2 className='text-5xl lg:text-6xl font-black text-white mb-8 text-shadow-lg'>
              Ready to Secure Your Business?
            </h2>
            <p className='text-2xl mb-12 text-white/90 leading-relaxed'>
              Join thousands of companies worldwide who trust our biometric solutions for their security needs.
            </p>
            <div className='flex flex-col sm:flex-row gap-6 justify-center'>
              <button className='btn bg-white text-purple-600 hover:bg-gray-100 text-xl px-12 py-6 font-bold shadow-2xl'>
                <Lock className='mr-3 w-6 h-6' />
                Get Free Consultation
              </button>
              <button className='btn border-2 border-white text-white hover:bg-white hover:text-purple-600 text-xl px-12 py-6 font-bold'>
                <Globe className='mr-3 w-6 h-6' />
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float'></div>
        <div className='absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-float' style={{ animationDelay: '2s' }}></div>
        <div className='absolute bottom-20 left-32 w-12 h-12 bg-white/10 rounded-full animate-float' style={{ animationDelay: '4s' }}></div>
      </section>
    </div>
  );
};

export default HomePage;