// src/admin/components/FeeForm
import { 
    Grid, TextField, FormControl, 
    InputLabel, Select, MenuItem, 
    Button, Box, Typography,
    RadioGroup, FormControlLabel, Radio
  } from '@mui/material';
  import { useFormik } from 'formik';
  import * as yup from 'yup';
  import { DatePicker } from '@mui/x-date-pickers';
  
  const validationSchema = yup.object({
    student: yup.string().required('Student is required'),
    type: yup.string().required('Fee type is required'),
    amount: yup.number().required('Amount is required').positive('Amount must be positive'),
    dueDate: yup.date().required('Due date is required'),
    status: yup.string().required('Status is required'),
    paymentDate: yup.date().when('status', {
      is: 'paid',
      then: yup.date().required('Payment date is required when status is paid')
    }),
    transactionId: yup.string().when('status', {
      is: 'paid',
      then: yup.string().required('Transaction ID is required when status is paid')
    })
  });
  
  const FeeForm = ({ fee, students, onSubmit, onCancel }) => {
    const formik = useFormik({
      initialValues: {
        student: fee?.student?._id || '',
        type: fee?.type || 'hostel',
        amount: fee?.amount || '',
        dueDate: fee?.dueDate || new Date(),
        status: fee?.status || 'pending',
        paymentDate: fee?.paymentDate || null,
        transactionId: fee?.transactionId || ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        onSubmit(values);
      },
    });
  
    return (
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Student</InputLabel>
              <Select
                name="student"
                value={formik.values.student}
                onChange={formik.handleChange}
                error={formik.touched.student && Boolean(formik.errors.student)}
                label="Student"
              >
                {students.map(student => (
                  <MenuItem key={student._id} value={student._id}>
                    {student.name} ({student.rollNumber})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Fee Type</InputLabel>
              <Select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                label="Fee Type"
              >
                <MenuItem value="hostel">Hostel Fee</MenuItem>
                <MenuItem value="mess">Mess Fee</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Amount (₹)"
              name="amount"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Due Date"
              value={formik.values.dueDate}
              onChange={(date) => formik.setFieldValue('dueDate', date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                  helperText={formik.touched.dueDate && formik.errors.dueDate}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="subtitle1" gutterBottom>
                Payment Status
              </Typography>
              <RadioGroup
                row
                name="status"
                value={formik.values.status}
                onChange={(e) => {
                  formik.handleChange(e);
                  // Reset payment fields if status changes to pending
                  if (e.target.value === 'pending') {
                    formik.setFieldValue('paymentDate', null);
                    formik.setFieldValue('transactionId', '');
                  }
                }}
              >
                <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                <FormControlLabel value="paid" control={<Radio />} label="Paid" />
                <FormControlLabel value="overdue" control={<Radio />} label="Overdue" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {formik.values.status === 'paid' && (
            <>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Payment Date"
                  value={formik.values.paymentDate}
                  onChange={(date) => formik.setFieldValue('paymentDate', date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.paymentDate && Boolean(formik.errors.paymentDate)}
                      helperText={formik.touched.paymentDate && formik.errors.paymentDate}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Transaction ID"
                  name="transactionId"
                  value={formik.values.transactionId}
                  onChange={formik.handleChange}
                  error={formik.touched.transactionId && Boolean(formik.errors.transactionId)}
                  helperText={formik.touched.transactionId && formik.errors.transactionId}
                />
              </Grid>
            </>
          )}
        </Grid>
  
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {fee ? 'Update Fee' : 'Create Fee'}
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default FeeForm;