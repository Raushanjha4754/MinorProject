// src/features/complaints/ComplaintList.jsx
import { useState, useEffect } from 'react';
import { 
  Box, Typography, Chip, CircularProgress,
  Card, CardContent, Divider, Tabs, Tab,
  Stack, Button
} from '@mui/material';
import { 
  CheckCircle, Pending, Error, Add, 
  FilterList, Refresh 
} from '@mui/icons-material';
import complaintService from '../../services/complaintService';

const statusMap = {
  Pending: { color: 'warning', icon: <Pending /> },
  Resolved: { color: 'success', icon: <CheckCircle /> },
  Rejected: { color: 'error', icon: <Error /> }
};

const ComplaintCard = ({ complaint }) => (
  <Card sx={{ mb: 2, boxShadow: 3 }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          {complaint.title}
        </Typography>
        <Chip
          label={complaint.status}
          color={statusMap[complaint.status]?.color || 'default'}
          icon={statusMap[complaint.status]?.icon}
          sx={{ textTransform: 'capitalize' }}
        />
      </Box>
      <Chip 
        label={complaint.category} 
        size="small" 
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Typography paragraph>{complaint.description}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="caption" color="text.secondary">
        Submitted: {new Date(complaint.date).toLocaleString()}
      </Typography>
    </CardContent>
  </Card>
);

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  const loadComplaints = async () => {
    setLoading(true);
    try {
      const data = await complaintService.getStudentComplaints('stu123');
      setComplaints(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadComplaints(); }, []);

  const filteredComplaints = statusFilter === 'All' 
    ? complaints 
    : complaints.filter(c => c.status === statusFilter);

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">My Complaints</Typography>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            href="/submit-complaint"
          >
            New Complaint
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Refresh />}
            onClick={loadComplaints}
          >
            Refresh
          </Button>
        </Stack>
      </Box>

      <Tabs 
        value={statusFilter} 
        onChange={(e, newValue) => setStatusFilter(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="All" value="All" />
        <Tab label="Pending" value="Pending" icon={<Pending />} />
        <Tab label="Resolved" value="Resolved" icon={<CheckCircle />} />
      </Tabs>

      {loading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
      ) : filteredComplaints.length === 0 ? (
        <Typography variant="body1" textAlign="center" sx={{ p: 4 }}>
          {statusFilter === 'All' 
            ? "You haven't submitted any complaints yet"
            : `No ${statusFilter.toLowerCase()} complaints`}
        </Typography>
      ) : (
        filteredComplaints.map(complaint => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))
      )}
    </Box>
  );
};

export default ComplaintList;