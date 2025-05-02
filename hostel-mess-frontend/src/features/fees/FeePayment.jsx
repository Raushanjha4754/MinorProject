
// src/features/fees/feePayment.jsx
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from '@mui/material';
import { Paid, Payment } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeePayment = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample data - replace with API call
  const fees = [
    { id: 1, name: 'Hostel Fee', amount: 1200, dueDate: '2023-11-15', status: 'Pending' },
    { id: 2, name: 'Mess Fee', amount: 3000, dueDate: '2023-11-10', status: 'Paid' },
  ];

  const handlePayNow = (fee) => {
    setSelectedFee(fee);
    setOpenDialog(true);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOpenDialog(false);
      navigate('/payment-success', { 
        state: { 
          amount: selectedFee.amount,
          feeType: selectedFee.name
        } 
      });
    }, 1500);
  };

  const handleCancelPayment = () => {
    setOpenDialog(false);
    setSelectedFee(null);
  };

  const totalDue = fees.filter(f => f.status === 'Pending').reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Paid sx={{ mr: 1 }} />
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
                <TableCell align="right">{fee.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
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
                    <Button 
                      variant="contained" 
                      size="small"
                      startIcon={<Payment />}
                      onClick={() => handlePayNow(fee)}
                    >
                      Pay Now
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
        Total Due: ₹{totalDue.toLocaleString()}
      </Typography>

      {/* Payment Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelPayment}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to pay ₹{selectedFee?.amount.toLocaleString()} for {selectedFee?.name}.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }}>
            This action cannot be undone. Proceed with payment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelPayment} disabled={isProcessing}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmPayment} 
            color="primary"
            variant="contained"
            disabled={isProcessing}
            startIcon={isProcessing ? <CircularProgress size={20} /> : null}
          >
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeePayment;