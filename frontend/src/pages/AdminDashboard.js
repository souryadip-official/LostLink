import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Avatar, Button } from '@mui/material';
import { Dashboard, Inventory, CheckCircle, HourglassEmpty, Logout, AdminPanelSettings } from '@mui/icons-material';  
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GradientBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',  
  background: 'linear-gradient(135deg, #f0f0f0, #e0f7fa)',  
}));

const Sidebar = styled(Drawer)(({ theme }) => ({
  width: 260,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 260,
    boxSizing: 'border-box',
    background: 'linear-gradient(135deg, #ffffff, #e0f7fa)',
    boxShadow: '5px 0 15px rgba(0, 0, 0, 0.1)',
    borderRight: '1px solid #ccc',
    zIndex: 1,  
  },
}));

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: '40px',
  background: 'linear-gradient(135deg, #f6f6f6, #e0f7fa)',  
  transition: 'all 0.3s ease',
  minHeight: '100vh',  
  zIndex: 0,  
}));

const SidebarItem = styled(ListItemButton)(({ theme }) => ({
  transition: 'all 0.3s',
  borderRadius: '12px',
  margin: '8px 10px',
  '&:hover': {
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',  
    color: '#fff',
    transform: 'translateX(10px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
  }
}));

const LogoutBtn = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',  
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '12px',
  margin: '20px',
  transition: '0.3s',
  '&:hover': {
    background: 'linear-gradient(135deg, #ff4b2b, #ff416c)',  
    transform: 'scale(1.05)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
  },
  fontWeight: 'bold',
  fontSize: '16px',
  width: '80%',
  textAlign: 'center',
}));

const AdminDashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hasRedirected = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        if (!hasRedirected.current) {
          localStorage.removeItem('adminToken');
          toast.error('Admin panel is only accessible on larger screens!');
          toast('Admin logged out due to small screen size', { 
            icon: '⚠️',
            duration: 3000,
          });
          navigate('/');
        }
      } 
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/secure/admin/confidential');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Manage Items', icon: <Inventory />, path: '/admin/manage-items' },
    { text: 'Resolved Cases', icon: <CheckCircle />, path: '/admin/resolved-cases' },
    { text: 'Pending Cases', icon: <HourglassEmpty />, path: '/admin/pending-cases' }
  ];

  return (
    <GradientBox>
      <Sidebar variant="permanent">
        
        {/* ✅ Admin Icon - Pushed Down */}
        <Box sx={{ textAlign: 'center', mt: '80px' }}>  
          <Avatar
            sx={{ 
              width: 80, 
              height: 80, 
              margin: '0 auto', 
              background: 'linear-gradient(135deg, #6a11cb, #2575fc)' 
            }}
          >
            <AdminPanelSettings sx={{ fontSize: 50, color: '#fff' }} />  
          </Avatar>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#333' }}>
            Admin Panel
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <SidebarItem
                selected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(index);
                  navigate(item.path);
                }}
              >
                <ListItemIcon sx={{ color: selectedIndex === index ? '#fff' : '#1976d2' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </SidebarItem>
            </ListItem>
          ))}
        </List>

        {/* ✅ Logout Button with Text */}
        <Box sx={{ textAlign: 'center', mt: 'auto', pb: 2 }}>
          <LogoutBtn onClick={handleLogout}>
            <Logout fontSize="medium" />
            Logout
          </LogoutBtn>
        </Box>
      </Sidebar>

      <Content>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 4 }}>
          Dashboard Overview
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              flex: '1 1 300px',
              background: 'linear-gradient(135deg, #6a11cb, #2575fc)',  
              color: '#fff',
              borderRadius: '16px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              padding: '30px',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
              }
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Total Items
            </Typography>
            <Typography variant="h2">00</Typography>
          </Box>

          <Box
            sx={{
              flex: '1 1 300px',
              background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',  
              color: '#fff',
              borderRadius: '16px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              padding: '30px',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
              }
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Resolved Cases
            </Typography>
            <Typography variant="h2">00</Typography>
          </Box>

          <Box
            sx={{
              flex: '1 1 300px',
              background: 'linear-gradient(135deg, #43cea2, #185a9d)',  
              color: '#fff',
              borderRadius: '16px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              padding: '30px',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
              }
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Pending Cases
            </Typography>
            <Typography variant="h2">00</Typography>
          </Box>
        </Box>
      </Content>
    </GradientBox>
  );
};

export default AdminDashboard;
