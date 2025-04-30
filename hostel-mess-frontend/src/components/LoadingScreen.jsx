import { Box, CircularProgress } from '@mui/material';

export const LoadingScreen = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    p: 4
  }}>
    <CircularProgress />
  </Box>
);