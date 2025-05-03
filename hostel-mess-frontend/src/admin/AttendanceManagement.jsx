import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from './api/attendanceApi';
import { 
  Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, 
  Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Chip, CircularProgress, TextField,
  FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';
import { Add, Edit, Delete, Check, Close } from '@mui/icons-material';

const AttendanceManagement = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const [filter, setFilter] = useState({
    student: '',
    status: '',
    date: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [attendanceRes, studentsRes] = await Promise.all([
          api.admin.getAllAttendance(filter),
          api.admin.getAllStudents()
        ]);
        setAttendance(attendanceRes.data.attendance);
        setStudents(studentsRes.data.students);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  const handleSubmitAttendance = async (data) => {
    try {
      if (currentAttendance) {
        await api.admin.updateAttendance(currentAttendance._id, data);
      } else {
        await api.admin.markAttendance(data);
      }
      const res = await api.admin.getAllAttendance(filter);
      setAttendance(res.data.attendance);
      setOpenForm(false);
      setCurrentAttendance(null);
    } catch (err) {
      console.error('Failed to submit attendance:', err);
    }
  };

  const handleApproveLeave = async (status) => {
    try {
      await api.admin.approveLeave(currentAttendance._id, { status });
      const res = await api.admin.getAllAttendance(filter);
      setAttendance(res.data.attendance);
      setOpenApproveDialog(false);
      setCurrentAttendance(null);
    } catch (err) {
      console.error('Failed to approve/reject leave:', err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Management
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Student</InputLabel>
            <Select
              value={filter.student}
              onChange={(e) => setFilter({...filter, student: e.target.value})}
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
              value={filter.status}
              onChange={(e) => setFilter({...filter, status: e.target.value})}
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
          <TextField
            fullWidth
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filter.date}
            onChange={(e) => setFilter({...filter, date: e.target.value})}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => {
          setCurrentAttendance(null);
          setOpenForm(true);
        }}
        sx={{ mb: 3 }}
      >
        Mark Attendance
      </Button>

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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>
                    {record.student?.name} ({record.student?.rollNumber})
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
                    />
                    {record.status === 'leave' && (
                      <Chip 
                        label={record.leaveStatus} 
                        color={
                          record.leaveStatus === 'approved' ? 'success' : 
                          record.leaveStatus === 'rejected' ? 'error' : 'default'
                        } 
                        sx={{ ml: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {record.status === 'leave' && record.leaveStatus === 'pending' && (
                      <>
                        <Button 
                          size="small" 
                          startIcon={<Check />}
                          onClick={() => {
                            setCurrentAttendance(record);
                            setOpenApproveDialog(true);
                          }}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="small" 
                          startIcon={<Close />}
                          onClick={() => handleApproveLeave('rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button 
                      size="small" 
                      startIcon={<Edit />}
                      onClick={() => {
                        setCurrentAttendance(record);
                        setOpenForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<Delete />}
                      color="error"
                      onClick={async () => {
                        await api.admin.deleteAttendance(record._id);
                        const res = await api.admin.getAllAttendance(filter);
                        setAttendance(res.data.attendance);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>
          {currentAttendance ? 'Edit Attendance' : 'Mark Attendance'}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Student</InputLabel>
            <Select
              value={currentAttendance?.student?._id || ''}
              onChange={(e) => setCurrentAttendance({
                ...currentAttendance,
                student: students.find(s => s._id === e.target.value)
              })}
              label="Student"
            >
              {students.map(student => (
                <MenuItem key={student._id} value={student._id}>
                  {student.name} ({student.rollNumber})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentAttendance?.date?.split('T')[0] || ''}
            onChange={(e) => setCurrentAttendance({
              ...currentAttendance,
              date: e.target.value
            })}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={currentAttendance?.status || ''}
              onChange={(e) => setCurrentAttendance({
                ...currentAttendance,
                status: e.target.value
              })}
              label="Status"
            >
              <MenuItem value="present">Present</MenuItem>
              <MenuItem value="absent">Absent</MenuItem>
              <MenuItem value="leave">Leave</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button 
            onClick={() => handleSubmitAttendance({
              student: currentAttendance.student._id,
              date: currentAttendance.date,
              status: currentAttendance.status
            })}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openApproveDialog} onClose={() => setOpenApproveDialog(false)}>
        <DialogTitle>Leave Application</DialogTitle>
        <DialogContent>
          <Typography>
            Student: {currentAttendance?.student?.name} ({currentAttendance?.student?.rollNumber})
          </Typography>
          <Typography>
            Date: {currentAttendance && new Date(currentAttendance.date).toLocaleDateString()}
          </Typography>
          <Typography>
            Reason: {currentAttendance?.leaveReason}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApproveDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => handleApproveLeave('approved')}
            variant="contained"
            color="success"
          >
            Approve
          </Button>
          <Button 
            onClick={() => handleApproveLeave('rejected')}
            variant="contained"
            color="error"
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AttendanceManagement;