import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { Email, Phone, LocationOn, Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Heart, Sparkles } from 'lucide-react';
import Logo from '../assets/Dashboard.png';

const Footer: React.FC = () => {
  return (
    <Box
      component='footer'
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        py: 8,
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
          {/* Company Info */}
          <div className='md:col-span-1'>
            <div className='flex items-center mb-6'>
              <img src={Logo} alt='Logo' className='h-16 w-auto' />
            </div>
            <Typography variant='body2' sx={{ mb: 4, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
              Leading provider of advanced biometric solutions, delivering cutting-edge security technology for modern businesses.
            </Typography>
            
            {/* Social Links */}
            <div className='flex space-x-4'>
              {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                <button
                  key={index}
                  className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110'
                >
                  <Icon sx={{ fontSize: 20 }} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Typography variant='h6' gutterBottom sx={{ color: '#60a5fa', fontWeight: 600, mb: 3 }}>
              Quick Links
            </Typography>
            {['Products', 'Solutions', 'Support', 'About Us', 'Careers'].map((link) => (
              <Typography
                key={link}
                variant='body2'
                sx={{
                  mb: 2,
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#60a5fa',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                {link}
              </Typography>
            ))}
          </div>

          {/* Contact Information */}
          <div>
            <Typography variant='h6' gutterBottom sx={{ color: '#60a5fa', fontWeight: 600, mb: 3 }}>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <div className='w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-3'>
                <Email sx={{ fontSize: 20, color: '#60a5fa' }} />
              </div>
              <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.8)' }}>
                INFO@REVOPAY.CO.IN
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <div className='w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-3'>
                <Phone sx={{ fontSize: 20, color: '#4ade80' }} />
              </div>
              <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.8)' }}>
                +91 98724 83083
              </Typography>
            </Box>
          </div>

          {/* Corporate Office */}
          <div>
            <Typography variant='h6' gutterBottom sx={{ color: '#60a5fa', fontWeight: 600, mb: 3 }}>
              Corporate Office
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <div className='w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 mt-1'>
                <LocationOn sx={{ fontSize: 20, color: '#a855f7' }} />
              </div>
              <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                NEAR ANSHU ELECTRONICS, AMLOH ROAD
                <br />
                CITY MANDI GOBINDGARH
                <br />
                PUNJAB 147301
              </Typography>
            </Box>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10'>
          <div className='text-center mb-6'>
            <div className='inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full mb-4'>
              <Sparkles className='w-4 h-4 text-blue-400 mr-2' />
              <Typography variant='body2' sx={{ color: '#60a5fa', fontWeight: 600 }}>
                Stay Connected
              </Typography>
            </div>
            <Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Get the latest updates on products, security insights, and industry trends
            </Typography>
          </div>
          
          <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button className='px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105'>
              Subscribe
            </button>
          </div>
        </div>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <Typography
            variant='body2'
            sx={{ color: 'rgba(255,255,255,0.6)', mb: { xs: 4, md: 0 } }}
          >
            © {new Date().getFullYear()} REVOPAY INDIA PVT LTD. All rights reserved.
          </Typography>
          
          <div className='flex items-center text-sm text-white/60'>
            <span>Made with</span>
            <Heart className='w-4 h-4 mx-2 text-red-400 animate-pulse' />
            <span>for secure future</span>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Footer;