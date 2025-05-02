// src/admin/components/AttendanceForm
import { 
    Grid, TextField, FormControl, 
    InputLabel, Select, MenuItem, 
    Button, Box, Typography
  } from '@mui/material';
  import { useFormik } from 'formik';
  import * as yup from 'yup';
  import { DatePicker } from '@mui/x-date-pickers';
  
  const validationSchema = yup.object({
    student: yup.string().required('Student is required'),
    date: yup.date().required('Date is required'),
    status: yup.string().required('Status is required'),
    leaveReason: yup.string().when('status', {
      is: 'leave',
      then: yup.string().required('Leave reason is required')
    }),
  });
  
  const AttendanceForm = ({ attendance, students, onSubmit, onCancel }) => {
    const formik = useFormik({
      initialValues: {
        student: attendance?.student?._id || '',
        date: attendance?.date || new Date(),
        status: attendance?.status || 'present',
        leaveReason: attendance?.leaveReason || '',
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
            <DatePicker
              label="Date"
              value={formik.values.date}
              onChange={(date) => formik.setFieldValue('date', date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  helperText={formik.touched.date && formik.errors.date}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                label="Status"
              >
                <MenuItem value="present">Present</MenuItem>
                <MenuItem value="absent">Absent</MenuItem>
                <MenuItem value="leave">Leave</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {formik.values.status === 'leave' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Leave Reason"
                name="leaveReason"
                value={formik.values.leaveReason}
                onChange={formik.handleChange}
                error={formik.touched.leaveReason && Boolean(formik.errors.leaveReason)}
                helperText={formik.touched.leaveReason && formik.errors.leaveReason}
              />
            </Grid>
          )}
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {attendance ? 'Update Attendance' : 'Mark Attendance'}
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default AttendanceForm;