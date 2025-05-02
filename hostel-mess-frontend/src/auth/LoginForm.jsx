
// src/auth/LoginForm.jsx

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../api/index';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Avatar, 
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
  Fade
} from '@mui/material';
import { 
  Lock as LockIcon, 
  Visibility, 
  VisibilityOff,
  Person as StudentIcon,
  AdminPanelSettings as AdminIcon,
  Badge as EmployeeIdIcon,
  ConfirmationNumber as RollNumberIcon
} from '@mui/icons-material';
import hostelImage from '../assets/mega-hostel-boys.jpg';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: '', // Will be employeeId or rollNumber based on role
    password: '',
    showPassword: false,
    role: 'student' // 'student' or 'admin'
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || (formData.role === 'admin' ? '/admin/dashboard' : '/');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      role: newValue,
      identifier: '', // Clear identifier when switching roles
      password: ''   // Clear password when switching roles
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add validation
      if (!formData.identifier || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
  
      await login(
        formData.identifier,
        formData.password,
        formData.role
      );
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      console.error('Form submission error:', {
        error: err,
        formData
      });
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
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hostelImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      p: { xs: 2, md: 0 }
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <Fade in timeout={800}>
          <Paper elevation={10} sx={{ 
            p: 4, 
            width: '100%', 
            maxWidth: 500,
            borderRadius: 4,
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 3
            }}>
              <Avatar sx={{ 
                bgcolor: formData.role === 'admin' ? 'secondary.main' : 'primary.main',
                mb: 2,
                width: 60,
                height: 60
              }}>
                {formData.role === 'admin' ? <AdminIcon fontSize="large" /> : <StudentIcon fontSize="large" />}
              </Avatar>
              <Typography variant="h4" component="h1" sx={{ 
                fontWeight: 700,
                textAlign: 'center',
                color: 'primary.main'
              }}>
                {formData.role === 'admin' ? 'Admin Portal' : 'Student Portal'}
              </Typography>
              <Typography variant="body1" sx={{ 
                textAlign: 'center',
                color: 'text.secondary',
                mt: 1
              }}>
                Sign in to access your account
              </Typography>
            </Box>

            <Tabs 
              value={formData.role} 
              onChange={handleRoleChange}
              variant="fullWidth"
              sx={{ 
                mb: 3,
                '& .MuiTabs-indicator': {
                  height: 3
                }
              }}
            >
              <Tab 
                value="student" 
                label="Student" 
                icon={<StudentIcon />} 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                value="admin" 
                label="Admin" 
                icon={<AdminIcon />} 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
            </Tabs>

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
                id="identifier"
                label={formData.role === 'admin' ? 'Employee ID' : 'Roll Number'}
                name="identifier"
                autoComplete={formData.role === 'admin' ? 'username' : 'off'}
                autoFocus
                value={formData.identifier}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {formData.role === 'admin' ? 
                        <EmployeeIdIcon color="action" /> : 
                        <RollNumberIcon color="action" />
                      }
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                  mt: 3
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  bgcolor: formData.role === 'admin' ? 'secondary.main' : 'primary.main',
                  '&:hover': {
                    bgcolor: formData.role === 'admin' ? 'secondary.dark' : 'primary.dark',
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
};

export default LoginForm;