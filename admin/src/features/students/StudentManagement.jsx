// admin-panel/src/features/students/StudentManagement.jsx
import { 
    Box, 
    Typography, 
    Button, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    Chip,
    TextField,
    InputAdornment
  } from '@mui/material';
  import { 
    Add, 
    Search, 
    FilterList,
    Edit,
    Delete
  } from '@mui/icons-material';
  
  const StudentManagement = () => {
    // Sample data - replace with API call
    const students = [
      { id: 1, name: 'Raushan Kumar Jha', room: 'A-101', status: 'Active', feesDue: 5000 },
      { id: 2, name: 'Bhashkar Kumar', room: 'A-102', status: 'Active', feesDue: 0 },
      { id: 3, name: 'Monib Kumar Singha', room: 'B-201', status: 'Inactive', feesDue: 3000 }
    ];
  
    return (
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h4">Student Management</Typography>
          <Button variant="contained" startIcon={<Add />}>
            Add Student
          </Button>
        </Box>
  
        <Box display="flex" gap={2} mb={3}>
          <TextField
            placeholder="Search students..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: 400 }}
          />
          <Button variant="outlined" startIcon={<FilterList />}>
            Filters
          </Button>
        </Box>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Fees Due</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.room}</TableCell>
                  <TableCell>
                    <Chip 
                      label={student.status} 
                      color={student.status === 'Active' ? 'success' : 'error'} 
                    />
                  </TableCell>
                  <TableCell>
                    ₹{student.feesDue.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Add pagination here */}
      </Box>
    );
  };
  
  export default StudentManagement;