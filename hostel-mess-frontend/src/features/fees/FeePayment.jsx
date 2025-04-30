// src/features/fees/FeePayment.jsx
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Paid } from '@mui/icons-material';

const FeePayment = () => {
  // Sample data - replace with API call
  const fees = [
    { id: 1, name: 'Hostel Fee', amount: 5000, dueDate: '2023-11-15', status: 'Pending' },
    { id: 2, name: 'Mess Fee', amount: 3000, dueDate: '2023-11-10', status: 'Paid' },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        <Paid sx={{ verticalAlign: 'middle', mr: 1 }} />
        My Fee Payments
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fee Type</TableCell>
              <TableCell align="right">Amount (₹)</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell>{fee.name}</TableCell>
                <TableCell align="right">{fee.amount}</TableCell>
                <TableCell>{fee.dueDate}</TableCell>
                <TableCell>
                  <Box 
                    component="span" 
                    sx={{ 
                      color: fee.status === 'Paid' ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}
                  >
                    {fee.status}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {fee.status === 'Pending' && (
                    <Button variant="contained" size="small">
                      Pay Now
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Total Due: ₹{fees.filter(f => f.status === 'Pending').reduce((sum, fee) => sum + fee.amount, 0)}
      </Typography>
    </Box>
  );
};

export default FeePayment;