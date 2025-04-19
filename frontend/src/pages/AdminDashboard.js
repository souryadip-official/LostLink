import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider, CircularProgress
} from '@mui/material';
import {
  Dashboard, Inventory, CheckCircle, HourglassEmpty, Logout
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const slideIn = keyframes`
  0% { transform: translateY(-30px); opacity: 0; }
  100% { transform: translateY(0px); opacity: 1; }
`;

const GradientBox = styled(Box)(() => ({
  display: 'flex',
  minHeight: '100vh',
  background: 'linear-gradient(to right, #eef2f3, #8e9eab)',
}));

const Sidebar = styled(Drawer)(() => ({
  width: 260,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 260,
    background: 'transparent',
    backdropFilter: 'blur(20px)',
    boxShadow: '10px 0 30px rgba(0,0,0,0.1)',
    borderRight: '1px solid rgba(255,255,255,0.3)',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Content = styled(Box)(() => ({
  flexGrow: 1,
  padding: '50px',
  background: 'linear-gradient(to right top, #f5f7fa, #c3cfe2)',
  transition: 'all 0.3s ease',
}));

const SidebarItem = styled(ListItemButton)(({ selected }) => ({
  transition: 'all 0.3s ease-in-out',
  borderRadius: '12px',
  margin: '10px',
  padding: '12px',
  background: selected ? 'linear-gradient(to right, #6a11cb, #2575fc)' : 'transparent',
  backdropFilter: 'blur(25px)',
  color: selected ? '#fff' : '#333',
  '&:hover': {
    background: 'linear-gradient(to right, #9D50BB, #6E48AA)',
    color: '#fff',
    transform: 'scale(1.04)',
  },
  '& svg': {
    color: selected ? '#fff' : '#6a11cb',
  }
}));

const StatCard = styled(Box)(({ bg }) => ({
  background: bg,
  borderRadius: '20px',
  padding: '30px',
  color: 'white',
  width: '30%',
  minWidth: '250px',
  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&:hover': {
    boxShadow: '0 12px 35px rgba(0,0,0,0.25)',
    transform: 'translateY(-5px)',
  },
}));

const AnimatedIcon = styled('div')({
  animation: `${floatAnimation} 2.5s ease-in-out infinite`,
});

const AnimatedWelcome = styled(Box)(() => ({
  background: 'transparent',
  padding: '20px 40px',
  borderRadius: '20px',
  backdropFilter: 'blur(20px)',
  animation: `${slideIn} 1s ease forwards`,
  textAlign: 'center',
  marginBottom: '20px',
}));

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pendingRes, resolvedRes, totalItemsRes] = await Promise.all([
          axios.get('/api/claims/pending'),
          axios.get('/api/claims/resolved'),
          axios.get('/api/lost-items'),
        ]);
        setPendingCount(pendingRes.data.length);
        setResolvedCount(resolvedRes.data.length);
        setTotalItemsCount(totalItemsRes.data.length);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load dashboard data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const chartData = [
    { name: 'Lost Items', value: totalItemsCount },
    { name: 'Pending', value: pendingCount },
    { name: 'Resolved', value: resolvedCount },
  ];

  if (loading) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'transparent'
      }}>
        <AnimatedWelcome>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Admin 🧑‍💻
          </Typography>
        </AnimatedWelcome>
        <CircularProgress size={50} thickness={4} sx={{ color: '#6a11cb' }} />
      </Box>
    );
  }

  return (
    <GradientBox>
      <Sidebar variant="permanent">
        <Typography
          variant="h6"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 2, color: '#333' }}
        >
          Admin Panel 🧑‍💻
        </Typography>
        <List>
          <ListItem disablePadding>
            <SidebarItem onClick={() => navigate('/admin/dashboard')}>
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboard Overview" />
            </SidebarItem>
          </ListItem>
          <ListItem disablePadding>
            <SidebarItem onClick={() => navigate('/admin/manage-items')}>
              <ListItemIcon><Inventory /></ListItemIcon>
              <ListItemText primary="Manage Items" />
            </SidebarItem>
          </ListItem>
          <ListItem disablePadding>
            <SidebarItem onClick={() => navigate('/admin/pending-cases')}>
              <ListItemIcon><HourglassEmpty /></ListItemIcon>
              <ListItemText primary={`Pending Cases (${pendingCount})`} />
            </SidebarItem>
          </ListItem>
          <ListItem disablePadding>
            <SidebarItem onClick={() => navigate('/admin/resolved-cases')}>
              <ListItemIcon><CheckCircle /></ListItemIcon>
              <ListItemText primary={`Resolved Cases (${resolvedCount})`} />
            </SidebarItem>
          </ListItem>
          <Divider sx={{ margin: '10px 0' }} />
          <ListItem disablePadding>
            <SidebarItem onClick={logout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </SidebarItem>
          </ListItem>
        </List>
      </Sidebar>

      <Content>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard Overview
        </Typography>

        <Box sx={{ display: 'flex', gap: '30px', marginTop: '40px', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <StatCard bg="linear-gradient(to right, #6a11cb, #2575fc)">
            <AnimatedIcon>
              <Dashboard fontSize="large" />
            </AnimatedIcon>
            <Typography variant="h6" mt={2}>Total Lost Items</Typography>
            <Typography variant="h3" fontWeight="bold">{totalItemsCount}</Typography>
          </StatCard>

          <StatCard bg="linear-gradient(to right, #ff7e5f, #feb47b)">
            <AnimatedIcon>
              <HourglassEmpty fontSize="large" />
            </AnimatedIcon>
            <Typography variant="h6" mt={2}>Pending Claims</Typography>
            <Typography variant="h3" fontWeight="bold">{pendingCount}</Typography>
          </StatCard>

          <StatCard bg="linear-gradient(to right, #32a852, #36d9a8)">
            <AnimatedIcon>
              <CheckCircle fontSize="large" />
            </AnimatedIcon>
            <Typography variant="h6" mt={2}>Resolved Claims</Typography>
            <Typography variant="h3" fontWeight="bold">{resolvedCount}</Typography>
          </StatCard>
        </Box>

        <Box mt={6}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Claims Summary</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#6a11cb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Content>
    </GradientBox>
  );
};

export default AdminDashboard;
