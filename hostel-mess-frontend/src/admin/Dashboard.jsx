// src/admin/Dashboard
// src/admin/Dashboard
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import {
  People as PeopleIcon,
  Payment as PaymentIcon,
  Event as EventIcon,
  Report as ReportIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatsCard from './components/StatsCard';
import dashboardApi from './api/dashboardApi';

const AdminDashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for charts
  const attendanceData = [
    { name: 'Mon', present: 85, absent: 15 },
    { name: 'Tue', present: 90, absent: 10 },
    { name: 'Wed', present: 88, absent: 12 },
    { name: 'Thu', present: 92, absent: 8 },
    { name: 'Fri', present: 87, absent: 13 },
    { name: 'Sat', present: 80, absent: 20 },
    { name: 'Sun', present: 75, absent: 25 },
  ];

  const feeCollectionData = [
    { name: 'Jan', collected: 45000, pending: 15000 },
    { name: 'Feb', collected: 52000, pending: 8000 },
    { name: 'Mar', collected: 48000, pending: 12000 },
    { name: 'Apr', collected: 55000, pending: 5000 },
    { name: 'May', collected: 51000, pending: 9000 },
    { name: 'Jun', collected: 58000, pending: 2000 },
  ];

  const complaintData = [
    { name: 'Resolved', value: 65, color: theme.palette.success.main },
    { name: 'In Progress', value: 20, color: theme.palette.warning.main },
    { name: 'Pending', value: 15, color: theme.palette.error.main },
  ];

  const fetchDashboardData = async () => {
    try {
      setError('');
      const data = await dashboardApi.getAdminStats(token);
      setStats(data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch dashboard data. Please try again.');
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const quickActions = [
    {
      title: 'Add Student',
      icon: <AddIcon />,
      color: theme.palette.primary.main,
      action: () => navigate('/admin/manage-students'),
      description: 'Register new student'
    },
    {
      title: 'Mark Attendance',
      icon: <EventIcon />,
      color: theme.palette.success.main,
      action: () => navigate('/admin/manage-attendance'),
      description: 'Update attendance records'
    },
    {
      title: 'Fee Collection',
      icon: <PaymentIcon />,
      color: theme.palette.warning.main,
      action: () => navigate('/admin/manage-fees'),
      description: 'Process fee payments'
    },
    {
      title: 'Mess Management',
      icon: <SettingsIcon />,
      color: theme.palette.info.main,
      action: () => navigate('/admin/mess-management'),
      description: 'Update mess menu and billing'
    },
  ];

  if (loading && !refreshing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error && !refreshing) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
            >
              Retry
            </Button>
          }
          sx={{ borderRadius: 2 }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.primary }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Overview of hostel and mess management system
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={refreshing}
          sx={{ borderRadius: 2 }}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Total Students" 
            value={stats?.totalStudents || 0} 
            icon="people" 
            color="primary"
            trend={5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Pending Fees" 
            value={`₹${(stats?.pendingFees || 0).toLocaleString()}`} 
            icon="payment" 
            color="error"
            trend={-12}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Today's Attendance" 
            value={`${stats?.todayAttendance || 0}%`} 
            icon="event" 
            color="success"
            trend={3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Active Complaints" 
            value={stats?.activeComplaints || 0} 
            icon="report" 
            color="warning"
            trend={-8}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Charts Section */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Attendance Chart */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Weekly Attendance Overview
                    </Typography>
                    <Tooltip title="View detailed attendance">
                      <IconButton 
                        size="small" 
                        onClick={() => navigate('/admin/manage-attendance')}
                        sx={{ color: theme.palette.primary.main }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12, fill: theme.palette.text.secondary }} 
                          axisLine={false} 
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: theme.palette.text.secondary }} 
                          axisLine={false}
                        />
                        <RechartsTooltip 
                          contentStyle={{
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 8,
                          }}
                        />
                        <Bar dataKey="present" fill={theme.palette.success.main} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="absent" fill={theme.palette.error.main} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Fee Collection Chart */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Monthly Fee Collection
                    </Typography>
                    <Tooltip title="View fee management">
                      <IconButton 
                        size="small" 
                        onClick={() => navigate('/admin/manage-fees')}
                        sx={{ color: theme.palette.primary.main }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={feeCollectionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12, fill: theme.palette.text.secondary }} 
                          axisLine={false} 
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: theme.palette.text.secondary }} 
                          axisLine={false}
                        />
                        <RechartsTooltip 
                          contentStyle={{
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 8,
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="collected" 
                          stroke={theme.palette.success.main} 
                          strokeWidth={3}
                          dot={{ fill: theme.palette.success.main, strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="pending" 
                          stroke={theme.palette.warning.main} 
                          strokeWidth={3}
                          dot={{ fill: theme.palette.warning.main, strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Sidebar Section */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Quick Actions */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={2}>
                    {quickActions.map((action, index) => (
                      <Grid item xs={12} key={index}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={action.icon}
                          onClick={action.action}
                          sx={{ 
                            py: 2, 
                            borderRadius: 2,
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            borderColor: action.color,
                            color: action.color,
                            '&:hover': {
                              borderColor: action.color,
                              backgroundColor: `${action.color}10`,
                            }
                          }}
                        >
                          <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {action.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {action.description}
                            </Typography>
                          </Box>
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Complaints Overview */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Complaints Overview
                  </Typography>
                  <Box sx={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={complaintData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {complaintData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          contentStyle={{
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 8,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {complaintData.map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: item.color,
                            mr: 1,
                          }}
                        />
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.value}%
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
