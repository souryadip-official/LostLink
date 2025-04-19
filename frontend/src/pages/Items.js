import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Chip, Tooltip, CircularProgress,
  Modal, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const claimModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  mt: 3,
  mb: 3,
  gap: 2,
};

const Items = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [editType, setEditType] = useState('');
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimData, setClaimData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem('user'))?.email;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [lostRes, foundRes] = await Promise.all([
          axios.get('/api/lost-items'),
          axios.get('/api/found-items'),
        ]);

        const lostData = Array.isArray(lostRes?.data) ? lostRes.data : [];
        const foundData = Array.isArray(foundRes?.data) ? foundRes.data : [];
        
        setLostItems(lostData);
        setFoundItems(foundData);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items. Please try again later.');
        setLostItems([]);
        setFoundItems([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
  }, []);

  const filterItems = (items) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleDelete = async (id, type) => {
    try {
      const url = `/api/${type === 'lost' ? 'lost-items' : 'found-items'}/${id}`;
      await axios.delete(url);
      if (type === 'lost') {
        setLostItems(prev => prev.filter(item => item._id !== id));
      } else {
        setFoundItems(prev => prev.filter(item => item._id !== id));
      }
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleEditOpen = (item, type) => {
    setEditData(item);
    setEditType(type);
    setEditModalOpen(true);
  };

  const handleClaimOpen = (item) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      toast.error("Login/Signup to continue!");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      setClaimData(item);
      setClaimModalOpen(true);
      setClaimDescription('');
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const url = `/api/${editType === 'lost' ? 'lost-items' : 'found-items'}/${editData._id}`;
      await axios.put(url, editData);
      if (editType === 'lost') {
        setLostItems(prev => prev.map(item => item._id === editData._id ? editData : item));
      } else {
        setFoundItems(prev => prev.map(item => item._id === editData._id ? editData : item));
      }
      setEditModalOpen(false);
      toast.success('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
    }
  };

  const handleClaimSubmit = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      console.log("Session user:", user);
  
      if (!user) {
        toast.error("Please login to claim items");
        return;
      }
  
      const claimDataToSend = {
        itemId: claimData._id,
        itemName: claimData.itemName,
        itemType: claimData.itemType, // dynamic type: 'lost' or 'found'
        itemDescription: claimData.description,
        itemLocation: claimData.location,
        claimedBy: {
          userId: user._id || user.id,
          email: user.email,
          phone: user.phone || '', // fallback to empty if undefined
          department: user.department || user.branch || '', // handles both keys
          rollNumber: user.rollNumber
        },
        registeredBy: {
          email: claimData.gmail,
          phone: claimData.phone,
          department: claimData.department,
          rollNumber: claimData.rollNumber
        },
        claimDescription: claimDescription,
        status: 'pending'
      };
  
      await axios.post('/api/claims', claimDataToSend);
      toast.success('Claim request submitted to admin!');
      setClaimModalOpen(false);
      setClaimDescription('');
    } catch (err) {
      console.error('Error submitting claim:', err);
      toast.error('Failed to submit claim');
    }
  };  
  const renderCard = (item, type) => {
    const isOwner = item.gmail === currentUser;

    return (
      <Grid item xs={12} sm={6} md={4} key={item._id}>
        <Card
          sx={{
            borderRadius: 10,
            border: '1px solid rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            },
            backgroundColor: '#ffffff',
            padding: 2,
            position: 'relative',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            height: 'auto',
            minHeight: 280,
            marginBottom: 1.25,
          }}
        >
          {item.imageUrl && (
            <CardMedia
              component="img"
              height="180"
              image={item.imageUrl}
              alt={item.itemName}
              sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            />
          )}
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold" color="text.primary">{item.itemName}</Typography>
              <Chip
                label={type === 'lost' ? 'Lost' : 'Found'}
                color={type === 'lost' ? 'error' : 'success'}
                icon={type === 'lost' ? <ReportProblemIcon /> : <BeenhereIcon />}
                sx={{ borderRadius: 16 }}
              />
            </Box>
            <Typography variant="body2" mt={1} color="text.secondary">{item.description}</Typography>
            <Typography variant="body2" color="text.primary"><strong>Location:</strong> {item.location}</Typography>
            <Typography variant="body2" color="text.primary"><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</Typography>
            <Typography variant="body2" color="text.primary"><strong>Reported by:</strong> {item.gmail}</Typography>
            <Typography variant="body2" color="text.primary"><strong>Phone:</strong> {item.phone}</Typography>
            <Typography variant="body2" color="text.primary"><strong>Dept:</strong> {item.department}</Typography>
            <Typography variant="body2" color="text.primary"><strong>Roll:</strong> {item.rollNumber}</Typography>

            <Box mt={2} display="flex" justifyContent="space-between">
              {type === 'found' && !isOwner && (
                <Button 
                  variant="outlined" 
                  sx={{
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #f4e3b4, #f4d1b5)',
                    color: '#333',
                    '&:hover': { background: 'linear-gradient(135deg, #f4d1b5, #f4e3b4)' },
                    minWidth: '80px',
                    padding: '8px 20px',
                    fontWeight: 'bold'
                  }}
                  startIcon={<SearchIcon />}
                  onClick={() => handleClaimOpen(item)}
                >
                  Claim
                </Button>
              )}
              {isOwner && (
                <Box>
                  <Tooltip title="Edit">
                    <Button
                      variant="contained"
                      sx={{
                        mr: 2,
                        background: 'linear-gradient(135deg, #d2f8dd, #baf2c6)',
                        color: '#333',
                        '&:hover': { background: 'linear-gradient(135deg, #baf2c6, #d2f8dd)' },
                        borderRadius: 4,
                        minWidth: '80px',
                        padding: '8px 20px',
                        fontWeight: 'bold'
                      }}
                      startIcon={<EditIcon />}
                      onClick={() => handleEditOpen(item, type)}
                    >
                      Edit
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #f6cfcf, #f4bcbc)',
                        color: '#333',
                        '&:hover': { background: 'linear-gradient(135deg, #f4bcbc, #f6cfcf)' },
                        borderRadius: 4,
                        minWidth: '80px',
                        padding: '8px 20px',
                        fontWeight: 'bold'
                      }}
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(item._id, type)}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
          <BeenhereIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'middle' }} />
          Lost & Found Items
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Browse all items reported as lost or found.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search items by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          maxWidth: 600,
          '& .MuiOutlinedInput-root': {
            borderRadius: 50,
            backgroundColor: 'background.paper',
            pr: '12px', // ensures space on the right for the button
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <Button
                onClick={() => setSearchTerm('')}
                size="small"
                variant="contained"
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2,
                  mr: 1, // slight left shift
                  background: 'linear-gradient(45deg, #f44336 30%, #e57373 90%)',
                  color: 'white',
                  boxShadow: 'none',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #d32f2f 30%, #ef5350 90%)',
                  },
                }}
              >
                Reset
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress color="secondary" thickness={4} size={60} />
        </Box>
      ) : error ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <Typography variant="h5" color="error">
            {error}
          </Typography>
        </Box>
      ) : lostItems.length === 0 && foundItems.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <Typography variant="h5" color="text.secondary">
            No items available at the moment.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filterItems(lostItems).map(item => renderCard(item, 'lost'))}
          {filterItems(foundItems).map(item => renderCard(item, 'found'))}
        </Grid>
      )}
      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
              xs: '90%',   // mobile
              sm: '80%',   // small tablets
              md: '60%',   // medium devices
              lg: '40%',   // desktops
            },
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: { xs: 2, sm: 3 }, // padding adjusts with screen
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Edit {editType === 'lost' ? 'Lost' : 'Found'} Item
          </Typography>

          <Box mt={2}>
            {[
              { name: 'itemName', label: 'Item Name' },
              { name: 'description', label: 'Description' },
              { name: 'location', label: 'Location' },
              { name: 'phone', label: 'Phone' },
              { name: 'gmail', label: 'Gmail', disabled: true },
              { name: 'department', label: 'Department' },
              { name: 'rollNumber', label: 'Roll Number' },
            ].map(({ name, label, disabled }) => (
              <TextField
                key={name}
                fullWidth
                name={name}
                label={label}
                variant="outlined"
                value={editData[name] || ''}
                onChange={handleEditChange}
                disabled={disabled}
                sx={{ mb: 2 }}
              />
            ))}

            <Button
              variant="contained"
              color="primary"
              onClick={handleEditSubmit}
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 100,
                width: '100%',
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Claim Modal */}
      <Modal open={claimModalOpen} onClose={() => setClaimModalOpen(false)}>
      <Box
        sx={{
          ...claimModalStyle,
          width: {
            xs: '85%', // small devices
            sm: '75%',
            md: '50%',
            lg: '40%',
            xl: '35%',
          },
          p: {
            xs: 3,
            sm: 4,
            md: 5,
          },
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 4,
          bgcolor: 'background.paper',
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Claim Found Item
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          mb={2}
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
            wordWrap: 'break-word',
          }}
        >
          Are you sure you want to claim <strong>{claimData.itemName}</strong>?
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Proof of ownership/matching details"
          value={claimDescription}
          onChange={(e) => setClaimDescription(e.target.value)}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
          required
        />

        {/* Responsive and Updated Form */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{
              background: 'linear-gradient(135deg, #5cbe4b, #3b9f3f)',
              borderRadius: '50px',
              px: 3,
              '&:hover': {
                background: 'linear-gradient(135deg, #3b9f3f, #5cbe4b)',
              },
            }}
            onClick={handleClaimSubmit}
            disabled={!claimDescription}
          >
            Submit Claim Request
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{
              borderRadius: '50px',
              border: '2px solid #f44336',
              px: 3,
              '&:hover': {
                borderColor: '#d32f2f',
              },
            }}
            onClick={() => {
              setClaimModalOpen(false);
              setClaimDescription(''); // Reset the description on cancel
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
    </Container>
  );
};

export default Items;