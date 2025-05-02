import React, { useState } from 'react';
import { 
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Alert,
  useTheme
} from '@mui/material';
import {
  Lock as PasswordIcon,
  Notifications as NotificationsIcon,
  Palette as ThemeIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    systemNotifications: false,
    darkMode: false
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (formData.newPassword && formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // In a real app, you would call your API here
      console.log('Settings submitted:', formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Settings
      </Typography>
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Account Security */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PasswordIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Account Security</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword}
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  margin="normal"
                />
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    startIcon={<SaveIcon />}
                    disabled={!formData.newPassword}
                  >
                    Update Password
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Preferences */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Notification Preferences</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    name="emailNotifications"
                    color="primary"
                  />
                }
                label="Email Notifications"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.systemNotifications}
                    onChange={handleChange}
                    name="systemNotifications"
                    color="primary"
                  />
                }
                label="System Notifications"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Appearance */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ThemeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Appearance</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.darkMode}
                    onChange={handleChange}
                    name="darkMode"
                    color="primary"
                  />
                }
                label="Dark Mode"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;