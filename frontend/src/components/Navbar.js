import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const BlurNavbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  transition: 'all 0.3s ease-in-out',
  borderRadius: '0 0 12px 12px',
  marginBottom: '-20px',
  boxShadow: 'none',
  height: '70px'
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  borderRadius: '24px',
  padding: '8px 20px',
  textTransform: 'none',
  fontWeight: 'bold',
  transition: 'background 0.3s, transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  color: '#1abc9c',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    color: '#16a085',
    transform: 'scale(1.15)',
  }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
    borderRadius: '12px 0 0 12px',
    color: '#2c3e50',
    width: '280px',
    transition: 'all 0.4s ease-in-out'
  }
}));

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <BlurNavbar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          
          <Typography 
            variant="h5" 
            component={Link} 
            to="/" 
            sx={{ 
              textDecoration: 'none', 
              color: '#2c3e50', 
              fontWeight: 'bold',
              '&:hover': { color: '#1abc9c' }
            }}
          >
            🔗 LostLink
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavButton component={Link} to="/" sx={{ backgroundColor: '#a0c4e8', '&:hover': { backgroundColor: '#3498db' }, mx: 1 }}>
              <HomeIcon sx={{ mr: 1 }} />
              Home
            </NavButton>

            <NavButton component={Link} to="/items" sx={{ backgroundColor: '#f1c40f', '&:hover': { backgroundColor: '#f39c12' }, mx: 1 }}>
              <CategoryIcon sx={{ mr: 1 }} />
              Items
            </NavButton>

            <NavButton component={Link} to="/login" sx={{ backgroundColor: '#81c784', '&:hover': { backgroundColor: '#388e3c' }, mx: 1 }}>
              <LoginIcon sx={{ mr: 1 }} />
              Login
            </NavButton>

            <NavButton component={Link} to="/signup" sx={{ backgroundColor: '#66bb6a', '&:hover': { backgroundColor: '#388e3c' }, mx: 1 }}>
              <PersonAddIcon sx={{ mr: 1 }} />
              Signup
            </NavButton>
          </Box>

          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuButton onClick={toggleDrawer}>
              <MenuIcon sx={{ fontSize: 32 }} />
            </MenuButton>
          </Box>
        </Toolbar>
      </BlurNavbar>

      <StyledDrawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon sx={{ color: '#e74c3c' }} />
          </IconButton>
        </Box>
        
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon><HomeIcon sx={{ color: '#3498db' }} /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button component={Link} to="/items" onClick={toggleDrawer}>
            <ListItemIcon><CategoryIcon sx={{ color: '#f1c40f' }} /></ListItemIcon>
            <ListItemText primary="Items" />
          </ListItem>

          <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
            <ListItemIcon><LoginIcon sx={{ color: '#81c784' }} /></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>

          <ListItem button component={Link} to="/signup" onClick={toggleDrawer}>
            <ListItemIcon><PersonAddIcon sx={{ color: '#66bb6a' }} /></ListItemIcon>
            <ListItemText primary="Signup" />
          </ListItem>
        </List>
      </StyledDrawer>
    </>
  );
};

export default Navbar;
