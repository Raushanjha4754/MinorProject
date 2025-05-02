
// src/components/NotFound.jsx

import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Page Not Found
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};