// src/features/dashboard/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  useTheme,
  Button,
  CircularProgress,
  Alert,
  Skeleton,
  Paper,
  Divider,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  Paid as FeesIcon,
  EventAvailable as AttendanceIcon,
  Restaurant as MessIcon,
  Person as PersonIcon,
  School as BranchIcon,
  Home as HostelIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Cake as DobIcon,
  Favorite as BloodIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Notifications as NotificationsIcon
} from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { getStudentProfile } from '../../api/student';
import { getAttendanceSummary } from '../../api/attendance';
import { getFeeSummary } from '../../api/fees';
import { getMessBalance } from '../../api/mess';

const StatCard = ({ title, value, icon, color, trend, onClick, loading = false }) => {
  const theme = useTheme();
  
  if (loading) {
    return (
      <Card sx={{ height: '100%', borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              color: color,
              p: 1.5,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          {trend && (
            <Chip
              icon={trend > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
              label={`${Math.abs(trend)}%`}
              size="small"
              color={trend > 0 ? 'success' : 'error'}
              variant="outlined"
            />
          )}
        </Box>
        
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.primary }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const DetailField = ({ label, value, icon, theme }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
    {icon && React.cloneElement(icon, { 
      fontSize: 'small', 
      color: 'action.active',
      sx: { opacity: 0.7 }
    })}
    <Box sx={{ flex: 1 }}>
      <Typography variant="caption" sx={{ 
        fontWeight: 600, 
        color: theme.palette.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.5 }}>
        {value || 'N/A'}
      </Typography>
    </Box>
  </Box>
);

const StudentDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, token } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setError('');
      const [profile, attendance, fees, mess] = await Promise.all([
        getStudentProfile(token),
        getAttendanceSummary(token),
        getFeeSummary(token),
        getMessBalance(token)
      ]);
      
      setStudent(profile.data?.student || profile);
      setAttendanceData(attendance.data?.monthlyData || attendance.monthlyData);
      
      setStats([
        { 
          title: "Pending Fees", 
          value: `₹${(fees.data?.pending || fees.pending).toLocaleString()}`, 
          icon: <FeesIcon />, 
          color: theme.palette.error.main,
          trend: -5,
          action: () => navigate('/student/fee-payment')
        },
        { 
          title: "Attendance", 
          value: `${(attendance.data?.percentage || attendance.overallPercentage)}%`, 
          icon: <AttendanceIcon />, 
          color: (attendance.data?.percentage || attendance.overallPercentage) > 75 ? theme.palette.success.main : theme.palette.warning.main,
          trend: 2,
          action: () => navigate('/student/attendance')
        },
        { 
          title: "Mess Balance", 
          value: `₹${(mess.data?.totalDue || mess.balance).toLocaleString()}`, 
          icon: <MessIcon />, 
          color: (mess.data?.totalDue || mess.balance) > 0 ? theme.palette.info.main : theme.palette.success.main,
          trend: -3,
          action: () => navigate('/student/mess-billing')
        },
      ]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading && !refreshing) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 3, borderRadius: 3 }} />
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={4} key={item}>
              <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
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
            Welcome back, {student?.name?.split(' ')[0] || 'Student'}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your hostel and mess management
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={refreshing}
          sx={{ borderRadius: 2 }}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
              onClick={stat.action}
              loading={refreshing}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Student Profile Card */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  src={student?.profileImage || '/default-avatar.jpg'}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mr: 2,
                    border: `3px solid ${theme.palette.primary.main}`,
                  }} 
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {student?.name}
                  </Typography>
                  <Chip 
                    label={`Roll No: ${student?.rollNumber || student?.rollNo || 'N/A'}`} 
                    color="primary" 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DetailField label="Branch" value={student?.branch} icon={<BranchIcon />} theme={theme} />
                  <DetailField label="Course" value={student?.course} theme={theme} />
                  <DetailField label="Year" value={student?.year} theme={theme} />
                  <DetailField label="Hostel" value={student?.hostel?.name} icon={<HostelIcon />} theme={theme} />
                </Grid>
                <Grid item xs={12}>
                  <DetailField label="Email" value={student?.email} icon={<EmailIcon />} theme={theme} />
                  <DetailField label="Phone" value={student?.contactNumber || student?.mobile} icon={<PhoneIcon />} theme={theme} />
                  <DetailField label="Date of Birth" value={student?.dob} icon={<DobIcon />} theme={theme} />
                  <DetailField label="Blood Group" value={student?.bloodGroup} icon={<BloodIcon />} theme={theme} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Attendance Chart */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Monthly Attendance Overview
                    </Typography>
                    <Tooltip title="View detailed attendance">
                      <IconButton 
                        size="small" 
                        onClick={() => navigate('/student/attendance')}
                        sx={{ color: theme.palette.primary.main }}
                      >
                        <AttendanceIcon />
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
                          domain={[0, 100]} 
                          tick={{ fontSize: 12, fill: theme.palette.text.secondary }} 
                          tickFormatter={(value) => `${value}%`}
                          axisLine={false}
                        />
                        <RechartsTooltip 
                          formatter={(value) => [`${value}%`, 'Attendance']}
                          labelFormatter={(label) => `Month: ${label}`}
                          contentStyle={{
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 8,
                          }}
                        />
                        <Bar 
                          dataKey="present" 
                          fill={theme.palette.primary.main} 
                          radius={[4, 4, 0, 0]} 
                          name="Attendance"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<FeesIcon />}
                        onClick={() => navigate('/student/fee-payment')}
                        sx={{ py: 2, borderRadius: 2 }}
                      >
                        Pay Fees
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<MessIcon />}
                        onClick={() => navigate('/student/mess-menu')}
                        sx={{ py: 2, borderRadius: 2 }}
                      >
                        View Menu
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<NotificationsIcon />}
                        onClick={() => navigate('/student/submit-complaint')}
                        sx={{ py: 2, borderRadius: 2 }}
                      >
                        Submit Complaint
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<AttendanceIcon />}
                        onClick={() => navigate('/student/attendance')}
                        sx={{ py: 2, borderRadius: 2 }}
                      >
                        View Attendance
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;