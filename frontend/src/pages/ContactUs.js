import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/system';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const Wrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #d7e9f7, #f5e7ea)',
  backgroundImage: `radial-gradient(circle at 20% 40%, rgba(74,144,226,0.15), transparent 70%), 
                    radial-gradient(circle at 80% 60%, rgba(255,105,135,0.15), transparent 70%)`, 
  backgroundSize: 'cover',
  padding: '20px',
  [theme.breakpoints.down('md')]: {
    padding: '20px 40px'      // Add left & right padding for medium screens
  },
  [theme.breakpoints.down('sm')]: {
    padding: '15px'
  }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  maxWidth: '700px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    padding: '35px',
    maxWidth: '600px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '25px',
    maxWidth: '90%'
  }
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontFamily: '"Times New Roman", serif',
  fontSize: '42px',
  fontWeight: 'bold',
  color: '#2c3e50',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '36px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '28px'
  }
}));

const SocialMediaIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '20px',
  '& svg': {
    fontSize: '30px',
    color: '#95a5a6',
    transition: 'color 0.3s ease, transform 0.3s',
    padding: '10px',
    borderRadius: '8px',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  '& a:nth-of-type(1):hover svg': {
    color: 'blue'
  },
  '& a:nth-of-type(2):hover svg': {
    color: '#8e44ad'
  },
  '& a:nth-of-type(3):hover svg': {
    color: '#3498db'
  },
  [theme.breakpoints.down('md')]: {
    '& svg': {
      fontSize: '26px',
      padding: '8px'
    }
  },
  [theme.breakpoints.down('sm')]: {
    '& svg': {
      fontSize: '22px',
      padding: '6px'
    }
  }
}));

const ContactUs = () => {
  return (
    <Wrapper>
      <ContentBox>
        <Heading>Contact Us</Heading>

        <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Times New Roman", serif' }}>
          Feel free to reach out to us for any queries or support!
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ fontSize: { xs: '16px', md: '18px' }, mb: 2, fontFamily: '"Times New Roman", serif' }}
        >
          📧 Email: 
          <MuiLink href="mailto:contact@lostlink.com" sx={{ textDecoration: 'none' }}>
             &nbsp;lostandfound094@gmail.com
          </MuiLink>
        </Typography>

        <SocialMediaIcons>
          <MuiLink href="https://facebook.com" target="_blank">
            <Facebook />
          </MuiLink>
          <MuiLink href="https://instagram.com" target="_blank">
            <Instagram />
          </MuiLink>
          <MuiLink href="https://twitter.com" target="_blank">
            <Twitter />
          </MuiLink>
        </SocialMediaIcons>
      </ContentBox>
    </Wrapper>
  );
};

export default ContactUs;
