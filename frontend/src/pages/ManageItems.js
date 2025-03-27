import React, { useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ManageItems = () => {
  const navigate = useNavigate();

  // Automatically log out admin on small/medium screen sizes
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 992) {
        localStorage.removeItem('adminToken');
        toast.error('Admin session ended due to smaller screen size.');
        navigate('/secure/admin/confidential');
      }
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();  

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [navigate]);

  return (
    <Container
      sx={{
        minHeight: '100vh',
        pt: '80px',    
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',  
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Typography variant="h3" gutterBottom>
        📦 Manage Items
      </Typography>
      <Typography variant="h6">
        Here you can manage all the lost and found items efficiently.
      </Typography>
    </Container>
  );
};

export default ManageItems;
