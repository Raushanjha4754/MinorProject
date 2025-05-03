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
  EventAvailable as AttendanceIcon,
  Check as ApproveIcon,
  Close as RejectIcon
} from '@mui/icons-material';
import AttendanceForm from './components/AttendanceForm';
import attendanceApi from './api/attendanceApi';
import { useAuth } from '../context/AuthContext';
import studentApi from './api/studentApi';
import { DatePicker } from '@mui/x-date-pickers';

const AttendanceManagement = () => {
  const { token } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const [filter, setFilter] = useState({
    student: '',
    status: '',
    date: null
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
      const [attendanceData, studentsData] = await Promise.all([
        attendanceApi.getAllAttendance(token),
        studentApi.getAllStudents(token)
      ]);
      setAttendance(attendanceData.data.attendance);
      setStudents(studentsData.data.students);
      setLoading(false);
    } catch (error) {
      showSnackbar('Failed to fetch data', 'error');
      setLoading(false);
    }
  };

  const handleOpenForm = (record = null) => {
    setCurrentAttendance(record);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentAttendance(null);
  };

  const handleOpenApproveDialog = (record) => {
    setCurrentAttendance(record);
    setOpenApproveDialog(true);
  };

  const handleCloseApproveDialog = () => {
    setOpenApproveDialog(false);
    setCurrentAttendance(null);
  };

  const handleSubmit = async (attendanceData) => {
    try {
      if (currentAttendance) {
        await attendanceApi.updateAttendance(currentAttendance._id, attendanceData, token);
        showSnackbar('Attendance updated successfully', 'success');
      } else {
        await attendanceApi.markAttendance(attendanceData, token);
        showSnackbar('Attendance marked successfully', 'success');
      }
      fetchData();
      handleCloseForm();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleApproveReject = async (status) => {
    try {
      await attendanceApi.approveLeave(currentAttendance._id, { status }, token);
      showSnackbar(`Leave ${status} successfully`, 'success');
      fetchData();
      handleCloseApproveDialog();
    } catch (error) {
      showSnackbar(`Failed to ${status} leave`, 'error');
    }
  };

  const handleDelete = async (attendanceId) => {
    try {
      await attendanceApi.deleteAttendance(attendanceId, token);
      showSnackbar('Attendance record deleted successfully', 'success');
      fetchData();
    } catch (error) {
      showSnackbar('Failed to delete attendance record', 'error');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFilter(prev => ({ ...prev, date }));
  };

  const filteredAttendance = attendance.filter(record => {
    const matchesStudent = filter.student === '' || record.student._id === filter.student;
    const matchesStatus = filter.status === '' || record.status === filter.status;
    const matchesDate = !filter.date || 
      new Date(record.date).toDateString() === new Date(filter.date).toDateString();
    
    return matchesStudent && matchesStatus && matchesDate;
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
        <Typography variant="h4">Attendance Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Mark Attendance
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
              <MenuItem value="present">Present</MenuItem>
              <MenuItem value="absent">Absent</MenuItem>
              <MenuItem value="leave">Leave</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            label="Date"
            value={filter.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
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
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Leave Reason</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAttendance.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>
                    {record.student.name} ({record.student.rollNumber})
                  </TableCell>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={record.status} 
                      color={
                        record.status === 'present' ? 'success' : 
                        record.status === 'leave' ? 'warning' : 'error'
                      } 
                      size="small" 
                    />
                    {record.status === 'leave' && (
                      <Chip 
                        label={record.leaveStatus} 
                        color={
                          record.leaveStatus === 'approved' ? 'success' : 
                          record.leaveStatus === 'rejected' ? 'error' : 'default'
                        } 
                        size="small" 
                        sx={{ ml: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {record.leaveReason || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {record.status === 'leave' && record.leaveStatus === 'pending' && (
                      <>
                        <IconButton onClick={() => handleOpenApproveDialog(record)}>
                          <ApproveIcon color="success" />
                        </IconButton>
                        <IconButton onClick={() => handleApproveReject('rejected')}>
                          <RejectIcon color="error" />
                        </IconButton>
                      </>
                    )}
                    <IconButton onClick={() => handleOpenForm(record)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(record._id)}>
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
          {currentAttendance ? 'Edit Attendance' : 'Mark Attendance'}
        </DialogTitle>
        <DialogContent>
          <AttendanceForm 
            attendance={currentAttendance} 
            students={students}
            onSubmit={handleSubmit} 
            onCancel={handleCloseForm} 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openApproveDialog} onClose={handleCloseApproveDialog}>
        <DialogTitle>Leave Application</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Student: {currentAttendance?.student.name} ({currentAttendance?.student.rollNumber})
          </Typography>
          <Typography gutterBottom>
            Date: {currentAttendance && new Date(currentAttendance.date).toLocaleDateString()}
          </Typography>
          <Typography gutterBottom>
            Reason: {currentAttendance?.leaveReason}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<ApproveIcon />}
              onClick={() => handleApproveReject('approved')}
            >
              Approve
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              startIcon={<RejectIcon />}
              onClick={() => handleApproveReject('rejected')}
            >
              Reject
            </Button>
          </Box>
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

export default AttendanceManagement;