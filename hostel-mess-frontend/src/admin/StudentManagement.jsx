// src/admin/StudentManagement
import { useState, useEffect } from 'react';
import { 
  Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, 
  Button, IconButton, Dialog, DialogTitle, 
  DialogContent, Chip, CircularProgress, Snackbar, Alert, Avatar
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon
} from '@mui/icons-material';
import StudentForm from './components/StudentForm';
import studentApi from './api/studentApi';
import { useAuth } from '../context/AuthContext';

const StudentManagement = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const fetchStudents = async () => {
    try {
      const data = await studentApi.getAllStudents(token);
      setStudents(data.data.students);
      setLoading(false);
    } catch (error) {
      showSnackbar('Failed to fetch students', 'error');
      setLoading(false);
    }
  };

  const handleOpenForm = (student = null) => {
    setCurrentStudent(student);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentStudent(null);
  };

  const handleSubmit = async (studentData) => {
    try {
      if (currentStudent) {
        await studentApi.updateStudent(currentStudent._id, studentData, token);
        showSnackbar('Student updated successfully', 'success');
      } else {
        await studentApi.createStudent(studentData, token);
        showSnackbar('Student created successfully', 'success');
      }
      fetchStudents();
      handleCloseForm();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await studentApi.deleteStudent(studentId, token);
      showSnackbar('Student deleted successfully', 'success');
      fetchStudents();
    } catch (error) {
      showSnackbar('Failed to delete student', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Student Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Add Student
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Roll No.</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Hostel</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar 
                        src={student.profileImage || '/default-avatar.jpg'} 
                        sx={{ width: 32, height: 32 }}
                      />
                      {student.name}
                    </Box>
                  </TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.hostel?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={student.isActive ? 'Active' : 'Inactive'} 
                      color={student.isActive ? 'success' : 'error'} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenForm(student)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(student._id)}>
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
          {currentStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <StudentForm 
            student={currentStudent} 
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

export default StudentManagement;