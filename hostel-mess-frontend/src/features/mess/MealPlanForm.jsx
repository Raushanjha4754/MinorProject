import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Divider,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const MealPlanForm = ({ plan, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: plan?.date || '',
    breakfast: plan?.breakfast || '',
    lunch: plan?.lunch || '',
    dinner: plan?.dinner || '',
    specialDiet: plan?.specialDiet || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DatePicker
            label="Date"
            value={formData.date ? new Date(formData.date) : null}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth required />}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Breakfast
          </Typography>
          <TextField
            name="breakfast"
            label="Breakfast Menu"
            fullWidth
            multiline
            rows={3}
            value={formData.breakfast}
            onChange={handleChange}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Lunch
          </Typography>
          <TextField
            name="lunch"
            label="Lunch Menu"
            fullWidth
            multiline
            rows={3}
            value={formData.lunch}
            onChange={handleChange}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Dinner
          </Typography>
          <TextField
            name="dinner"
            label="Dinner Menu"
            fullWidth
            multiline
            rows={3}
            value={formData.dinner}
            onChange={handleChange}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Special Diet Requirements
          </Typography>
          <TextField
            name="specialDiet"
            label="Special Diet Options"
            fullWidth
            multiline
            rows={2}
            value={formData.specialDiet}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save Meal Plan
        </Button>
      </Box>
    </Box>
  );
};

export default MealPlanForm;