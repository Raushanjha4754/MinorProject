// src/components/StudentTopbar.jsx
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Avatar,
    Box
  } from '@mui/material';
  import { Notifications, Logout } from '@mui/icons-material';
  
  const StudentTopbar = () => {
    return (
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          backgroundColor: 'white',
          color: 'text.primary',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome, Raushan Kumar Jha
          </Typography>
          <Box>
            <IconButton sx={{ mr: 1 }}>
              <Notifications />
            </IconButton>
            <IconButton sx={{ mr: 1 }}>
              <Avatar sx={{ width: 32, height: 32 }}>R</Avatar>
            </IconButton>
            <IconButton>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default StudentTopbar;