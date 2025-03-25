import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, IconButton, InputAdornment, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle, Cancel } from '@mui/icons-material';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast';  // ✅ Import react-hot-toast

const Signup = () => {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
  const handleAcceptTermsChange = (event) => setAcceptTerms(event.target.checked);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const uppercaseValid = /[A-Z]/.test(password);
    const numberValid = /\d/.test(password);
    const specialCharValid = /[!@#$%^&*]/.test(password);

    return {
      lengthValid,
      uppercaseValid,
      numberValid,
      specialCharValid,
      isValid: lengthValid && uppercaseValid && numberValid && specialCharValid
    };
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email address');
      return;
    }

    const { isValid } = validatePassword(password);
    if (!isValid) {
      toast.error('Password does not meet the required criteria');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      toast.error('You must accept the terms and conditions');
      return;
    }

    toast.success('Signup successful! 🎉');

    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAcceptTerms(false);
  };

  const passwordValidation = validatePassword(password);

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
                Create Your Account 🚀
              </Typography>

              <form onSubmit={handleSignup}>
                <TextField
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  InputProps={{
                    style: {
                      borderRadius: '24px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                />

                <TextField
                  label="Email Address"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      borderRadius: '24px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                />

                <TextField
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleConfirmPassword}>
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      borderRadius: '24px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                />

                <List dense>
                  {[ 
                    { label: 'At least 8 characters', valid: passwordValidation.lengthValid },
                    { label: 'At least 1 uppercase letter', valid: passwordValidation.uppercaseValid },
                    { label: 'At least 1 numeric digit', valid: passwordValidation.numberValid },
                    { label: 'At least 1 special character', valid: passwordValidation.specialCharValid }
                  ].map((criteria, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {criteria.valid ? <CheckCircle sx={{ color: 'green' }} /> : <Cancel sx={{ color: 'red' }} />}
                      </ListItemIcon>
                      <ListItemText primary={criteria.label} />
                    </ListItem>
                  ))}
                </List>

                <FormControlLabel
                  control={<Checkbox checked={acceptTerms} onChange={handleAcceptTermsChange} />}
                  label="I accept the terms and conditions"
                />

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5, borderRadius: '30px' }}>
                  Sign Up
                </Button>
              </form>
            </Paper>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Signup;
