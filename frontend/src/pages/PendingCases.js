import React, { useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PendingCases = () => {
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
        background: 'linear-gradient(135deg, #56ab2f, #a8e063)',  
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Typography variant="h3" gutterBottom>
        ⏳ Pending Cases
      </Typography>
      <Typography variant="h6">
        Track and manage all pending cases efficiently.
      </Typography>
    </Container>
  );
};

export default PendingCases;
