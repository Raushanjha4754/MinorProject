// src/admin/components/AdminSidebar
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as StudentsIcon,
  Payment as FeesIcon,
  EventAvailable as AttendanceIcon,
  Restaurant as MessIcon,
  Report as ComplaintsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const drawerWidth = 240;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6">Hostel Admin</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin/students">
          <ListItemIcon><StudentsIcon /></ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem button component={Link} to="/admin/fees">
          <ListItemIcon><FeesIcon /></ListItemIcon>
          <ListItemText primary="Fee Management" />
        </ListItem>
        <ListItem button component={Link} to="/admin/attendance">
          <ListItemIcon><AttendanceIcon /></ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItem>
        <ListItem button component={Link} to="/admin/mess">
          <ListItemIcon><MessIcon /></ListItemIcon>
          <ListItemText primary="Mess Management" />
        </ListItem>
        <ListItem button component={Link} to="/admin/complaints">
          <ListItemIcon><ComplaintsIcon /></ListItemIcon>
          <ListItemText primary="Complaints" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/admin/settings">
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;