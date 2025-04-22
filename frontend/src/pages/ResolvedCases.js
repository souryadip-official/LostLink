import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, Container, Divider, CircularProgress, Box, Grid, Modal } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CheckCircleOutline } from '@mui/icons-material';

// Styled components
const GradientContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  background: 'transparent',
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start', // Align content to top
  paddingTop: '20px',
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
  },
}));

const StyledButton = styled(Button)(() => ({
  marginTop: '20px',
  background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
  color: '#fff',
  padding: '12px 30px',
  borderRadius: '30px',
  fontWeight: 'bold',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  width: '100%', // Make sure buttons take the full width
}));

const FullDetailsModal = styled(Modal)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ResolvedCases = () => {
  const navigate = useNavigate();
  const [resolvedCases, setResolvedCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 992) {
        localStorage.removeItem('adminToken');
        toast.error('Admin session ended due to smaller screen size.');
        navigate('/secure/admin/confidential');
      }
    };

    const fetchResolvedCases = async () => {
      try {
        const res = await axios.get('/api/claims/resolved');
        console.log('Resolved cases data:', res.data);
        if (Array.isArray(res.data)) {
          setResolvedCases(res.data);
        } else {
          toast.error('Resolved cases data is not in the expected format');
        }
      } catch (err) {
        console.error('Error fetching resolved cases:', err);
        toast.error('Failed to fetch resolved cases');
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    fetchResolvedCases();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [navigate]);

  const handleOpenDetails = (claim) => {
    setSelectedClaim(claim);
    setOpen(true);
  };

  const handleCloseDetails = () => {
    setOpen(false);
    setSelectedClaim(null);
  };

  return (
    <GradientContainer>
      {/* Resolved Cases Heading */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1e88e5', marginBottom: '30px' }}>
        <CheckCircleOutline sx={{ marginRight: '10px', color: '#1e88e5' }} fontSize="large" />
        Resolved Cases
      </Typography>

      {loading ? (
        <Box sx={{ mt: 5 }}>
          <CircularProgress sx={{ color: '#fff' }} />
        </Box>
      ) : (
        <>
          {resolvedCases.length === 0 ? (
            <Typography variant="h6" sx={{ mt: 3, textAlign: 'center', color: '#fff' }}>
              No resolved cases found.
            </Typography>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {resolvedCases.map((request) => (
                <Grid item key={request._id}>
                  <CardContainer>
                    <CardContent>
                      <Typography variant="h5" gutterBottom sx={{ color: '#1f1f1f' }}>
                        {request.itemName} - {request.itemType}
                      </Typography>
                      <Typography variant="body1" gutterBottom sx={{ color: '#3c3c3c' }}>
                        Claimed by: {request.claimedBy ? request.claimedBy.email : 'N/A'} ({request.claimedBy ? request.claimedBy.rollNumber : 'N/A'})
                      </Typography>
                      <Typography variant="body2" gutterBottom sx={{ color: '#5f5f5f' }}>
                        Description: {request.claimDescription}
                      </Typography>
                      <Divider sx={{ my: 2, borderColor: '#ccc' }} />
                      <Box display="flex" justifyContent="space-between">
                        <Button
                          variant="outlined"
                          color="info"
                          sx={{
                            borderRadius: '20px',
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            textTransform: 'capitalize',
                            transition: '0.3s',
                            '&:hover': {
                              backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            },
                          }}
                          onClick={() => handleOpenDetails(request)}
                        >
                          View Full Details
                        </Button>
                      </Box>
                    </CardContent>
                  </CardContainer>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Modal for full details */}
      <FullDetailsModal open={open} onClose={handleCloseDetails} aria-labelledby="full-details-modal">
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '16px',
          padding: '20px',
          width: '450px',  // Reduced size
          boxShadow: 24,
          overflowY: 'auto',
          backdropFilter: 'blur(5px)', // Glassmorphism for modal
          border: '1px solid rgba(0, 0, 0, 0.1)',  // Subtle border
          lineHeight: 1.4, // Reduced line-height
        }}>
          {selectedClaim && (
            <>
              <Typography variant="h5" sx={{
                marginBottom: '15px', fontWeight: '600', color: '#1e88e5', display: 'flex', alignItems: 'center'
              }}>
                <CheckCircleOutline sx={{ marginRight: '10px', color: '#1e88e5' }} />
                Claim Details
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px', color: '#444' }}>
                <strong>Claim ID:</strong> {selectedClaim._id}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px', color: '#444' }}>
                <strong>Claimed by:</strong> {selectedClaim.claimedBy ? selectedClaim.claimedBy.email : 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px', color: '#444' }}>
                <strong>Claim Description:</strong> {selectedClaim.claimDescription}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px', color: '#444' }}>
                <strong>Item Registered by:</strong> {selectedClaim.registeredBy ? selectedClaim.registeredBy.email : 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px', color: '#444' }}>
                <strong>Claim Date:</strong> {new Date(selectedClaim.createdAt).toLocaleString()}
              </Typography>
              <StyledButton onClick={handleCloseDetails} sx={{ display: 'block', margin: '0 auto' }}>
                Close
              </StyledButton>
            </>
          )}
        </Box>
      </FullDetailsModal>

      {/* Back to Dashboard Button in the Footer */}
      <Box sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
        <StyledButton onClick={() => navigate('/admin/dashboard')}>
          Back to Dashboard
        </StyledButton>
      </Box>
    </GradientContainer>
  );
};

export default ResolvedCases;
