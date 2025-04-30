import { 
    Box, 
    Grid, 
    Paper, 
    Typography,
    Divider
  } from '@mui/material';
  import {
    People as PeopleIcon,
    Hotel as RoomIcon,
    AttachMoney as FeeIcon,
    Restaurant as MessIcon,
    EventAvailable as AttendanceIcon,
    Report as ReportIcon
  } from '@mui/icons-material';
//   import RecentActivities from '../../components/RecentActivities';
//   import StatsChart from '../../components/StatsChart';
  
  const StatCard = ({ icon, title, value, subtitle }) => {
    return (
      <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Box sx={{
            backgroundColor: 'primary.light',
            color: 'primary.main',
            p: 1,
            borderRadius: 1,
            mr: 2
          }}>
            {icon}
          </Box>
          <Box>
            <Typography variant="h6" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    );
  };
  
  const Dashboard = () => {
    const stats = [
      { 
        icon: <PeopleIcon fontSize="medium" />, 
        title: 'Total Students', 
        value: '245',
        subtitle: '+12 this month' 
      },
      { 
        icon: <RoomIcon fontSize="medium" />, 
        title: 'Occupied Rooms', 
        value: '120/150',
        subtitle: '80% occupancy' 
      },
      { 
        icon: <FeeIcon fontSize="medium" />, 
        title: 'Fee Collected', 
        value: '₹1,45,000',
        subtitle: '75% of target' 
      },
      { 
        icon: <MessIcon fontSize="medium" />, 
        title: 'Mess Members', 
        value: '210',
        subtitle: '86% participation' 
      },
    ];
  
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Dashboard Overview
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Monthly Statistics
              </Typography>
              <StatsChart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <RecentActivities />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default Dashboard;