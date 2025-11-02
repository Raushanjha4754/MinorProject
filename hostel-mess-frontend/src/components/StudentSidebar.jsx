/**
 * ============================================================================
 * Student Sidebar Component
 * Hostel Mess Management System - NIT Jalandhar
 * ============================================================================
 * 
 * This component provides the navigation sidebar for authenticated students.
 * Features:
 * - Responsive design (drawer on mobile, permanent on desktop)
 * - Navigation menu with icons and badges
 * - User profile section with avatar and status
 * - Quick access to settings and logout
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
  Badge
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Paid as FeesIcon,
  EventAvailable as AttendanceIcon,
  Restaurant as MessIcon,
  Report as ComplaintIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import Logo from '../assets/logo_nitj.png';

// ============================================================================
// Constants
// ============================================================================
const DRAWER_WIDTH = 280;

/**
 * StudentSidebar Component
 * 
 * Provides navigation sidebar for student portal with responsive design
 * 
 * @returns {JSX.Element} Student sidebar component
 */
const StudentSidebar = () => {
  // ==========================================================================
  // Hooks and State
  // ==========================================================================
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ==========================================================================
  // Navigation Menu Configuration
  // ==========================================================================
  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/student',
      badge: null
    },
    {
      text: 'Fee Payment',
      icon: <FeesIcon />,
      path: '/student/fee-payment',
      badge: '₹5,000' // TODO: Replace with actual pending fee amount
    },
    {
      text: 'Attendance',
      icon: <AttendanceIcon />,
      path: '/student/attendance',
      badge: '85%' // TODO: Replace with actual attendance percentage
    },
    {
      text: 'Mess Menu',
      icon: <MessIcon />,
      path: '/student/mess-menu',
      badge: null
    },
    {
      text: 'Mess Billing',
      icon: <MessIcon />,
      path: '/student/mess-billing',
      badge: '₹2,500' // TODO: Replace with actual mess balance
    },
    {
      text: 'Complaints',
      icon: <ComplaintIcon />,
      path: '/student/complaints',
      badge: '2' // TODO: Replace with actual pending complaints count
    },
  ];

  // ==========================================================================
  // Event Handlers
  // ==========================================================================

  /**
   * Toggle mobile drawer visibility
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * Handle navigation to a route
   * @param {string} path - Route path to navigate to
   */
  const handleNavigation = (path) => {
    navigate(path);
    // Close mobile drawer after navigation
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ==========================================================================
  // Drawer Content Component
  // ==========================================================================
  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper
    }}>
      {/* Header Section - Logo and Title */}
      <Box
        sx={{
          p: 3,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="NIT Jalandhar Logo"
          sx={{
            height: 60,
            width: 'auto',
            mb: 2,
            filter: 'brightness(0) invert(1)',
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          Student Portal
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Hostel Mess Management
        </Typography>
      </Box>

      {/* User Profile Section */}
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={user?.profileImage || '/default-avatar.jpg'}
            alt={user?.name || 'Student'}
            sx={{
              width: 56,
              height: 56,
              mr: 2,
              border: `3px solid ${theme.palette.primary.main}`,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {user?.name || 'Student Name'}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ lineHeight: 1.2 }}
            >
              {user?.rollNumber || 'Roll Number'}
            </Typography>
          </Box>
        </Box>
        {/* Status Chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label="Active"
            size="small"
            color="success"
            sx={{ fontSize: '0.75rem' }}
          />
          <Chip
            label={user?.hostel?.name || 'Hostel A'}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ p: 2 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={isActive}
                  sx={{
                    borderRadius: 2,
                    '&.Mui-selected': {
                      backgroundColor: `${theme.palette.primary.main}15`,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      '&:hover': {
                        backgroundColor: `${theme.palette.primary.main}25`,
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? theme.palette.primary.main : 'inherit',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? theme.palette.primary.main : 'inherit',
                      },
                    }}
                  />
                  {/* Badge for notifications/amounts */}
                  {item.badge && (
                    <Badge
                      badgeContent={item.badge}
                      color="primary"
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.75rem',
                          height: 20,
                          minWidth: 20,
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer Actions - Settings and Logout */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <List>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleNavigation('/student/settings')}
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                color: theme.palette.error.main,
                '&:hover': {
                  backgroundColor: `${theme.palette.error.main}15`,
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar Drawer Container */}
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer - Temporary (overlay) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer - Permanent (always visible) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default StudentSidebar;
