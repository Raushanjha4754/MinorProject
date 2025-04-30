import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { Lock } from '@mui/icons-material';

const LoginForm = () => {
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Box textAlign="center" mb={3}>
        <Lock sx={{ fontSize: 50, color: 'primary.main' }} />
        <Typography variant="h4">Student Login</Typography>
      </Box>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        variant="outlined"
      />
      <Button 
        fullWidth 
        variant="contained" 
        size="large" 
        sx={{ mt: 3 }}
      >
        Sign In
      </Button>
    </Paper>
  );
};

export default LoginForm;