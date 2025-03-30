import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import logo from '../logocurved.png'

const fadeInScale = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4a90e2, #50e3c2)',
  color: '#fff',
  textAlign: 'center',
  padding: '85px 20px',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  animation: `${fadeInScale} 1.5s ease-in-out`,
  [theme.breakpoints.down('md')]: { padding: '70px 15px' },
  [theme.breakpoints.down('sm')]: { padding: '55px 10px' }
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: '25px',
  textAlign: 'center',
  borderRadius: '12px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  },
  height: '100%',
  [theme.breakpoints.down('md')]: { padding: '20px' },
  [theme.breakpoints.down('sm')]: { padding: '15px' }
}));

const BackgroundWrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'linear-gradient(135deg, #d7e9f7, #f5e7ea)',
  backgroundImage: `radial-gradient(circle at 20% 40%, rgba(74,144,226,0.2), transparent 70%),
                    radial-gradient(circle at 80% 60%, rgba(255,105,135,0.2), transparent 70%)`,
  backgroundSize: 'cover',
  paddingTop: '64px'
});

const GradientButton1 = styled(Button)({
  padding: '12px 28px',
  borderRadius: '30px',
  fontFamily: '"Poppins", sans-serif',
  fontSize: '18px',
  fontWeight: 'bold',
  textTransform: 'none',
  color: '#fff',
  background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  '&:hover': {
    background: 'linear-gradient(135deg, #feb47b, #ff7e5f)',
    transform: 'scale(1.05)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.3)'
  }
});

const GradientButton2 = styled(Button)({
  padding: '12px 28px',
  borderRadius: '30px',
  fontFamily: '"Poppins", sans-serif',
  fontSize: '18px',
  fontWeight: 'bold',
  textTransform: 'none',
  color: '#fff',
  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  '&:hover': {
    background: 'linear-gradient(135deg, #2575fc, #6a11cb)',
    transform: 'scale(1.05)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.3)'
  }
});

const Home = () => {
  const [showName, setShowName] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const adminToken = sessionStorage.getItem('adminToken');
    setIsLoggedIn(!!token || !!adminToken);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowName(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BackgroundWrapper>
      <Container maxWidth="lg">
        
        {/* Hero Section */}
        <HeroSection>
          <Box sx={{ opacity: showName ? 1 : 0, transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out' }}>
            {showName ? (
              <Typography 
                variant="h2" 
                gutterBottom 
                sx={{ fontFamily: '"Poppins", sans-serif', fontWeight: 'bold', fontSize: { xs: '32px', md: '48px' } }}
              >
                 <img src={logo} alt="🔗" style={{ height: '50px', marginRight: '10px', marginBottom: '-5px' }} /> 
                <span style={{ background: 'linear-gradient(90deg, #e91e63, #8e24aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  LostLink
                </span>
              </Typography>
            ) : (
              <Typography 
                variant="h2" 
                gutterBottom 
                sx={{ fontFamily: '"Poppins", sans-serif', fontWeight: 'bold', fontSize: { xs: '32px', md: '48px' } }}
              >
                Welcome to <span style={{ color: '#4a90e2' }}>Lost & Found</span>
              </Typography>
            )}
          </Box>

          <Typography 
            variant="h5" 
            paragraph 
            sx={{ fontFamily: '"Poppins", sans-serif', fontWeight: 'bold', fontSize: { xs: '18px', md: '22px' } }}
          >
            Recover your lost items or report found ones quickly and easily!
          </Typography>

          {isLoggedIn ? (
            <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
              <GradientButton1 href="/lost">Report Lost Item</GradientButton1>
              <GradientButton2 href="/found">Report Found Item</GradientButton2>
            </Box>
          ) : (
            <Typography 
              variant="body1" 
              sx={{ fontSize: { xs: '16px', md: '18px' }, mt: 3, color: '#fff', opacity: 0.9 }}
            >
              Please <strong>log in</strong> or <strong>sign up</strong> to access our services and help reunite lost items with their owners.
            </Typography>
          )}
        </HeroSection>

        {/* Features Section */}
        <Box sx={{ my: 6, mb: 10 }}>
          <Grid 
            container 
            spacing={4} 
            justifyContent="center" 
            sx={{ rowGap: { xs: 4, sm: 6 } }} // Adjusted gap between wrapped cards
          >

            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard elevation={3}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  📌 Report Lost Items
                </Typography>
                <Typography>
                  Quickly report any lost item with details like date, location, and description.
                </Typography>
              </FeatureCard>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard elevation={3}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  🔎 Browse Found Items
                </Typography>
                <Typography>
                  Search and identify items that have been found and reported by others.
                </Typography>
              </FeatureCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <FeatureCard elevation={3}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  🛡️ Admin Access
                </Typography>
                <Typography>
                  Manage and verify reported items with admin privileges.
                </Typography>
              </FeatureCard>
            </Grid>

          </Grid>
        </Box>
      </Container>
    </BackgroundWrapper>
  );
};

export default Home;
