import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import Logo from '../assets/Dashboard.png';

const Footer: React.FC = () => {
  return (
    <Box
      component='footer'
      sx={{
        bgcolor: '#1a1a1a',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth='lg'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <img src={Logo} alt='Logo' className='h-20' />

          {/* Contact Information */}
          <div>
            <Typography variant='h6' gutterBottom sx={{ color: '#4f9eed' }}>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant='body2'>INFO@REVOPAY.CO.IN</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant='body2'>+91 98724 83083</Typography>
            </Box>
          </div>

          {/* Corporate Office */}
          <div>
            <Typography variant='h6' gutterBottom sx={{ color: '#4f9eed' }}>
              Corporate Office
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <LocationOn sx={{ mr: 1, fontSize: 20, mt: 0.5 }} />
              <Typography variant='body2'>
                NEAR ANSHU ELECTRONICS, AMLOH ROAD
                <br />
                CITY MANDI GOBINDGARH
                <br />
                PUNJAB 147301
              </Typography>
            </Box>
          </div>

          {/* Head Office */}
          <div>
            <Typography variant='h6' gutterBottom sx={{ color: '#4f9eed' }}>
              Head Office
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <LocationOn sx={{ mr: 1, fontSize: 20, mt: 0.5 }} />
              <Typography variant='body2'>
                1ST FLOOR, ADJACENT DARSHNIDI HOSPITAL,
                <br />
                NEAR TEHSIL COMPLEX
                <br />
                CITY SAMANA, PATIALA
                <br />
                PUNJAB 147101
              </Typography>
            </Box>
          </div>
        </div>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

        <Typography
          variant='body2'
          align='center'
          sx={{ color: 'rgba(255,255,255,0.6)' }}
        >
          © {new Date().getFullYear()} REVOPAY INDIA PVT LTD. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;