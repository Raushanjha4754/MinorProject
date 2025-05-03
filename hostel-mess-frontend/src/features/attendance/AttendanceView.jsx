import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import { 
  Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, 
  Button, Modal, TextField, FormControl, 
  InputLabel, Select, MenuItem, Chip, CircularProgress
} from '@mui/material';
import { EventAvailable, EventBusy, Send } from '@mui/icons-material';

const AttendanceView = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [leaveRequest, setLeaveRequest] = useState({
    date: '',
    reason: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [attendanceRes, summaryRes] = await Promise.all([
          api.getMyAttendance(),
          api.getAttendanceSummary()
        ]);
        setAttendance(attendanceRes.data.attendance);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error('Failed to fetch attendance data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmitLeave = async () => {
    try {
      await api.applyForLeave(leaveRequest);
      const res = await api.getMyAttendance();
      setAttendance(res.data.attendance);
      setOpenModal(false);
      setLeaveRequest({ date: '', reason: '' });
    } catch (err) {
      console.error('Failed to submit leave:', err);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 3 }}>
      {/* Summary Card */}
      {summary && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Current Month Summary
          </Typography>
          <Box display="flex" gap={3}>
            <Box>
              <Typography>Present: {summary.present}</Typography>
              <Typography>Absent: {summary.absent}</Typography>
              <Typography>Leave: {summary.leave}</Typography>
            </Box>
            <Box>
              <Typography>Working Days: {summary.workingDays}</Typography>
              <Typography>
                Attendance: <Chip label={`${summary.percentage}%`} color="primary" />
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Leave Application Button */}
      <Button 
        variant="contained" 
        startIcon={<EventBusy />}
        onClick={() => setOpenModal(true)}
        sx={{ mb: 3 }}
      >
        Apply for Leave
      </Button>

      {/* Attendance Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip 
                    label={record.status} 
                    color={
                      record.status === 'present' ? 'success' : 
                      record.status === 'leave' ? 'warning' : 'error'
                    } 
                  />
                  {record.status === 'leave' && record.leaveReason && (
                    <Typography variant="caption"> ({record.leaveReason})</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Leave Application Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1
        }}>
          <Typography variant="h6" gutterBottom>
            Apply for Leave
          </Typography>
          <TextField
            fullWidth
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={leaveRequest.date}
            onChange={(e) => setLeaveRequest({...leaveRequest, date: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason"
            value={leaveRequest.reason}
            onChange={(e) => setLeaveRequest({...leaveRequest, reason: e.target.value})}
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            endIcon={<Send />}
            onClick={handleSubmitLeave}
            disabled={!leaveRequest.date || !leaveRequest.reason}
          >
            Submit Leave Request
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AttendanceView;