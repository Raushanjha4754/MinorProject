// src/features/dashboard/StudentDashboard.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Divider,
  Avatar,
  Chip,
  useTheme,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Skeleton
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
  Refresh as RefreshIcon
} from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getStudentProfile } from '../../api/student';
import { getAttendanceSummary } from '../../api/attendance';
import { getFeeSummary } from '../../api/fees';
import { getMessBalance } from '../../api/mess';

const DetailField = ({ label, value, icon, theme }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center',
    mb: 2,
    gap: 1
  }}>
    {icon && React.cloneElement(icon, { 
      fontSize: 'small', 
      color: 'action.active' 
    })}
    <Box>
      <Typography variant="subtitle2" sx={{ 
        fontWeight: 'bold', 
        color: theme.palette.text.secondary,
        lineHeight: 1.2
      }}>
        {label}:
      </Typography>
      <Typography variant="body1" sx={{ pl: 0.5 }}>
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
          color: "error.main",
          action: () => navigate('/fee-payment')
        },
        { 
          title: "Attendance", 
          value: `${(attendance.data?.percentage || attendance.overallPercentage)}%`, 
          icon: <AttendanceIcon />, 
          color: (attendance.data?.percentage || attendance.overallPercentage) > 75 ? "success.main" : "warning.main",
          action: () => navigate('/attendance')
        },
        { 
          title: "Mess Balance", 
          value: `₹${(mess.data?.totalDue || mess.balance).toLocaleString()}`, 
          icon: <MessIcon />, 
          color: (mess.data?.totalDue || mess.balance) > 0 ? "success.main" : "error.main",
          action: () => navigate('/mess-billing')
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
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={4} key={item}>
              <Skeleton variant="rectangular" height={100} />
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
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Welcome, {student?.name || 'Student'}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>

      {/* Student Profile Card */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ 
            fontWeight: 'bold', 
            color: theme.palette.primary.dark,
            mb: 3
          }}>
            Student Information
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center'
            }}>
              <Avatar 
                src={student?.profileImage || '/default-avatar.jpg'}
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mb: 2,
                  border: `3px solid ${theme.palette.primary.main}`,
                  boxShadow: 3
                }} 
              />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {student?.name}
              </Typography>
              <Chip 
                label={`Roll No: ${student?.rollNumber || student?.rollNo || 'N/A'}`} 
                color="primary" 
                size="small" 
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DetailField label="Branch" value={student?.branch} icon={<BranchIcon />} theme={theme} />
                  <DetailField label="Course" value={student?.course} theme={theme} />
                  <DetailField label="Year" value={student?.year} theme={theme} />
                  <DetailField label="Hostel" value={student?.hostel?.name} icon={<HostelIcon />} theme={theme} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DetailField label="Email" value={student?.email} icon={<EmailIcon />} theme={theme} />
                  <DetailField label="Phone" value={student?.contactNumber || student?.mobile} icon={<PhoneIcon />} theme={theme} />
                  <DetailField label="Date of Birth" value={student?.dob} icon={<DobIcon />} theme={theme} />
                  <DetailField label="Blood Group" value={student?.bloodGroup} icon={<BloodIcon />} theme={theme} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card 
              sx={{ 
                borderRadius: 3, 
                boxShadow: 3,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
              onClick={stat.action}
            >
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" alignItems="center">
                  <Box sx={{ 
                    backgroundColor: stat.color, 
                    color: "white", 
                    p: 1.5, 
                    borderRadius: 1.5, 
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Attendance Chart */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Monthly Attendance
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  axisLine={false} 
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Attendance']}
                  labelFormatter={(label) => `Month: ${label}`}
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
    </Box>
  );
};

export default StudentDashboard;