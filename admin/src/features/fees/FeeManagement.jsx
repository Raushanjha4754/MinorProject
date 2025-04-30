// admin-panel/src/features/fees/FeeManagement.jsx
import { 
    Box, 
    Typography, 
    Tabs, 
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel
  } from '@mui/material';
  import { 
    Add, 
    Download,
    Print
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  const FeeManagement = () => {
    const [tabValue, setTabValue] = useState(0);
    const [filterTerm, setFilterTerm] = useState('all');
  
    // Sample data
    const feeRecords = [
      { id: 1, student: 'Raushan Kumar Jha', type: 'Hostel Fee', amount: 5000, dueDate: '2023-11-15', status: 'Pending' },
      { id: 2, student: 'Bhashkar Kumar', type: 'Mess Fee', amount: 3000, dueDate: '2023-11-10', status: 'Paid' },
    ];
  
    return (
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h4">Fee Management</Typography>
          <Box display="flex" gap={2}>
            <Button variant="outlined" startIcon={<Download />}>
              Export
            </Button>
            <Button variant="contained" startIcon={<Add />}>
              Generate Fees
            </Button>
          </Box>
        </Box>
  
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="All Fees" />
            <Tab label="Pending" />
            <Tab label="Paid" />
          </Tabs>
        </Box>
  
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Filter</InputLabel>
            <Select
              value={filterTerm}
              label="Filter"
              onChange={(e) => setFilterTerm(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="hostel">Hostel Fees</MenuItem>
              <MenuItem value="mess">Mess Fees</MenuItem>
            </Select>
          </FormControl>
        </Box>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Fee Type</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.student}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell align="right">₹{record.amount.toLocaleString()}</TableCell>
                  <TableCell>{record.dueDate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={record.status} 
                      color={record.status === 'Paid' ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" startIcon={<Print />}>
                      Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default FeeManagement;