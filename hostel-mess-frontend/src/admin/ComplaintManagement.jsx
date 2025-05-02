// src/admin/ComplaintManagement
import { useState, useEffect } from 'react';
import { 
  Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, 
  Button, IconButton, Dialog, DialogTitle, 
  DialogContent, Chip, CircularProgress, Snackbar, Alert,
  Tabs, Tab, Grid, TextField, FormControl, InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { 
  Refresh as RefreshIcon,
  CheckCircle as ResolveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import ComplaintResolutionForm from './components/ComplaintResolutionForm';
import complaintApi from './api/complaintApi';
import { useAuth } from '../../context/AuthContext';
import { DatePicker } from '@mui/x-date-pickers';

const ComplaintManagement = () => {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openResolutionForm, setOpenResolutionForm] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState({
    category: '',
    status: '',
    date: null
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchComplaints();
  }, [token]);

  const fetchComplaints = async () => {
    try {
      const response = await complaintApi.getAllComplaints(token);
      setComplaints(response.data.complaints);
      setLoading(false);
    } catch (error) {
      showSnackbar('Failed to fetch complaints', 'error');
      setLoading(false);
    }
  };

  const handleOpenResolutionForm = (complaint) => {
    setCurrentComplaint(complaint);
    setOpenResolutionForm(true);
  };

  const handleCloseResolutionForm = () => {
    setOpenResolutionForm(false);
    setCurrentComplaint(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFilter(prev => ({ ...prev, date }));
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchComplaints();
  };

  const handleResolveComplaint = async (resolutionData) => {
    try {
      await complaintApi.resolveComplaint(currentComplaint._id, resolutionData, token);
      showSnackbar('Complaint resolved successfully', 'success');
      fetchComplaints();
      handleCloseResolutionForm();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesCategory = filter.category === '' || complaint.category === filter.category;
    const matchesStatus = filter.status === '' || complaint.status === filter.status;
    const matchesDate = !filter.date || 
      new Date(complaint.createdAt).toDateString() === new Date(filter.date).toDateString();
    
    return matchesCategory && matchesStatus && matchesDate;
  });

  const pendingComplaints = filteredComplaints.filter(c => c.status === 'pending');
  const resolvedComplaints = filteredComplaints.filter(c => c.status === 'resolved');
  const rejectedComplaints = filteredComplaints.filter(c => c.status === 'rejected');

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Complaint Management</Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
              label="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="hostel">Hostel</MenuItem>
              <MenuItem value="mess">Mess</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              label="Status"
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            label="Date"
            value={filter.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
      </Grid>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label={`Pending (${pendingComplaints.length})`} />
        <Tab label={`Resolved (${resolvedComplaints.length})`} />
        <Tab label={`Rejected (${rejectedComplaints.length})`} />
      </Tabs>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(activeTab === 0 ? pendingComplaints : 
                activeTab === 1 ? resolvedComplaints : rejectedComplaints).map((complaint) => (
                <TableRow key={complaint._id}>
                  <TableCell>
                    {complaint.student.name} ({complaint.student.rollNumber})
                  </TableCell>
                  <TableCell>
                    {complaint.title}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={complaint.category} 
                      color="primary"
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={complaint.status} 
                      color={
                        complaint.status === 'resolved' ? 'success' : 
                        complaint.status === 'rejected' ? 'error' : 'warning'
                      } 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    {complaint.status === 'pending' && (
                      <IconButton onClick={() => handleOpenResolutionForm(complaint)}>
                        <ResolveIcon color="primary" />
                      </IconButton>
                    )}
                    <IconButton onClick={() => setCurrentComplaint(complaint)}>
                      <ViewIcon color="info" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openResolutionForm} onClose={handleCloseResolutionForm} fullWidth maxWidth="md">
        <DialogTitle>
          Resolve Complaint: {currentComplaint?.title}
        </DialogTitle>
        <DialogContent>
          <ComplaintResolutionForm 
            complaint={currentComplaint} 
            onSubmit={handleResolveComplaint} 
            onCancel={handleCloseResolutionForm} 
          />
        </DialogContent>
      </Dialog>

      <Dialog 
        open={Boolean(currentComplaint && !openResolutionForm)} 
        onClose={() => setCurrentComplaint(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Complaint Details: {currentComplaint?.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Student:</Typography>
            <Typography>
              {currentComplaint?.student.name} ({currentComplaint?.student.rollNumber})
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Category:</Typography>
            <Typography>
              {currentComplaint?.category}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Submitted On:</Typography>
            <Typography>
              {currentComplaint && new Date(currentComplaint.createdAt).toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Description:</Typography>
            <Typography>
              {currentComplaint?.description}
            </Typography>
          </Box>
          {currentComplaint?.status !== 'pending' && (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Resolution:</Typography>
                <Typography>
                  {currentComplaint?.response}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Resolved By:</Typography>
                <Typography>
                  {currentComplaint?.resolvedBy?.name}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Resolved On:</Typography>
                <Typography>
                  {currentComplaint && new Date(currentComplaint.resolvedAt).toLocaleString()}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComplaintManagement;