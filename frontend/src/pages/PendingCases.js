import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, Container, Divider, CircularProgress, Box, Grid, Modal } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CheckCircleOutline } from '@mui/icons-material'; 

const TransparentContainer = styled(Container)(() => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '30px',  
  backdropFilter: 'blur(10px)', 
  position: 'relative',
  overflow: 'hidden',
  background: 'transparent',  
}));

const CardContainer = styled(Card)(() => ({
  width: '100%',
  maxWidth: '360px',  
  background: 'rgba(255, 255, 255, 0.85)', 
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px', 
  margin: '15px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease',
  backdropFilter: 'blur(5px)', 
  '&:hover': {
    transform: 'scale(1.05)', 
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.2)', 
    filter: 'brightness(1.05)', 
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

// Refined Typography for headings
const TitleTypography = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '3rem',
  color: '#1e88e5',  // Blue color for the heading
  marginBottom: '20px',
  textAlign: 'center',
  letterSpacing: '0.5px',
}));

// Modal Style for the full details popup
const FullDetailsModal = styled(Modal)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PendingCases = () => {
  const navigate = useNavigate();
  const [pendingCases, setPendingCases] = useState([]);
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

    const fetchPendingCases = async () => {
      try {
        const res = await axios.get('/api/claims/pending');
        setPendingCases(res.data);
      } catch (err) {
        console.error('Failed to fetch pending cases:', err);
        toast.error('Error fetching pending cases');
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    fetchPendingCases();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [navigate]);

  const handleResolve = async (claimId) => {
    try {
      const res = await axios.patch(`/api/claims/resolve/${claimId}`);
      console.log("Sending PATCH request for claim with ID:", claimId);
      if (res.status === 200) {
        toast.success('Claim resolved successfully!');
        setPendingCases(pendingCases.filter((claim) => claim._id !== claimId)); // Remove resolved claim from the list
      }
    } catch (err) {
      console.error('Error resolving claim:', err);
      toast.error('Failed to resolve claim');
    }
  };

  const handleReject = async (claimId) => {
    try {
      const res = await axios.delete(`/api/claims/${claimId}`);
      console.log("Sending PATCH request for claim rejection with ID:", claimId);
      if (res.status === 200) {
        toast.success('Claim rejected successfully!');
        setPendingCases(pendingCases.filter((claim) => claim._id !== claimId)); // Remove rejected claim from the list
      }
    } catch (err) {
      console.error('Error rejecting claim:', err);
      toast.error('Failed to reject claim');
    }
  };

  const handleOpenDetails = (claim) => {
    setSelectedClaim(claim);
    setOpen(true);
  };

  const handleCloseDetails = () => {
    setOpen(false);
    setSelectedClaim(null);
  };

  return (
    <TransparentContainer>
      <TitleTypography variant="h3">
        <CheckCircleOutline sx={{ marginRight: '10px', color: '#1e88e5' }} fontSize="large" />
        Pending Cases
      </TitleTypography>

      {loading ? (
        <Box sx={{ mt: 5 }}>
          <CircularProgress sx={{ color: '#fff' }} />
        </Box>
      ) : (
        <>
          {pendingCases.length === 0 ? (
            <Typography variant="h6" sx={{ mt: 3, textAlign: 'center', color: 'black', fontWeight: 'bold' }}>
              No pending cases found.
            </Typography>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {pendingCases.map((request) => (
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
                        <Button
                          variant="contained"
                          color="success"
                          sx={{
                            borderRadius: '20px',
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            textTransform: 'capitalize',
                            transition: '0.3s',
                            '&:hover': {
                              backgroundColor: 'rgba(56, 142, 60, 0.9)',
                            },
                          }}
                          onClick={() => handleResolve(request._id)}
                        >
                          Resolve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            borderRadius: '20px',
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            textTransform: 'capitalize',
                            transition: '0.3s',
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.9)',
                            },
                          }}
                          onClick={() => {
                            console.log(request._id);
                            handleReject(request._id)}}
                        >
                          Reject
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
      <FullDetailsModal
        open={open}
        onClose={handleCloseDetails}
        aria-labelledby="full-details-modal"
      >
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '16px',
          padding: '30px',
          width: '550px',
          boxShadow: 24,
          overflowY: 'auto',
          backdropFilter: 'blur(5px)', // Glassmorphism for modal
          border: '1px solid rgba(0, 0, 0, 0.1)',  // Subtle border
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
            </>
          )}
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #f2709c, #ff9472)',
              color: '#fff',
              borderRadius: '20px',
              width: '100%',
              padding: '12px 0',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(to right, #f2709c, #ff6e7f)',
              },
            }}
            onClick={handleCloseDetails}
          >
            Close
          </Button>
        </Box>
      </FullDetailsModal>

      {/* Back to Dashboard Button in the Footer */}
      <Box sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
        <StyledButton onClick={() => navigate('/admin/dashboard')}>
        Back to Dashboard
          </StyledButton>
      </Box>
    </TransparentContainer>
  );
};

export default PendingCases;
