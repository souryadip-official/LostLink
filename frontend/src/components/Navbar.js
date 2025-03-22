import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; // Home icon
import CategoryIcon from '@mui/icons-material/Category'; // Items icon
import LoginIcon from '@mui/icons-material/Login'; // Login icon
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Signup icon

// Blurred navbar without shadow
const BlurNavbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.15)', // Transparent white with slight opacity
  backdropFilter: 'blur(12px)',                  // Blur effect
  WebkitBackdropFilter: 'blur(12px)',            // For Safari support
  transition: 'all 0.3s ease-in-out',
  borderRadius: '0 0 12px 12px',                 // Slight rounding at bottom
  marginBottom: '-20px',                         // ✅ Remove gap below the navbar
  boxShadow: 'none',                             // No shadow
  height: '65px'                                 // Reduced navbar height
}));

// Styled buttons with light colors and hover effects
const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  borderRadius: '24px',                         // Rounded buttons
  padding: '8px 20px',
  textTransform: 'none',                        // No uppercase
  fontWeight: 'bold',
  transition: 'background 0.3s, transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',                    // Hover scale effect
  }
}));

const Navbar = () => {
  return (
    <BlurNavbar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* Branding with chain emoji */}
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: 'none', 
            color: '#2c3e50', 
            fontWeight: 'bold',
            '&:hover': { color: '#1abc9c' }       // Hover color
          }}
        >
          🔗 LostLink
        </Typography>

        {/* Navigation buttons */}
        <Box>
          <NavButton 
            component={Link} 
            to="/" 
            sx={{ backgroundColor: '#a0c4e8', '&:hover': { backgroundColor: '#3498db' }, mx: 1 }}
          >
            <HomeIcon sx={{ mr: 1 }} /> {/* Home icon */}
            Home
          </NavButton>

          <NavButton 
            component={Link} 
            to="/items" 
            sx={{ backgroundColor: '#f1c40f', '&:hover': { backgroundColor: '#f39c12' }, mx: 1 }}
          >
            <CategoryIcon sx={{ mr: 1 }} /> {/* Items icon */}
            Items
          </NavButton>

          <NavButton 
            component={Link} 
            to="/login" 
            sx={{ backgroundColor: '#81c784', '&:hover': { backgroundColor: '#388e3c' }, mx: 1 }}
          >
            <LoginIcon sx={{ mr: 1 }} /> {/* Login icon */}
            Login
          </NavButton>

          <NavButton 
            component={Link} 
            to="/signup" 
            sx={{ backgroundColor: '#66bb6a', '&:hover': { backgroundColor: '#388e3c' }, mx: 1 }}
          >
            <PersonAddIcon sx={{ mr: 1 }} /> {/* Signup icon */}
            Signup
          </NavButton>
        </Box>
      </Toolbar>
    </BlurNavbar>
  );
};

export default Navbar;
