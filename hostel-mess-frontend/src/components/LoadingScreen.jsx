// src/components/LoadingScreen.jsx
import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    minHeight: '100vh'
  }}>
    <CircularProgress />
  </Box>
);

export default LoadingScreen; 