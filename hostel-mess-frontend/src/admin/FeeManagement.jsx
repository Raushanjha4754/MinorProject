import { useState, useEffect } from 'react';
import { 
  Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, 
  Button, IconButton, Dialog, DialogTitle, 
  DialogContent, Chip, CircularProgress, Snackbar, Alert,
  TextField, FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Paid as PaidIcon
} from '@mui/icons-material';
import FeeForm from './components/FeeForm';
import feeApi from './api/feeApi';
import { useAuth } from '../context/AuthContext';
import studentApi from './api/studentApi';

const FeeManagement = () => {
  const { token } = useAuth();
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [currentFee, setCurrentFee] = useState(null);
  const [filter, setFilter] = useState({
    student: '',
    status: '',
    type: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const [feesData, studentsData] = await Promise.all([
        feeApi.getAllFees(token),
        studentApi.getAllStudents(token)
      ]);
      setFees(feesData.data.fees);
      setStudents(studentsData.data.students);
      setLoading(false);
    } catch (error) {
      showSnackbar('Failed to fetch data', 'error');
      setLoading(false);
    }
  };

  const handleOpenForm = (fee = null) => {
    setCurrentFee(fee);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentFee(null);
  };

  const handleSubmit = async (feeData) => {
    try {
      if (currentFee) {
        await feeApi.updateFee(currentFee._id, feeData, token);
        showSnackbar('Fee updated successfully', 'success');
      } else {
        await feeApi.createFee(feeData, token);
        showSnackbar('Fee created successfully', 'success');
      }
      fetchData();
      handleCloseForm();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (feeId) => {
    try {
      await feeApi.deleteFee(feeId, token);
      showSnackbar('Fee deleted successfully', 'success');
      fetchData();
    } catch (error) {
      showSnackbar('Failed to delete fee', 'error');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredFees = fees.filter(fee => {
    return (
      (filter.student === '' || fee.student._id === filter.student) &&
      (filter.status === '' || fee.status === filter.status) &&
      (filter.type === '' || fee.type === filter.type)
    );
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Fee Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Add Fee
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Student</InputLabel>
            <Select
              name="student"
              value={filter.student}
              onChange={handleFilterChange}
              label="Student"
            >
              <MenuItem value="">All Students</MenuItem>
              {students.map(student => (
                <MenuItem key={student._id} value={student._id}>
                  {student.name} ({student.rollNumber})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              label="Status"
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="overdue">Overdue</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
              label="Type"
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="hostel">Hostel Fee</MenuItem>
              <MenuItem value="mess">Mess Fee</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFees.map((fee) => (
                <TableRow key={fee._id}>
                  <TableCell>
                    {fee.student.name} ({fee.student.rollNumber})
                  </TableCell>
                  <TableCell>
                    {fee.type.charAt(0).toUpperCase() + fee.type.slice(1)}
                  </TableCell>
                  <TableCell align="right">₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(fee.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={fee.status} 
                      color={
                        fee.status === 'paid' ? 'success' : 
                        fee.status === 'overdue' ? 'error' : 'warning'
                      } 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenForm(fee)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(fee._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="md">
        <DialogTitle>
          {currentFee ? 'Edit Fee Record' : 'Add New Fee'}
        </DialogTitle>
        <DialogContent>
          <FeeForm 
            fee={currentFee} 
            students={students}
            onSubmit={handleSubmit} 
            onCancel={handleCloseForm} 
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeeManagement;