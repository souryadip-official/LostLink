import React, { useEffect } from 'react';
import { Typography, Button, Card, CardContent, Container, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast from 'react-hot-toast';

const GradientContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, rgba(250, 255, 200, 0.6), rgba(220, 255, 220, 0.6))',
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '100px',
  paddingBottom: '50px',
}));

const CardContainer = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '900px',
  background: '#ffffff',
  color: '#333',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  margin: '20px 0',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: '20px',
  background: 'linear-gradient(135deg, #2196F3, #21CBF3)',
  color: '#fff',
  padding: '12px 30px',
  borderRadius: '30px',
  fontWeight: 'bold',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}));

const ResolvedCases = () => {
  const navigate = useNavigate();

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
    <GradientContainer>
      <IconButton onClick={() => navigate('/admin/dashboard')} sx={{ alignSelf: 'flex-start', color: '#555' }}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <Typography variant="h3" gutterBottom sx={{ marginBottom: '40px' }}>
        ✅ Resolved Cases
      </Typography>

      {[1, 2, 3].map((caseId) => (
        <CardContainer key={caseId}>
          <CardContent>
            <Typography variant="h5">Case {caseId}</Typography>
            <Typography variant="body1">Details about the resolved case...</Typography>
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" color="success">View</Button>
          </CardContent>
        </CardContainer>
      ))}

      <StyledButton onClick={() => navigate('/admin/dashboard')}>
        Back to Dashboard
      </StyledButton>
    </GradientContainer>
  );
};

export default ResolvedCases;
