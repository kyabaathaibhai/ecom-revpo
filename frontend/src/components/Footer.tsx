import React from 'react';
import { Box, Container, Typography, Divider, IconButton } from '@mui/material';
import { Email, Phone, LocationOn, Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Logo from '../assets/Dashboard.png';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Products',
      links: [
        { name: 'Fingerprint Scanners', href: '/products/fingerprint' },
        { name: 'Face Recognition', href: '/products/face-recognition' },
        { name: 'Access Control', href: '/products/access-control' },
        { name: 'Time Attendance', href: '/products/time-attendance' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { name: 'Enterprise Security', href: '/solutions/enterprise' },
        { name: 'Small Business', href: '/solutions/small-business' },
        { name: 'Government', href: '/solutions/government' },
        { name: 'Healthcare', href: '/solutions/healthcare' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Documentation', href: '/support/docs' },
        { name: 'API Reference', href: '/support/api' },
        { name: 'Help Center', href: '/support/help' },
        { name: 'Contact Support', href: '/support/contact' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Partners', href: '/partners' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: '#1877f2' },
    { icon: Twitter, href: '#', color: '#1da1f2' },
    { icon: LinkedIn, href: '#', color: '#0077b5' },
    { icon: Instagram, href: '#', color: '#e4405f' },
  ];

  return (
    <Box
      component='footer'
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
        }
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Company Info */}
          <div className='lg:col-span-4'>
            <div className='flex items-center mb-6'>
              <img src={Logo} alt='BiometricTech Logo' className='h-12 mr-3' />
              <Typography variant='h6' sx={{ fontWeight: 700, color: '#3b82f6' }}>
                BiometricTech
              </Typography>
            </div>
            <Typography variant='body1' sx={{ mb: 4, color: '#94a3b8', lineHeight: 1.7 }}>
              Leading provider of advanced biometric security solutions. Trusted by Fortune 500 companies worldwide for secure authentication and access control.
            </Typography>
            
            {/* Social Links */}
            <div className='flex space-x-3'>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: social.color,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className='lg:col-span-8'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {footerSections.map((section, index) => (
                <div key={index}>
                  <Typography 
                    variant='h6' 
                    gutterBottom 
                    sx={{ 
                      color: '#3b82f6', 
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      mb: 3
                    }}
                  >
                    {section.title}
                  </Typography>
                  <ul className='space-y-2'>
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className='mt-12 pt-8 border-t border-gray-700'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Email */}
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
                <Email sx={{ fontSize: 20 }} />
              </div>
              <div>
                <Typography variant='subtitle2' sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                  Email Us
                </Typography>
                <Typography variant='body2' sx={{ color: 'white', fontWeight: 500 }}>
                  INFO@REVOPAY.CO.IN
                </Typography>
              </div>
            </div>

            {/* Phone */}
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center'>
                <Phone sx={{ fontSize: 20 }} />
              </div>
              <div>
                <Typography variant='subtitle2' sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                  Call Us
                </Typography>
                <Typography variant='body2' sx={{ color: 'white', fontWeight: 500 }}>
                  +91 98724 83083
                </Typography>
              </div>
            </div>

            {/* Location */}
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center'>
                <LocationOn sx={{ fontSize: 20 }} />
              </div>
              <div>
                <Typography variant='subtitle2' sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                  Visit Us
                </Typography>
                <Typography variant='body2' sx={{ color: 'white', fontWeight: 500 }}>
                  Punjab, India
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className='mt-12 pt-8 border-t border-gray-700'>
          <div className='max-w-md'>
            <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>
              Stay Updated
            </Typography>
            <Typography variant='body2' sx={{ mb: 4, color: '#94a3b8' }}>
              Get the latest updates on biometric technology and security solutions.
            </Typography>
            <div className='flex space-x-3'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
              <button className='px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Container>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

      {/* Bottom Footer */}
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
          <Typography
            variant='body2'
            sx={{ color: '#94a3b8', textAlign: { xs: 'center', md: 'left' } }}
          >
            © {new Date().getFullYear()} REVOPAY INDIA PVT LTD. All rights reserved.
          </Typography>
          
          <div className='flex space-x-6 text-sm'>
            <Link to='/privacy' className='text-gray-400 hover:text-white transition-colors'>
              Privacy Policy
            </Link>
            <Link to='/terms' className='text-gray-400 hover:text-white transition-colors'>
              Terms of Service
            </Link>
            <Link to='/cookies' className='text-gray-400 hover:text-white transition-colors'>
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Footer;