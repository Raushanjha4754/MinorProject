// src/components/StudentTopbar

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

import Logo from '../assets/logo_nitj.png';
const StudentTopbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const notifications = [
    { id: 1, message: 'Fee payment due in 3 days', type: 'warning' },
    { id: 2, message: 'New mess menu updated', type: 'info' },
    { id: 3, message: 'Attendance marked for today', type: 'success' }
  ];

  const unreadCount = notifications.length;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 3 }, py: 1 }}>
        {/* Left side - Logo and Institute Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src={Logo}
            alt="NIT Jalandhar Logo"
            sx={{
              height: { xs: 50, md: 60 },
              width: 'auto'
            }}
          />
          {!isMobile && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: theme.palette.text.primary
                }}
              >
                DR B R AMBEDKAR NIT JALANDHAR
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.75rem'
                }}
              >
                Hostel Mess Management System
              </Typography>
            </Box>
          )}
        </Box>

        {/* Center - Page Title (for mobile) */}
        {isMobile && (
          <Typography
            variant="h6"
            sx={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 600,
              color: theme.palette.primary.main
            }}
          >
            Student Portal
          </Typography>
        )}

        {/* Right side - Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          {/* Notifications */}
          <IconButton
            color="inherit"
            onClick={handleNotificationMenuOpen}
            sx={{ position: 'relative' }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: theme.palette.text.primary
                }}
              >
                {user?.name || 'Student Name'}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.75rem',
                  color: theme.palette.text.secondary
                }}
              >
                {user?.rollNumber || 'Roll Number'}
              </Typography>
            </Box>

            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0.5 }}>
              <Avatar
                src={user?.profileImage || '/default-avatar.jpg'}
                sx={{
                  width: 40,
                  height: 40,
                  border: `2px solid ${theme.palette.primary.main}`
                }}
              >
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 300,
            maxHeight: 400,
            overflow: 'auto'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
        </Box>
        {notifications.map((notification) => (
          <MenuItem key={notification.id} sx={{ py: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    notification.type === 'warning'
                      ? theme.palette.warning.main
                      : notification.type === 'error'
                      ? theme.palette.error.main
                      : theme.palette.success.main
                }}
              />
              <Typography variant="body2">{notification.message}</Typography>
            </Box>
          </MenuItem>
        ))}
        {notifications.length === 0 && (
          <MenuItem>
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          </MenuItem>
        )}
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {user?.name || 'Student Name'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.rollNumber || 'Roll Number'}
          </Typography>
        </Box>

        <MenuItem onClick={() => { navigate('/student/profile'); handleMenuClose(); }}>
          <AccountCircleIcon sx={{ mr: 2 }} />
          Profile
        </MenuItem>

        <MenuItem onClick={() => { navigate('/student/settings'); handleMenuClose(); }}>
          <SettingsIcon sx={{ mr: 2 }} />
          Settings
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
          <LogoutIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default StudentTopbar;
