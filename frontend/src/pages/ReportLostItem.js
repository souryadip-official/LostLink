// src/pages/ReportLostItem.js
import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReportLostItem = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    date: '',
    gmail: JSON.parse(sessionStorage.getItem('user') || '{}')?.email || '',
    phone: '',
    department: JSON.parse(sessionStorage.getItem('user') || '{}')?.branch || '',
    rollNumber: JSON.parse(sessionStorage.getItem('user') || '{}')?.rollNumber || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/lost-items', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);

      toast.success("Lost item submitted successfully!");

      setFormData({
        itemName: '',
        description: '',
        location: '',
        date: '',
        gmail: '',
        phone: '',
        department: '',
        rollNumber: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("❌ Failed to submit lost item.");
    }
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      backgroundColor: 'rgba(255,255,255,0.8)',
      boxShadow: '0 3px 8px rgba(0,0,0,0.05)',
    },
    '& label': {
      fontWeight: 500,
    }
  };

  return (
    <Box
      sx={{
        mt: 8,
        px: 2,
        pb: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: '750px' }}
      >
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: '24px',
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255,255,255,0.75)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
            sx={{ color: '#333', mb: 3 }}
          >
            📢 Report Lost Item
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                required
                name="itemName"
                label="Item Name"
                value={formData.itemName}
                onChange={handleChange}
                sx={inputStyle}
              />
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                sx={inputStyle}
              />
              <TextField
                fullWidth
                required
                name="location"
                label="Lost Location"
                value={formData.location}
                onChange={handleChange}
                sx={inputStyle}
              />
              <TextField
                fullWidth
                required
                type="date"
                name="date"
                label="Date Lost"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
              <TextField
                fullWidth
                required
                type="email"
                name="gmail"
                label="Gmail Address"
                value={JSON.parse(sessionStorage.getItem('user'))?.email || ''}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
                sx={inputStyle}
                disabled
              />
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <TextField
                  fullWidth
                  required
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  sx={inputStyle}
                />
                <TextField
                  fullWidth
                  required
                  name="department"
                  label="Department"
                  value={JSON.parse(sessionStorage.getItem('user'))?.branch || ''}
                  InputProps={{ readOnly: true }}
                  disabled
                  onChange={handleChange}
                  sx={inputStyle}
                />
              </Box>
              <TextField
                fullWidth
                required
                name="rollNumber"
                label="College Roll Number"
                value={JSON.parse(sessionStorage.getItem('user'))?.rollNumber || ''}
                InputProps={{ readOnly: true }}
                disabled
                onChange={handleChange}
                sx={inputStyle}
              />

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 1,
                    borderRadius: '16px',
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    backgroundColor: '#66bb6a',
                    ':hover': {
                      backgroundColor: '#4caf50',
                    },
                  }}
                >
                  Submit Lost Item
                </Button>
              </motion.div>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ReportLostItem;
