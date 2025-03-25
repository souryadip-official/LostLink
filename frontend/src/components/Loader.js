import React from 'react';
import { styled, keyframes } from '@mui/system';
import { Box, Typography } from '@mui/material';

// Keyframe animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeInOut = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 15px rgba(72, 144, 226, 0.4); }
  50% { box-shadow: 0 0 35px rgba(72, 144, 226, 0.8); }
  100% { box-shadow: 0 0 15px rgba(72, 144, 226, 0.4); }
`;

// Stylish Loader Container
const LoaderContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f0f0f0, #d9e2f3)',   // Elegant background gradient
  color: '#333',
  animation: `${fadeInOut} 2s ease-in-out infinite`,
}));

// Animated Loader Circle with Glow
const LoaderCircle = styled(Box)(({ theme }) => ({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: 'conic-gradient(from 0deg, #4a90e2, #50e3c2, #4a90e2)',
  animation: `${spin} 1.2s linear infinite, ${glowPulse} 1.8s ease-in-out infinite`,
  boxShadow: '0 0 25px rgba(72, 144, 226, 0.6)', 
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  color: '#4a90e2',
  letterSpacing: '1px',
  marginTop: '16px',
  animation: `${fadeInOut} 1.5s ease-in-out infinite`,
}));

const Loader = () => {
  return (
    <LoaderContainer>
      <Box display="flex" flexDirection="column" alignItems="center">
        <LoaderCircle />
        <LoadingText>Loading...</LoadingText>
      </Box>
    </LoaderContainer>
  );
};

export default Loader;
