import { useState } from 'react';
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
  TablePagination,
  Chip,
  Avatar
} from '@mui/material';
import { 
  Add, 
  Search, 
  Edit, 
  Delete,
  FilterList,
  Person 
} from '@mui/icons-material';
import StudentForm from './StudentForm';

const StudentList = () => {
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'Raushan Kumar Jha', 
      avatar: '',
      room: 'A-101', 
      contact: '9876543210', 
      status: 'Active',
      joinDate: '2022-05-15'
    },
    { 
      id: 2, 
      name: 'Bhashkar Kumar', 
      avatar: '',
      room: 'A-102', 
      contact: '8765432109', 
      status: 'Active',
      joinDate: '2022-06-20'
    },
    { 
      id: 3, 
      name: 'Monib Kumar Singha', 
      avatar: '',
      room: 'B-201', 
      contact: '7654321098', 
      status: 'Active',
      joinDate: '2022-07-10'
    },
    { 
      id: 4, 
      name: 'Akhilesh Chauhan', 
      avatar: '',
      room: 'B-202', 
      contact: '6543210987', 
      status: 'Inactive',
      joinDate: '2022-08-05'
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openForm, setOpenForm] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
      >
        <Typography variant="h4">Student Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => setOpenForm(true)}
        >
          Add Student
        </Button>
      </Box>

      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
        gap={2}
      >
        <TextField
          label="Search Students"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: <Search />,
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
        >
          Filters
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'background.default' }}>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar>
                        <Person />
                      </Avatar>
                      <Typography>{student.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{student.room}</TableCell>
                  <TableCell>{student.contact}</TableCell>
                  <TableCell>{student.joinDate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={student.status} 
                      color={student.status === 'Active' ? 'success' : 'error'}
                      size="small"
                    />
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <StudentForm open={openForm} handleClose={() => setOpenForm(false)} />
    </Box>
  );
};

export default StudentList;