import { useState, useEffect } from 'react';
import { 
  Grid, TextField, FormControl, 
  InputLabel, Select, MenuItem, 
  Button, Box, Typography, Avatar
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import hostelApi from '../api/hostelApi';
import { useAuth } from '../../context/AuthContext';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  rollNumber: yup.string().required('Roll number is required'),
  hostel: yup.string().required('Hostel is required'),
  roomNumber: yup.string().required('Room number is required'),
  contactNumber: yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number'),
  bloodGroup: yup.string(),
});

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const { token } = useAuth();
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: student?.name || '',
      email: student?.email || '',
      rollNumber: student?.rollNumber || '',
      hostel: student?.hostel?._id || '',
      roomNumber: student?.roomNumber || '',
      contactNumber: student?.contactNumber || '',
      bloodGroup: student?.bloodGroup || '',
      profileImage: student?.profileImage || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const data = await hostelApi.getAllHostels(token);
        setHostels(data.data.hostels);
      } catch (error) {
        console.error('Failed to fetch hostels', error);
      }
    };

    fetchHostels();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              src={formik.values.profileImage || '/default-avatar.jpg'}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Button variant="contained" component="label">
              Upload Photo
              <input 
                type="file" 
                hidden 
                accept="image/*" 
                onChange={handleImageChange} 
              />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Roll Number"
                name="rollNumber"
                value={formik.values.rollNumber}
                onChange={formik.handleChange}
                error={formik.touched.rollNumber && Boolean(formik.errors.rollNumber)}
                helperText={formik.touched.rollNumber && formik.errors.rollNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Hostel</InputLabel>
                <Select
                  name="hostel"
                  value={formik.values.hostel}
                  onChange={formik.handleChange}
                  error={formik.touched.hostel && Boolean(formik.errors.hostel)}
                  label="Hostel"
                >
                  {hostels.map((hostel) => (
                    <MenuItem key={hostel._id} value={hostel._id}>
                      {hostel.name} ({hostel.type})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room Number"
                name="roomNumber"
                value={formik.values.roomNumber}
                onChange={formik.handleChange}
                error={formik.touched.roomNumber && Boolean(formik.errors.roomNumber)}
                helperText={formik.touched.roomNumber && formik.errors.roomNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
                error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                helperText={formik.touched.contactNumber && formik.errors.contactNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Blood Group"
                name="bloodGroup"
                value={formik.values.bloodGroup}
                onChange={formik.handleChange}
                error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {student ? 'Update Student' : 'Add Student'}
        </Button>
      </Box>
    </Box>
  );
};

export default StudentForm;