import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

const GreyFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  color: '#2c3e50',
  padding: '30px 20px',
  textAlign: 'center',
  width: '100%',
  position: 'relative',
  borderRadius: '12px 12px 0 0',
  boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    padding: '25px 15px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px'
  }
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#2c3e50',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '0.85rem',
  transition: 'color 0.3s, transform 0.3s',
  '&:hover': {
    color: '#1abc9c',
    transform: 'scale(1.1)'
  },
  margin: '0 12px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    margin: '0 8px'
  }
}));

const Footer = () => {
  return (
    <GreyFooter>
      <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, mb: 1 }}>
        &copy; 2025 LostLink. All rights reserved.
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: { xs: 2, md: 4 }, 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        mt: 1 
      }}>
        <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink href="/contact-us">Contact Us</FooterLink>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'center' }}>  
        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Credits:</Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
          Souryadip Mallick, Nirmalya Maiti, Karan Kr. Singh, Kausik Das
        </Typography>
      </Box>
    </GreyFooter>
  );
};

export default Footer;
