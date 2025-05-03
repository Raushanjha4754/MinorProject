import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import StatsCard from './components/StatsCard';
import { useAuth } from '../context/AuthContext';
import dashboardApi from './api/dashboardApi';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await dashboardApi.getAdminStats(token);
        setStats(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <StatsCard 
          title="Total Students" 
          value={stats?.totalStudents || 0} 
          icon="people" 
          color="primary" 
        />
        <StatsCard 
          title="Pending Fees" 
          value={`₹${stats?.pendingFees || 0}`} 
          icon="payment" 
          color="error" 
        />
        <StatsCard 
          title="Today's Attendance" 
          value={`${stats?.todayAttendance || 0}%`} 
          icon="event" 
          color="success" 
        />
        <StatsCard 
          title="Active Complaints" 
          value={stats?.activeComplaints || 0} 
          icon="report" 
          color="warning" 
        />
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
