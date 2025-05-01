import { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import api from '../../api/adminApi';

const UserCreate = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    email: '',
    password: '',
    role: 'student' // Default role for created users
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await api.createUser(formData);
      setSuccess('Student registered successfully!');
      setFormData({
        rollNumber: '',
        name: '',
        email: '',
        password: '',
        role: 'student'
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register student');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Register New Student
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Roll Number"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input 
          type="hidden" 
          name="role" 
          value="student" 
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Register Student
        </Button>
      </Box>
    </Paper>
  );
};

export default UserCreate;