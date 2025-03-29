import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, IconButton, InputAdornment, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle, Cancel } from '@mui/icons-material';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [loading, setLoading] = useState(true);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [rollNumber, setRollNumber] = useState('');
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

  //const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !year || !branch || !section || !rollNumber || !password || !confirmPassword) {
        toast.error('Please fill in all fields');
        return;
    }

    if (!/^[A-C]$/.test(section)) {
        toast.error('Section must be A, B, or C');
        return;
    }

    if (!/^\d{7}$/.test(rollNumber)) {
        toast.error('Roll number must be exactly 7 digits');
        return;
    }

    try {
        const response = await axios.post('/api/users/signup', {
            fullName, 
            email,
            year,
            branch,
            section,
            rollNumber,
            password
        });

        const { token, user } = response.data;

        toast.success(response.data.message);

        // Store token in localStorage for persistence
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to homepage or dashboard
        window.location.href = '/';

    } catch (error) {
        console.error('Signup Error:', error.response?.data || error.message); 
        toast.error(error.response?.data?.message || 'Signup failed!');
    }
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
                {/* Rounded input fields */}
                {[
                  { label: "Full Name", value: fullName, setter: setFullName },
                  { label: "Email", value: email, setter: setEmail },
                  { label: "Year", value: year, setter: setYear },
                  { label: "Branch", value: branch, setter: setBranch },
                  { label: "Section", value: section, setter: setSection },
                  { label: "Roll Number", value: rollNumber, setter: setRollNumber }
                ].map((field, index) => (
                  <TextField
                    key={index}
                    label={field.label}
                    fullWidth
                    margin="normal"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    required
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '30px' } }}
                  />
                ))}

                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '30px' } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
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
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '30px' } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleConfirmPassword}>
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
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

                <FormControlLabel control={<Checkbox checked={acceptTerms} onChange={handleAcceptTermsChange} />} label="I accept the terms and conditions" />

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5, borderRadius: '30px' }}>Sign Up</Button>
              </form>
            </Paper>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Signup;
