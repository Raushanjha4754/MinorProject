import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../api/auth';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Avatar, 
  CircularProgress,
  Link,
  Grid,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { 
  Lock as LockIcon, 
  Visibility, 
  VisibilityOff
} from '@mui/icons-material';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',  // Changed from email to rollNumber
    password: '',
    showPassword: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Changed to pass rollNumber instead of email to API
      const { token, user } = await apiLogin(formData.rollNumber, formData.password);
      login(token, user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your roll number and password.');
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setFormData(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      p: 2
    }}>
      <Paper elevation={6} sx={{ 
        p: 4, 
        width: '100%', 
        maxWidth: 500,
        borderRadius: 4
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
            Student Portal Login
          </Typography>
          <Box sx={{ width: 40 }} /> {/* Spacer for alignment */}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="rollNumber"
            label="Roll Number"
            name="rollNumber"
            autoComplete="username"
            autoFocus
            value={formData.rollNumber}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography color="text.secondary">#</Typography>
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={formData.showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ 
              mt: 3, 
              mb: 2,
              py: 1.5,
              borderRadius: 2
            }}
            disabled={loading || !formData.rollNumber || !formData.password}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <LockIcon sx={{ mr: 1 }} />
                Sign In
              </>
            )}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link 
                href="/forgot-password" 
                variant="body2" 
                sx={{ cursor: 'pointer' }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ display: 'inline', mr: 1 }}>
                Don't have an account?
              </Typography>
              <Link 
                href="/register" 
                variant="body2" 
                sx={{ cursor: 'pointer' }}
              >
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;