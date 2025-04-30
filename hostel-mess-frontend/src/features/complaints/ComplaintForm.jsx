// src/features/complaints/ComplaintForm.jsx
import { useState } from 'react';
import { 
  Box, Typography, TextField, Select, MenuItem, 
  Button, Paper, Grid, FormControl, InputLabel 
} from '@mui/material';
import { ReportProblem, Send } from '@mui/icons-material';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState({
    title: '',
    category: 'Hostel',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!complaint.title) newErrors.title = 'Title is required';
    if (!complaint.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`Complaint submitted!\n${JSON.stringify(complaint, null, 2)}`);
      setComplaint({ title: '', category: 'Hostel', description: '' });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', my: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <ReportProblem color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h4">Submit Complaint</Typography>
      </Box>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              value={complaint.title}
              onChange={(e) => setComplaint({...complaint, title: e.target.value})}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={complaint.category}
                label="Category"
                onChange={(e) => setComplaint({...complaint, category: e.target.value})}
              >
                <MenuItem value="Hostel">Hostel Issue</MenuItem>
                <MenuItem value="Mess">Mess Complaint</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={complaint.description}
              onChange={(e) => setComplaint({...complaint, description: e.target.value})}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
        </Grid>
        
        <Button 
          type="submit" 
          variant="contained" 
          endIcon={<Send />}
          sx={{ mt: 3, px: 4, py: 1.5 }}
          size="large"
        >
          Submit Complaint
        </Button>
      </form>
    </Paper>
  );
};

export default ComplaintForm;