import { 
    TextField, Button, Box, Typography,
    FormControl, InputLabel, Select, MenuItem
  } from '@mui/material';
  import { useFormik } from 'formik';
  import * as yup from 'yup';
  
  const validationSchema = yup.object({
    status: yup.string().required('Resolution status is required'),
    response: yup.string().required('Response is required'),
  });
  
  const ComplaintResolutionForm = ({ complaint, onSubmit, onCancel }) => {
    const formik = useFormik({
      initialValues: {
        status: 'resolved',
        response: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        onSubmit(values);
      },
    });
  
    return (
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {complaint?.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {complaint?.description}
        </Typography>
        
        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
          <InputLabel>Resolution Status</InputLabel>
          <Select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            label="Resolution Status"
          >
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
  
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Response"
          name="response"
          value={formik.values.response}
          onChange={formik.handleChange}
          error={formik.touched.response && Boolean(formik.errors.response)}
          helperText={formik.touched.response && formik.errors.response}
          sx={{ mb: 2 }}
        />
  
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit Resolution
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default ComplaintResolutionForm;