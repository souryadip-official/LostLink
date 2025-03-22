import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

// Light grey footer with smaller font
const GreyFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#f0f0f0',                    // Light grey background
  color: '#2c3e50',                              // Dark text for contrast
  padding: '30px 20px',
  textAlign: 'center',
  width: '100%',                                 // Ensure it spans full width
  position: 'relative',
  borderRadius: '12px 12px 0 0',                 // Rounded top corners
  boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',   // Soft shadow
}));

// Footer links with hover effect
const FooterLink = styled(Link)(({ theme }) => ({
  color: '#2c3e50',                              // Dark text color
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '0.85rem',
  transition: 'color 0.3s, transform 0.3s',
  '&:hover': {
    color: '#1abc9c',                            // Mint green hover effect
    transform: 'scale(1.1)',
  },
  margin: '0 12px',
}));

const Footer = () => {
  return (
    <GreyFooter>
      <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 1 }}>
        &copy; 2025 LostLink. All rights reserved.
      </Typography>

      {/* Privacy Policy & Contact Us Links */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 1 }}>
        <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink href="/contact-us">Contact Us</FooterLink>
      </Box>

      {/* Credits Section */}
      <Box sx={{ mt: 2 }}>  
        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>Credits:</Typography>
        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
          Souryadip Mallick, Nirmalya Maiti, Karan Kr. Singh, Kausik Das
        </Typography>
      </Box>
    </GreyFooter>
  );
};

export default Footer;
