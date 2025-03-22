import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Signup = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>📝 Signup Page</Typography>
        <Typography variant="h5">User signup form will be added here.</Typography>
      </Box>
    </Container>
  );
};

export default Signup;
