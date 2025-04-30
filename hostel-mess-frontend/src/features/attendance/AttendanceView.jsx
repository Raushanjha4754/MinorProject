import { 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material';
import { CalendarToday, EventAvailable, EventBusy, Send } from '@mui/icons-material';
import { useState } from 'react';

const AttendanceView = () => {
  const [openModal, setOpenModal] = useState(false);
  const [leaveRequest, setLeaveRequest] = useState({
    date: '',
    type: 'Casual',
    reason: ''
  });

  // Sample attendance data
  const attendanceData = [
    { month: 'January', workingDays: 22, present: 20, absent: 2, percentage: 90.9 },
    { month: 'February', workingDays: 20, present: 18, absent: 2, percentage: 90.0 },
    { month: 'March', workingDays: 23, present: 22, absent: 1, percentage: 95.7 },
    { month: 'April', workingDays: 21, present: 19, absent: 2, percentage: 90.5 },
    { month: 'May', workingDays: 22, present: 21, absent: 1, percentage: 95.5 },
  ];

  const handleLeaveSubmit = () => {
    console.log('Leave request submitted:', leaveRequest);
    setOpenModal(false);
    setLeaveRequest({ date: '', type: 'Casual', reason: '' });
    // Add API call here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventAvailable /> My Attendance
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<EventBusy />}
          onClick={() => setOpenModal(true)}
        >
          Apply for Leave
        </Button>
      </Box>

      {/* Attendance Summary Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Month Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday color="primary" />
                <Typography>Working Days: 22</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventAvailable color="success" />
                <Typography>Present: 20</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventBusy color="error" />
                <Typography>Absent: 2</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 1 }}>Overall Attendance:</Typography>
            <Chip 
              label="90.9%" 
              color="success" 
              variant="outlined"
              size="small"
            />
          </Box>
        </CardContent>
      </Card>

      {/* Monthly Attendance Table */}
      <Typography variant="h6" gutterBottom>
        Monthly Records
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell align="center">Working Days</TableCell>
              <TableCell align="center">Present</TableCell>
              <TableCell align="center">Absent</TableCell>
              <TableCell align="center">Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((row) => (
              <TableRow key={row.month}>
                <TableCell>{row.month}</TableCell>
                <TableCell align="center">{row.workingDays}</TableCell>
                <TableCell align="center">{row.present}</TableCell>
                <TableCell align="center">{row.absent}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={`${row.percentage}%`} 
                    color={
                      row.percentage > 90 ? 'success' : 
                      row.percentage > 75 ? 'warning' : 'error'
                    } 
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Leave Application Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="leave-application-modal"
      >
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
          <Divider sx={{ mb: 2 }} />
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={leaveRequest.date}
                  onChange={(e) => setLeaveRequest({...leaveRequest, date: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Leave Type</InputLabel>
                  <Select
                    value={leaveRequest.type}
                    label="Leave Type"
                    onChange={(e) => setLeaveRequest({...leaveRequest, type: e.target.value})}
                  >
                    <MenuItem value="Casual">Casual Leave</MenuItem>
                    <MenuItem value="Medical">Medical Leave</MenuItem>
                    <MenuItem value="Emergency">Emergency Leave</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Reason"
                  value={leaveRequest.reason}
                  onChange={(e) => setLeaveRequest({...leaveRequest, reason: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button 
                  fullWidth
                  variant="contained" 
                  endIcon={<Send />}
                  onClick={handleLeaveSubmit}
                >
                  Submit Leave Request
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default AttendanceView;