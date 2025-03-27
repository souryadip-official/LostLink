import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.05), rgba(0, 0, 0, 0.05))',
  color: '#333',
  textAlign: 'center',
  padding: '20px',
}));

const AdminForm = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '420px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)', 
  borderRadius: '16px',  
  padding: '40px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)', 
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '20px',
  background: '#e74c3c',  
  color: '#fff',
  fontWeight: 'bold',
  padding: '12px 0',
  borderRadius: '32px',  
  transition: 'background 0.3s, transform 0.3s',
  '&:hover': {
    background: '#c0392b',
    transform: 'scale(1.05)',
  }
}));

const RoundedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',  
    '& fieldset': { borderColor: '#aaa' },
    '&:hover fieldset': { borderColor: '#e74c3c' },  
    '&.Mui-focused fieldset': { borderColor: '#e74c3c' }
  },
  input: { color: '#fff' },
  label: { color: '#aaa' }
}));

const VerifyAdmin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toastShown = useRef(false);  
  const screenToastShown = useRef(false);  
  
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768 && !screenToastShown.current) {
        toast.error('Admin login is disabled on smaller screens. Please use a larger device.', { duration: 6000 });
        navigate('/');
        screenToastShown.current = true;  // to prevent double toast
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [navigate]);

  useEffect(() => {
    if (toastShown.current) return;  

    const token = localStorage.getItem('adminToken');
    const timestamp = localStorage.getItem('adminTokenTimestamp');

    if (token && timestamp) {
      const now = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - parseInt(timestamp) < twentyFourHours) {
        toast.success('You are already logged in!');
        navigate('/admin/dashboard');
        toastShown.current = true;   
      } else {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminTokenTimestamp');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        adminId,
        password
      });

      const { token } = response.data;

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminTokenTimestamp', new Date().getTime());

      toast.success('Access granted!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid credentials. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <AdminContainer>
      <AdminForm>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#f1c40f' }}>
          🛡️ Admin Verification
        </Typography>

        <Typography sx={{ mb: 4, fontSize: '18px', color: '#ecf0f1' }}>
          Only authorized personnel are allowed beyond this point. Proceed with caution.
        </Typography>

        <form onSubmit={handleSubmit}>
          <RoundedTextField
            label="Admin ID"
            variant="outlined"
            fullWidth
            required
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            sx={{ mb: 2 }}
          />

          <RoundedTextField
            label="Password"
            type={showPassword ? 'text' : 'password'}  
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? (
                      <VisibilityOff sx={{ color: '#27ae60' }} />  
                    ) : (
                      <Visibility sx={{ color: '#27ae60' }} />  
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <StyledButton type="submit" fullWidth disabled={loading}>
            {loading ? 'Hold on...' : 'Verify Admin'}
          </StyledButton>
        </form>
      </AdminForm>
    </AdminContainer>
  );
};

export default VerifyAdmin;
