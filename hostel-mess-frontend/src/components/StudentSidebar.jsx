// src/components/StudentSidebar.jsx
import { 
    Drawer, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    Divider
  } from '@mui/material';
  import {
    Dashboard as DashboardIcon,
    Paid as FeesIcon,
    EventAvailable as AttendanceIcon,
    Restaurant as MessIcon
  } from '@mui/icons-material';
  
  const drawerWidth = 240;
  
  const StudentSidebar = () => {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Student Portal</Typography>
        </Box>
        <Divider />
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
            { text: 'Fee Payment', icon: <FeesIcon />, path: '/fee-payment' },
            { text: 'Attendance', icon: <AttendanceIcon />, path: '/attendance' },
            { text: 'Mess Menu', icon: <MessIcon />, path: '/mess-menu' },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component="a" href={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  };
  
  export default StudentSidebar;