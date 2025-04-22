import React, { useEffect, useState } from 'react';
import {
  Typography, Button, Card, CardContent, Container, Divider, Box, Grid, Modal
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CheckCircleOutline } from '@mui/icons-material'; 

const GradientContainer = styled(Container)(() => ({
  minHeight: '100vh',
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '50px',
  paddingBottom: '50px',
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'transparent', // Make the background transparent
}));

const CardContainer = styled(Card)(() => ({
  width: '100%',
  maxWidth: '500px', // Reduce the card size
  background: '#ffffff',
  color: '#333',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  borderRadius: '25px',
  margin: '15px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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
const TitleTypography = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '3rem',
  color: '#1e88e5',  // Blue color for the heading
  marginBottom: '20px',
  textAlign: 'center',
  letterSpacing: '0.5px',
}));

const ViewDetailsButton = styled(Button)(() => ({
  marginTop: '10px',
  background: '#1976d2',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '25px',
  fontWeight: 'bold',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  width: '100%',
}));

const ManageItems = () => {
  const navigate = useNavigate();
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 992) {
        localStorage.removeItem('adminToken');
        toast.error('Admin session ended due to smaller screen size.');
        navigate('/secure/admin/confidential');
      }
    };

    const fetchItems = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          axios.get('/api/lost-items'),
          axios.get('/api/found-items'),
        ]);
        setLostItems(lostRes.data || []);
        setFoundItems(foundRes.data || []);
      } catch (error) {
        toast.error('Failed to fetch items.');
        console.error(error);
      }
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    fetchItems();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [navigate]);

  const handleDelete = async (id, type) => {
    try {
      const url = `/api/${type === 'lost' ? 'lost-items' : 'found-items'}/${id}`;
      await axios.delete(url);
      if (type === 'lost') {
        setLostItems((prev) => prev.filter(item => item._id !== id));
      } else {
        setFoundItems((prev) => prev.filter(item => item._id !== id));
      }
      toast.success('Item deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete item');
      console.error(err);
    }
  };

  const renderItems = (items, type) => (
    items.map((item) => (
      <Grid item xs={12} sm={6} md={4} key={item._id}> {/* Ensure 3 items per row */}
        <CardContainer>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">{item.itemName}</Typography>
            <Typography variant="body2" gutterBottom>Description: {item.description}</Typography>
            <Typography variant="body2">Location: {item.location}</Typography>
            <Typography variant="body2">Gmail: {item.gmail}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
              {type === 'lost' ? 'Lost' : 'Found'}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <ViewDetailsButton
              variant="contained"
              onClick={() => {
                setSelectedItem(item);
                setOpenPopup(true);
              }}
            >
              View Full Details
            </ViewDetailsButton>
            <StyledButton
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(item._id, type)}
            >
              Delete
            </StyledButton>
          </CardContent>
        </CardContainer>
      </Grid>
    ))
  );

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedItem(null);
  };

  return (
    <GradientContainer>
      <TitleTypography variant="h3">
          <CheckCircleOutline sx={{ marginRight: '10px', color: '#1e88e5' }} fontSize="large" />
            Manage Items
      </TitleTypography>

      <Grid container spacing={2} justifyContent="center">
        {renderItems(lostItems, 'lost')}
        {renderItems(foundItems, 'found')}
      </Grid>

      <Modal open={openPopup} onClose={handleClosePopup}>
      <Box
        sx={{
          background: 'transparent', // Whitish translucent background with slight opacity
          backdropFilter: 'blur(15px)', // Proper blur effect
          padding: '30px',
          borderRadius: '25px', // Rounded corners
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '4px solid black',
          position: 'absolute', // Position the modal absolutely within the viewport
          top: '50%', // Vertically center the modal
          left: '50%', // Horizontally center the modal
          transform: 'translate(-50%, -50%)', // Offset by 50% to center the modal
          minWidth: '400px', // Min width
          maxWidth: '600px', // Max width to make it less wide
          zIndex: 10,
        }}
      >
        {/* Close Button */}
        <Button
          variant="outlined"
          color="error"
          onClick={handleClosePopup}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            borderRadius: '25px',
            padding: '8px 20px',
            fontWeight: 'bold',
            background: 'rgba(255, 0, 0, 0.7)',
            color: '#fff',
            '&:hover': {
              background: 'rgba(255, 0, 0, 0.9)',
            },
          }}
        >
          Close
        </Button>

        <Typography variant="h5" fontWeight="bold">
          {selectedItem?.itemName}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '20px' }}>
          <strong>Description:</strong> {selectedItem?.description}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          <strong>Location:</strong> {selectedItem?.location}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          <strong>Gmail:</strong> {selectedItem?.gmail}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          <strong>Department:</strong> {selectedItem?.department}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          <strong>Roll Number:</strong> {selectedItem?.rollNumber}
        </Typography>
      </Box>
    </Modal>

      {/* Back to Dashboard Button in the Footer */}
      <Box sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
        <StyledButton onClick={() => navigate('/admin/dashboard')}>
          Back to Dashboard
        </StyledButton>
      </Box>
    </GradientContainer>
  );
};

export default ManageItems;
