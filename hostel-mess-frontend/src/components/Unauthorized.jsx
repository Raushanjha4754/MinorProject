import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Unauthorized = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Access Denied
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
      >
        Return Home
      </Button>
    </Box>
  );
};