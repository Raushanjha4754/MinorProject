import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const InventoryForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    item: item?.item || '',
    category: item?.category || 'Staple',
    quantity: item?.quantity || 0,
    unit: item?.unit || 'kg',
    threshold: item?.threshold || 0,
    lastUpdated: item?.lastUpdated || new Date().toISOString().split('T')[0]
  });

  const categories = ['Staple', 'Vegetable', 'Meat', 'Dairy', 'Spice', 'Other'];
  const units = ['kg', 'g', 'L', 'ml', 'pieces', 'packets'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      quantity: Number(formData.quantity),
      threshold: Number(formData.threshold)
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            name="item"
            label="Item Name"
            fullWidth
            value={formData.item}
            onChange={handleChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              label="Category"
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={formData.quantity}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">{formData.unit}</InputAdornment>,
            }}
            required
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select
              name="unit"
              value={formData.unit}
              label="Unit"
              onChange={handleChange}
              required
            >
              {units.map(unit => (
                <MenuItem key={unit} value={unit}>{unit}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            name="threshold"
            label="Threshold"
            type="number"
            fullWidth
            value={formData.threshold}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">{formData.unit}</InputAdornment>,
            }}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            name="lastUpdated"
            label="Last Updated"
            type="date"
            fullWidth
            value={formData.lastUpdated}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {item ? 'Update' : 'Add'} Inventory Item
        </Button>
      </Box>
    </Box>
  );
};

export default InventoryForm;