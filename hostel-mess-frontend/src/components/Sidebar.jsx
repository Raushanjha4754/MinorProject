import { 
    Box, 
    Drawer, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    Typography  // Added this import
  } from '@mui/material';
  import {
    Dashboard as DashboardIcon,
    People as StudentsIcon,
    Hotel as RoomsIcon,
    AttachMoney as FeesIcon,
    Restaurant as MessIcon,
    EventAvailable as AttendanceIcon,
    Settings as SettingsIcon
  } from '@mui/icons-material';
  
  const drawerWidth = 240;
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Students', icon: <StudentsIcon /> },
    { text: 'Rooms', icon: <RoomsIcon /> },
    { text: 'Fees', icon: <FeesIcon /> },
    { text: 'Mess', icon: <MessIcon /> },
    { text: 'Attendance', icon: <AttendanceIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];
  
  export default function Sidebar() {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText'
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Hostel Management
          </Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton sx={{
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }