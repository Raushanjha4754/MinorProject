// src/features/dashboard/StudentDashboard.jsx
import { 
    Box, 
    Grid, 
    Typography, 
    Card, 
    CardContent,
    Divider
  } from '@mui/material';
  import {
    Paid as FeesIcon,
    EventAvailable as AttendanceIcon,
    Restaurant as MessIcon
  } from '@mui/icons-material';
  
  const StudentDashboard = () => {
    const stats = [
      { title: 'Pending Fees', value: '₹5,000', icon: <FeesIcon /> },
      { title: 'Attendance (This Month)', value: '85%', icon: <AttendanceIcon /> },
      { title: 'Next Meal', value: 'Dinner - 8:00 PM', icon: <MessIcon /> },
    ];
  
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Student Dashboard
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ 
                      backgroundColor: 'primary.light', 
                      color: 'primary.main',
                      p: 2,
                      borderRadius: 1,
                      mr: 2
                    }}>
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6">{stat.title}</Typography>
                      <Typography variant="h4">{stat.value}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Notices
            </Typography>
            <Divider sx={{ mb: 2 }}/>
            {/* Notices list would go here */}
          </CardContent>
        </Card>
      </Box>
    );
  };
  
  export default StudentDashboard;