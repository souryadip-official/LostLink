import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Keyframe animation for smooth fade-in and scale effect
const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Stylish Hero Section
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4a90e2, #50e3c2)',
  color: '#fff',
  textAlign: 'center',
  padding: '120px 20px',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  animation: `${fadeInScale} 1.5s ease-in-out`,  
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: '25px',
  textAlign: 'center',
  borderRadius: '12px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  height: '85%',
}));

// Stylish, observable background with abstract pattern
const BackgroundWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'linear-gradient(135deg, #d7e9f7, #f5e7ea)',    // Soft gradient
  backgroundImage: `radial-gradient(circle at 20% 40%, rgba(74,144,226,0.2), transparent 70%), 
                    radial-gradient(circle at 80% 60%, rgba(255,105,135,0.2), transparent 70%)`, 
  backgroundSize: 'cover',
  paddingTop: '64px'   // ✅ Shifts content below the navbar without a white gap
}));

const Home = () => {
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowName(true);
    }, 1000);  // 1s delay before transition
    return () => clearTimeout(timer);
  }, []);

  return (
    <BackgroundWrapper>  {/* ✅ Wrapped the content in the background wrapper */}
      <Container maxWidth="lg">
        {/* Hero Section */}
        <HeroSection>
          <Box
            sx={{
              opacity: showName ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
              transform: showName ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            {showName ? (
              <Typography 
                variant="h2" 
                gutterBottom
                sx={{ fontFamily: '"Times New Roman", serif' }}  // Forced font
              >
                🔗 <span style={{ 
                  background: 'linear-gradient(90deg, #e91e63, #8e24aa)',  
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  LostLink
                </span>
              </Typography>
            ) : (
              <Typography 
                variant="h2" 
                gutterBottom
                sx={{ fontFamily: '"Times New Roman", serif' }}  // Forced font
              >
                Welcome to <span style={{ color: '#4a90e2' }}>Lost & Found</span>
              </Typography>
            )}
          </Box>

          <Typography 
            variant="h5" 
            paragraph
            sx={{ fontFamily: '"Times New Roman", serif' }}  // Forced font
          >
            Recover your lost items or report found ones quickly and easily!
          </Typography>

          {/* Rounded Buttons */}
          <Button 
            variant="contained" 
            color="secondary" 
            href="/lost" 
            sx={{ 
              mx: 2, 
              mt: 2, 
              borderRadius: '24px',
              fontFamily: '"Inter", sans-serif'      // Modern font retained for buttons
            }}
          >
            Report Lost Item
          </Button>

          <Button 
            variant="contained" 
            color="success" 
            href="/found" 
            sx={{ 
              mx: 2, 
              mt: 2, 
              borderRadius: '24px',
              fontFamily: '"Inter", sans-serif'      // Modern font retained for buttons
            }}
          >
            Report Found Item
          </Button>
        </HeroSection>

        {/* Features Section */}
        <Box sx={{ my: 6, mb: 10 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <FeatureCard elevation={3}>
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ fontFamily: '"Times New Roman", serif' }}  // Forced font
                >
                  📌 Report Lost Items
                </Typography>
                <Typography sx={{ fontFamily: '"Times New Roman", serif' }}>
                  Quickly report any lost item with details like date, location, and description.
                </Typography>
              </FeatureCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <FeatureCard elevation={3}>
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ fontFamily: '"Times New Roman", serif' }}  // Forced font
                >
                  🔎 Browse Found Items
                </Typography>
                <Typography sx={{ fontFamily: '"Times New Roman", serif' }}>
                  Search and identify items that have been found and reported by others.
                </Typography>
              </FeatureCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <FeatureCard elevation={3}>
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ fontFamily: '"Times New Roman", serif' }}  // Forced font
                >
                  🛡️ Admin Access
                </Typography>
                <Typography sx={{ fontFamily: '"Times New Roman", serif' }}>
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
