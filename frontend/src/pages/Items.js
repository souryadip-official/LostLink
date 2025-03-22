import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Items = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>📋 Items Page</Typography>
        <Typography variant="h5">This is where the list of registered items will be displayed.</Typography>
      </Box>
    </Container>
  );
};

export default Items;
