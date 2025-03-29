import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Link, IconButton, InputAdornment, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    setError(null);
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
  
    try {
      const response = await fetch('/api/users/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
  
      const token = data.token;
      const user = data.user;
  
      sessionStorage.setItem('token', token); // ✅ Always store in sessionStorage (no "Remember Me")
      sessionStorage.setItem('user', JSON.stringify(user));
      
      toast.success(`Login successful!`);
      navigate('/');
  
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f0f0f0, #d4eaff)',
            padding: { xs: '20px', sm: '40px', md: '60px', lg: '80px' }
          }}
        >
          <Box
            sx={{
              width: { xs: '90%', sm: '80%', md: '70%', lg: '50%' },
              maxWidth: '600px',
              mt: { xs: '20px', sm: '30px', md: '50px' }
            }}
          >
            <Paper
              elevation={12}
              sx={{
                padding: 5,
                borderRadius: '20px',
                backdropFilter: 'blur(15px)',
                background: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.6)'
                }
              }}
            >
              <Typography
                variant="h4"
                align="center"
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 3, 
                  color: '#1976d2',
                  fontFamily: '"Poppins", sans-serif',
                  letterSpacing: '1px'
                }}
              >
                Welcome Back 👋
              </Typography>

              {error && (
                <Typography color="error" align="center" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <TextField
                label="Email Address"
                fullWidth
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #1976d2, #00c6ff)',
                  color: '#fff',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  transition: '0.3s',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00c6ff, #1976d2)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                Sign In
              </Button>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Link
                  href="/signup"
                  sx={{
                    color: '#1976d2',
                    textDecoration: 'none',
                    transition: 'color 0.3s, transform 0.3s',
                    '&:hover': {
                      color: '#1565c0',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  Create an Account
                </Link>
                <br />
                <Link
                  href="/forgot-password"
                  sx={{
                    color: '#1976d2',
                    textDecoration: 'none',
                    transition: 'color 0.3s, transform 0.3s',
                    '&:hover': {
                      color: '#1565c0',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Login;
