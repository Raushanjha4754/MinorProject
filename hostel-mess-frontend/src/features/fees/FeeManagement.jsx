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
  Chip,
  Avatar,
  Tabs,
  Tab,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Card,
  CardContent,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  InputAdornment
} from '@mui/material';
import {
  Search,
  Person,
  FilterList,
  Add,
  Receipt,
  Paid,
  Pending,
  Download,
  Print,
  ArrowBack,
  ArrowForward,
  CheckCircle,
  AttachMoney
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import FeeReceipt from './FeeReceipt';

const FeeManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample data
  const [students, setStudents] = useState([
    { id: 1, name: 'Raushan Kumar Jha', avatar: '', room: 'A-101' },
    { id: 2, name: 'Bhashkar Kumar', avatar: '', room: 'A-102' },
    { id: 3, name: 'Monib Kumar Singha', avatar: '', room: 'B-201' },
    { id: 4, name: 'Akhilesh Chauhan', avatar: '', room: 'B-202' },
  ]);

  const [feeStructure, setFeeStructure] = useState([
    { id: 1, name: 'Hostel Fee', amount: 10000, frequency: 'Monthly' },
    { id: 2, name: 'Mess Fee', amount: 5000, frequency: 'Monthly' },
    { id: 3, name: 'Security Deposit', amount: 5000, frequency: 'One-time' },
  ]);

  const [feeRecords, setFeeRecords] = useState([
    {
      id: 1,
      studentId: 1,
      feeId: 1,
      amount: 10000,
      paidAmount: 10000,
      dueDate: '2023-06-10',
      paymentDate: '2023-06-05',
      status: 'Paid',
      receiptNo: 'RCPT-2023-001',
      paymentMethod: 'cash'
    },
    {
      id: 2,
      studentId: 1,
      feeId: 2,
      amount: 5000,
      paidAmount: 5000,
      dueDate: '2023-06-10',
      paymentDate: '2023-06-05',
      status: 'Paid',
      receiptNo: 'RCPT-2023-002',
      paymentMethod: 'cash'
    },
    {
      id: 3,
      studentId: 2,
      feeId: 1,
      amount: 10000,
      paidAmount: 5000,
      dueDate: '2023-06-10',
      paymentDate: '2023-06-08',
      status: 'Partial',
      receiptNo: 'RCPT-2023-003',
      paymentMethod: 'online'
    },
    {
      id: 4,
      studentId: 3,
      feeId: 1,
      amount: 10000,
      paidAmount: 0,
      dueDate: '2023-06-10',
      paymentDate: null,
      status: 'Pending',
      receiptNo: null,
      paymentMethod: null
    },
    {
      id: 5,
      studentId: 4,
      feeId: 3,
      amount: 5000,
      paidAmount: 5000,
      dueDate: '2023-05-01',
      paymentDate: '2023-04-25',
      status: 'Paid',
      receiptNo: 'RCPT-2023-004',
      paymentMethod: 'cheque'
    },
  ]);

  const [newPayment, setNewPayment] = useState({
    studentId: '',
    feeId: '',
    amount: 0,
    paidAmount: 0,
    dueDate: new Date().toISOString().split('T')[0],
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash',
    remarks: ''
  });

  // Calculate summary data
  const totalFees = feeRecords.reduce((sum, record) => sum + record.amount, 0);
  const totalPaid = feeRecords.reduce((sum, record) => sum + record.paidAmount, 0);
  const totalPending = totalFees - totalPaid;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenPaymentDialog = (record = null) => {
    if (record) {
      setCurrentPayment(record);
      setNewPayment({
        studentId: record.studentId,
        feeId: record.feeId,
        amount: record.amount,
        paidAmount: record.paidAmount,
        dueDate: record.dueDate,
        paymentDate: record.paymentDate || new Date().toISOString().split('T')[0],
        paymentMethod: record.paymentMethod || 'cash',
        remarks: ''
      });
    } else {
      setCurrentPayment(null);
      setNewPayment({
        studentId: '',
        feeId: '',
        amount: 0,
        paidAmount: 0,
        dueDate: new Date().toISOString().split('T')[0],
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'cash',
        remarks: ''
      });
    }
    setActiveStep(0);
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
    setCurrentPayment(null);
  };

  const handleOpenReceiptDialog = (record) => {
    setCurrentReceipt(record);
    setOpenReceiptDialog(true);
  };

  const handleCloseReceiptDialog = () => {
    setOpenReceiptDialog(false);
    setCurrentReceipt(null);
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setNewPayment(prev => ({
      ...prev,
      [field]: date.toISOString().split('T')[0]
    }));
  };

  const handleSavePayment = () => {
    if (currentPayment) {
      // Update existing payment
      const updatedRecords = feeRecords.map(record => 
        record.id === currentPayment.id ? { 
          ...record, 
          paidAmount: newPayment.paidAmount,
          paymentDate: newPayment.paymentDate,
          paymentMethod: newPayment.paymentMethod,
          status: newPayment.paidAmount >= record.amount ? 'Paid' : 
                 newPayment.paidAmount > 0 ? 'Partial' : 'Pending'
        } : record
      );
      setFeeRecords(updatedRecords);
    } else {
      // Add new payment
      const newId = Math.max(...feeRecords.map(r => r.id)) + 1;
      const feeItem = feeStructure.find(f => f.id === parseInt(newPayment.feeId));
      const newRecord = {
        id: newId,
        studentId: parseInt(newPayment.studentId),
        feeId: parseInt(newPayment.feeId),
        amount: feeItem.amount,
        paidAmount: parseFloat(newPayment.paidAmount),
        dueDate: newPayment.dueDate,
        paymentDate: newPayment.paymentDate,
        status: parseFloat(newPayment.paidAmount) >= feeItem.amount ? 'Paid' : 
               parseFloat(newPayment.paidAmount) > 0 ? 'Partial' : 'Pending',
               receiptNo: `RCPT-${new Date().getFullYear()}-${newId.toString().padStart(3, '0')}`,
        paymentMethod: newPayment.paymentMethod
      };
      setFeeRecords([...feeRecords, newRecord]);
    }
    handleClosePaymentDialog();
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  const getFeeName = (feeId) => {
    const fee = feeStructure.find(f => f.id === feeId);
    return fee ? fee.name : 'Unknown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Partial': return 'warning';
      case 'Pending': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <Paid />;
      case 'Partial': return <Pending />;
      case 'Pending': return <Pending />;
      default: return <Receipt />;
    }
  };

  const filteredRecords = feeRecords.filter(record => {
    const matchesSearch = getStudentName(record.studentId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.receiptNo?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (tabValue === 0) return matchesSearch; // All
    if (tabValue === 1) return matchesSearch && record.status === 'Paid';
    if (tabValue === 2) return matchesSearch && record.status === 'Partial';
    if (tabValue === 3) return matchesSearch && record.status === 'Pending';
    
    return matchesSearch;
  });

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Fee Management</Typography>
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
            onClick={() => handleOpenPaymentDialog()}
          >
            Record Payment
          </Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'success.light', mr: 2 }}>
                  <AttachMoney />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Fees
                  </Typography>
                  <Typography variant="h6">₹{totalFees.toLocaleString()}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                  <CheckCircle />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Paid Amount
                  </Typography>
                  <Typography variant="h6">₹{totalPaid.toLocaleString()}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'warning.light', mr: 2 }}>
                  <Pending />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Pending Amount
                  </Typography>
                  <Typography variant="h6">₹{totalPending.toLocaleString()}</Typography>
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
          placeholder="Search students or receipts..."
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
          <Button variant="outlined" startIcon={<FilterList />}>
            Filters
          </Button>
          <Button variant="outlined" startIcon={<Print />}>
            Print
          </Button>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All" />
          <Tab label={
            <Badge badgeContent={feeRecords.filter(r => r.status === 'Paid').length} color="success">
              <Box sx={{ px: 1 }}>Paid</Box>
            </Badge>
          } />
          <Tab label={
            <Badge badgeContent={feeRecords.filter(r => r.status === 'Partial').length} color="warning">
              <Box sx={{ px: 1 }}>Partial</Box>
            </Badge>
          } />
          <Tab label={
            <Badge badgeContent={feeRecords.filter(r => r.status === 'Pending').length} color="error">
              <Box sx={{ px: 1 }}>Pending</Box>
            </Badge>
          } />
        </Tabs>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Fee Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Paid</TableCell>
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">Payment Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Receipt No.</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                      <Person />
                    </Avatar>
                    {getStudentName(record.studentId)}
                  </Box>
                </TableCell>
                <TableCell>{getFeeName(record.feeId)}</TableCell>
                <TableCell align="right">₹{record.amount.toLocaleString()}</TableCell>
                <TableCell align="right">₹{record.paidAmount.toLocaleString()}</TableCell>
                <TableCell align="right">{record.dueDate}</TableCell>
                <TableCell align="right">{record.paymentDate || '-'}</TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(record.status)}
                    label={record.status}
                    color={getStatusColor(record.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{record.receiptNo || '-'}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpenPaymentDialog(record)}
                    >
                      Edit
                    </Button>
                    {record.receiptNo && (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleOpenReceiptDialog(record)}
                      >
                        Receipt
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment Dialog */}
      <Dialog open={openPaymentDialog} onClose={handleClosePaymentDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {currentPayment ? 'Update Payment Record' : 'Record New Payment'}
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Select Student and Fee</StepLabel>
              <StepContent>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Student</InputLabel>
                  <Select
                    label="Student"
                    name="studentId"
                    value={newPayment.studentId}
                    onChange={handlePaymentInputChange}
                    disabled={!!currentPayment}
                  >
                    {students.map((student) => (
                      <MenuItem key={student.id} value={student.id}>
                        {student.name} ({student.room})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Fee Type</InputLabel>
                  <Select
                    label="Fee Type"
                    name="feeId"
                    value={newPayment.feeId}
                    onChange={handlePaymentInputChange}
                    disabled={!!currentPayment}
                  >
                    {feeStructure.map((fee) => (
                      <MenuItem key={fee.id} value={fee.id}>
                        {fee.name} (₹{fee.amount}, {fee.frequency})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={handleNextStep}
                    disabled={!newPayment.studentId || !newPayment.feeId}
                  >
                    Next
                  </Button>
                </Box>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Payment Details</StepLabel>
              <StepContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Due Date"
                      value={new Date(newPayment.dueDate)}
                      onChange={(date) => handleDateChange(date, 'dueDate')}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Payment Date"
                      value={new Date(newPayment.paymentDate)}
                      onChange={(date) => handleDateChange(date, 'paymentDate')}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Amount"
                  name="amount"
                  value={newPayment.amount}
                  onChange={handlePaymentInputChange}
                  disabled={!!currentPayment}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Paid Amount"
                  name="paidAmount"
                  value={newPayment.paidAmount}
                  onChange={handlePaymentInputChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    label="Payment Method"
                    name="paymentMethod"
                    value={newPayment.paymentMethod}
                    onChange={handlePaymentInputChange}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="online">Online Transfer</MenuItem>
                    <MenuItem value="cheque">Cheque</MenuItem>
                    <MenuItem value="card">Credit/Debit Card</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Remarks"
                  name="remarks"
                  value={newPayment.remarks}
                  onChange={handlePaymentInputChange}
                  multiline
                  rows={2}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBackStep} startIcon={<ArrowBack />}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSavePayment}
                    endIcon={<ArrowForward />}
                  >
                    {currentPayment ? 'Update' : 'Save'}
                  </Button>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={openReceiptDialog} onClose={handleCloseReceiptDialog} maxWidth="md" fullWidth>
        <DialogTitle>Fee Receipt</DialogTitle>
        <DialogContent>
          {currentReceipt && (
            <FeeReceipt
              receiptNo={currentReceipt.receiptNo}
              studentName={getStudentName(currentReceipt.studentId)}
              feeName={getFeeName(currentReceipt.feeId)}
              amount={currentReceipt.amount}
              paidAmount={currentReceipt.paidAmount}
              paymentDate={currentReceipt.paymentDate}
              paymentMethod={currentReceipt.paymentMethod}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReceiptDialog}>Close</Button>
          <Button variant="contained" startIcon={<Print />} onClick={() => window.print()}>
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeeManagement;