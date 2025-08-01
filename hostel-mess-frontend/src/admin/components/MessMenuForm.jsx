import { 
    Grid, TextField, FormControl, 
    InputLabel, Select, MenuItem, 
    Button, Box, Typography, 
    Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow,
    IconButton, Paper
  } from '@mui/material';
  import { useFormik } from 'formik';
  import * as yup from 'yup';
  import { DatePicker } from '@mui/x-date-pickers';
  import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
  
  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];
  
  const validationSchema = yup.object({
    weekStartDate: yup.date().required('Start date is required'),
    weekEndDate: yup.date().required('End date is required'),
    menuItems: yup.array().of(
      yup.object().shape({
        day: yup.string().required('Day is required'),
        breakfast: yup.string().required('Breakfast is required'),
        lunch: yup.string().required('Lunch is required'),
        snacks: yup.string().required('Snacks are required'),
        dinner: yup.string().required('Dinner is required'),
        specialNote: yup.string()
      })
    ).min(1, 'At least one day is required')
  });
  
  const MessMenuForm = ({ menu, onSubmit, onCancel }) => {
    const formik = useFormik({
      initialValues: {
        weekStartDate: menu?.weekStartDate || new Date(),
        weekEndDate: menu?.weekEndDate || new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        menuItems: menu?.menuItems || daysOfWeek.map(day => ({
          day: day.value,
          breakfast: '',
          lunch: '',
          snacks: '',
          dinner: '',
          specialNote: ''
        }))
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        onSubmit(values);
      },
    });
  
    const handleAddDay = () => {
      formik.setFieldValue('menuItems', [
        ...formik.values.menuItems,
        { day: '', breakfast: '', lunch: '', snacks: '', dinner: '', specialNote: '' }
      ]);
    };
  
    const handleRemoveDay = (index) => {
      const newItems = [...formik.values.menuItems];
      newItems.splice(index, 1);
      formik.setFieldValue('menuItems', newItems);
    };
  
    const handleDayChange = (index, field, value) => {
      const newItems = [...formik.values.menuItems];
      newItems[index] = { ...newItems[index], [field]: value };
      formik.setFieldValue('menuItems', newItems);
    };
  
    return (
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Week Start Date"
              value={formik.values.weekStartDate}
              onChange={(date) => {
                formik.setFieldValue('weekStartDate', date);
                // Auto-set end date to 6 days after start date
                if (date) {
                  const endDate = new Date(date);
                  endDate.setDate(endDate.getDate() + 6);
                  formik.setFieldValue('weekEndDate', endDate);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={formik.touched.weekStartDate && Boolean(formik.errors.weekStartDate)}
                  helperText={formik.touched.weekStartDate && formik.errors.weekStartDate}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Week End Date"
              value={formik.values.weekEndDate}
              onChange={(date) => formik.setFieldValue('weekEndDate', date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={formik.touched.weekEndDate && Boolean(formik.errors.weekEndDate)}
                  helperText={formik.touched.weekEndDate && formik.errors.weekEndDate}
                />
              )}
            />
          </Grid>
        </Grid>
  
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Daily Menu Items
        </Typography>
  
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Breakfast</TableCell>
                <TableCell>Lunch</TableCell>
                <TableCell>Snacks</TableCell>
                <TableCell>Dinner</TableCell>
                <TableCell>Special Note</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formik.values.menuItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <InputLabel>Day</InputLabel>
                      <Select
                        value={item.day}
                        onChange={(e) => handleDayChange(index, 'day', e.target.value)}
                        label="Day"
                        error={formik.touched.menuItems?.[index]?.day && 
                          Boolean(formik.errors.menuItems?.[index]?.day)}
                      >
                        {daysOfWeek.map(day => (
                          <MenuItem 
                            key={day.value} 
                            value={day.value}
                            disabled={formik.values.menuItems.some((i, idx) => 
                              idx !== index && i.day === day.value)}
                          >
                            {day.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      value={item.breakfast}
                      onChange={(e) => handleDayChange(index, 'breakfast', e.target.value)}
                      error={formik.touched.menuItems?.[index]?.breakfast && 
                        Boolean(formik.errors.menuItems?.[index]?.breakfast)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      value={item.lunch}
                      onChange={(e) => handleDayChange(index, 'lunch', e.target.value)}
                      error={formik.touched.menuItems?.[index]?.lunch && 
                        Boolean(formik.errors.menuItems?.[index]?.lunch)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      value={item.snacks}
                      onChange={(e) => handleDayChange(index, 'snacks', e.target.value)}
                      error={formik.touched.menuItems?.[index]?.snacks && 
                        Boolean(formik.errors.menuItems?.[index]?.snacks)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      value={item.dinner}
                      onChange={(e) => handleDayChange(index, 'dinner', e.target.value)}
                      error={formik.touched.menuItems?.[index]?.dinner && 
                        Boolean(formik.errors.menuItems?.[index]?.dinner)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      value={item.specialNote}
                      onChange={(e) => handleDayChange(index, 'specialNote', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleRemoveDay(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddDay}
          sx={{ mb: 3 }}
        >
          Add Day
        </Button>
  
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {menu ? 'Update Menu' : 'Create Menu'}
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default MessMenuForm;