// src/features/fees/FeeReceipt.jsx
import { Box, Typography, Divider, Button } from '@mui/material';
import { Print, Download } from '@mui/icons-material';

const FeeReceipt = ({ receiptNo, studentName, feeName, amount, paidAmount, paymentDate, paymentMethod }) => {
  return (
    <Box sx={{ p: 3, border: '1px solid #ddd', maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Hostel Fee Receipt
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Receipt No: {receiptNo}</Typography>
        <Typography variant="body2">Date: {new Date(paymentDate).toLocaleDateString()}</Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Student Name: {studentName}</Typography>
        <Typography variant="body1">Fee Type: {feeName}</Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1">Amount: ₹{amount.toLocaleString()}</Typography>
        <Typography variant="body1">Paid Amount: ₹{paidAmount.toLocaleString()}</Typography>
        <Typography variant="body1">Payment Method: {paymentMethod}</Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" startIcon={<Download />}>
          Download
        </Button>
        <Button variant="contained" startIcon={<Print />} onClick={() => window.print()}>
          Print
        </Button>
      </Box>
    </Box>
  );
};

export default FeeReceipt;