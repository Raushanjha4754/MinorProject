import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import {
  Search,
  Person,
  FilterList,
  Add,
  CheckCircle,
  Close,
  CalendarToday,
  Download,
  Print,
  ArrowBack,
  ArrowForward
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { InputAdornment } from '@mui/material';

const Attendance = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMarkAttendance, setOpenMarkAttendance] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [filterRoom, setFilterRoom] = useState('all');
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth());
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());

  // Sample data
  const [students, setStudents] = useState([
    { id: 1, name: 'Raushan Kumar Jha', avatar: '', room: 'A-101' },
    { id: 2, name: 'Bhashkar Kumar', avatar: '', room: 'A-102' },
    { id: 3, name: 'Monib Kumar Singha', avatar: '', room: 'B-201' },
    { id: 4, name: 'Akhilesh Chauhan', avatar: '', room: 'B-202' },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      date: '2023-06-01',
      records: [
        { studentId: 1, status: 'present' },
        { studentId: 2, status: 'present' },
        { studentId: 3, status: 'absent' },
        { studentId: 4, status: 'present' }
      ]
    },
    {
      id: 2,
      date: '2023-06-02',
      records: [
        { studentId: 1, status: 'present' },
        { studentId: 2, status: 'absent' },
        { studentId: 3, status: 'present' },
        { studentId: 4, status: 'present' }
      ]
    },
    // More records...
  ]);

  // Calculate summary data
  const totalStudents = students.length;
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceRecords.find(record => record.date === today)?.records || [];
  const presentToday = todayAttendance.filter(record => record.status === 'present').length;
  const absentToday = todayAttendance.filter(record => record.status === 'absent').length;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenMarkAttendance = () => {
    // Initialize attendance status for each student
    const initialStatus = {};
    students.forEach(student => {
      const existingRecord = todayAttendance.find(r => r.studentId === student.id);
      initialStatus[student.id] = existingRecord ? existingRecord.status : 'present';
    });
    setAttendanceStatus(initialStatus);
    setOpenMarkAttendance(true);
  };

  const handleCloseMarkAttendance = () => {
    setOpenMarkAttendance(false);
  };

  const handleSaveAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if record for today already exists
    const existingRecordIndex = attendanceRecords.findIndex(record => record.date === today);
    
    const newRecords = students.map(student => ({
      studentId: student.id,
      status: attendanceStatus[student.id] || 'present'
    }));
    
    if (existingRecordIndex >= 0) {
      // Update existing record
      const updatedRecords = [...attendanceRecords];
      updatedRecords[existingRecordIndex] = {
        ...updatedRecords[existingRecordIndex],
        records: newRecords
      };
      setAttendanceRecords(updatedRecords);
    } else {
      // Add new record
      const newId = Math.max(...attendanceRecords.map(r => r.id), 0) + 1;
      setAttendanceRecords([
        ...attendanceRecords,
        {
          id: newId,
          date: today,
          records: newRecords
        }
      ]);
    }
    
    setOpenMarkAttendance(false);
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  const getStudentRoom = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.room : 'Unknown';
  };

  const getStatusColor = (status) => {
    return status === 'present' ? 'success' : 'error';
  };

  const getStatusIcon = (status) => {
    return status === 'present' ? <CheckCircle /> : <Close />;
  };

  const filteredRecords = attendanceRecords.filter(record => {
    // Filter by month and year
    const recordDate = new Date(record.date);
    if (recordDate.getMonth() !== filterMonth || recordDate.getFullYear() !== filterYear) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      return record.records.some(r => 
        getStudentName(r.studentId).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return true;
  });

  const filteredStudents = students.filter(student => {
    if (filterRoom !== 'all' && student.room !== filterRoom) {
      return false;
    }
    return true;
  });

  // Get unique rooms for filter
  const rooms = [...new Set(students.map(student => student.room))];

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Attendance Management</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<Download />}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenMarkAttendance}
          >
            Mark Attendance
          </Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                  <Typography variant="h6">{totalStudents}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'success.light', mr: 2 }}>
                  <CheckCircle />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Present Today
                  </Typography>
                  <Typography variant="h6">{presentToday}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'error.light', mr: 2 }}>
                  <Close />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Absent Today
                  </Typography>
                  <Typography variant="h6">{absentToday}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: 350 }}
        />
        <Box display="flex" gap={1}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Room</InputLabel>
            <Select
              value={filterRoom}
              label="Room"
              onChange={(e) => setFilterRoom(e.target.value)}
            >
              <MenuItem value="all">All Rooms</MenuItem>
              {rooms.map(room => (
                <MenuItem key={room} value={room}>{room}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={filterMonth}
              label="Month"
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i} value={i}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={filterYear}
              label="Year"
              onChange={(e) => setFilterYear(e.target.value)}
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return <MenuItem key={year} value={year}>{year}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<Print />}>
            Print
          </Button>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Daily View" />
          <Tab label="Monthly Summary" />
          <Tab label="Student Records" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                {filteredStudents.map(student => (
                  <TableCell key={student.id}>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                        <Person />
                      </Avatar>
                      {student.name}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  {filteredStudents.map(student => {
                    const status = record.records.find(r => r.studentId === student.id)?.status || 'absent';
                    return (
                      <TableCell key={student.id}>
                        <Chip
                          icon={getStatusIcon(status)}
                          label={status}
                          color={getStatusColor(status)}
                          size="small"
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Attendance Summary - {new Date(filterYear, filterMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell align="right">Present</TableCell>
                    <TableCell align="right">Absent</TableCell>
                    <TableCell align="right">Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.map(student => {
                    const studentRecords = filteredRecords.flatMap(record => 
                      record.records.filter(r => r.studentId === student.id)
                    );
                    const presentCount = studentRecords.filter(r => r.status === 'present').length;
                    const absentCount = studentRecords.filter(r => r.status === 'absent').length;
                    const totalDays = studentRecords.length;
                    const percentage = totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : 0;
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                              <Person />
                            </Avatar>
                            {student.name}
                          </Box>
                        </TableCell>
                        <TableCell align="right">{presentCount}</TableCell>
                        <TableCell align="right">{absentCount}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`${percentage}%`}
                            color={percentage >= 75 ? 'success' : percentage >= 50 ? 'warning' : 'error'}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Individual Student Records
            </Typography>
            {filteredStudents.map(student => {
              const studentRecords = filteredRecords.flatMap(record => 
                record.records.filter(r => r.studentId === student.id)
              );
              const presentCount = studentRecords.filter(r => r.status === 'present').length;
              const absentCount = studentRecords.filter(r => r.status === 'absent').length;
              
              return (
                <Box key={student.id} mb={3}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">{student.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Room: {student.room}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }} display="flex" gap={2}>
                      <Chip color="success" label={`Present: ${presentCount}`} />
                      <Chip color="error" label={`Absent: ${absentCount}`} />
                    </Box>
                  </Box>
                  <Divider />
                  <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                    {filteredRecords.map(record => {
                      const status = record.records.find(r => r.studentId === student.id)?.status || 'absent';
                      return (
                        <Chip
                          key={record.id}
                          icon={getStatusIcon(status)}
                          label={record.date}
                          color={getStatusColor(status)}
                          variant="outlined"
                        />
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Mark Attendance Dialog */}
      <Dialog open={openMarkAttendance} onClose={handleCloseMarkAttendance} fullWidth maxWidth="md">
        <DialogTitle>
          Mark Attendance - {new Date().toLocaleDateString()}
        </DialogTitle>
        <DialogContent>
          <FormGroup>
            {students.map(student => (
              <Box key={student.id} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">{student.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Room: {student.room}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={attendanceStatus[student.id] === 'present'}
                        onChange={(e) => handleStatusChange(student.id, e.target.checked ? 'present' : 'absent')}
                        color="primary"
                      />
                    }
                    label="Present"
                  />
                </Box>
              </Box>
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMarkAttendance}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveAttendance}>
            Save Attendance
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Attendance;