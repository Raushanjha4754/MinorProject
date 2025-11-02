/**
 * ============================================================================
 * Admin Layout Component
 * Hostel Mess Management System - NIT Jalandhar
 * ============================================================================
 * 
 * This component provides the main layout structure for authenticated admins.
 * It includes:
 * - Sidebar navigation with admin menu items
 * - Top app bar for mobile devices
 * - Main content area where child routes render
 * 
 * Features:
 * - Responsive design (mobile/tablet/desktop)
 * - Role-based access (admin only)
 * - Navigation state management
 */

import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  CssBaseline, 
  Divider, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography,
  useTheme,
  AppBar,
  Avatar,
  IconButton,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as AttendanceIcon,
  Receipt as FeesIcon,
  Restaurant as MessIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

// ============================================================================
// Constants
// ============================================================================
const DRAWER_WIDTH = 240;

/**
 * AdminLayout Component
 * 
 * Main layout wrapper for admin pages with sidebar navigation
 * 
 * @returns {JSX.Element} Admin layout component
 */
const AdminLayout = () => {
  // ==========================================================================
  // Hooks and State
  // ==========================================================================
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  // ==========================================================================
  // Navigation Menu Items
  // ==========================================================================
  const adminMenuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/admin',
      description: 'Overview and analytics'
    },
    { 
      text: 'Manage Students', 
      icon: <PeopleIcon />, 
      path: '/admin/manage-students',
      description: 'Add, edit, and manage students'
    },
    { 
      text: 'Attendance', 
      icon: <AttendanceIcon />, 
      path: '/admin/manage-attendance',
      description: 'Track and manage attendance'
    },
    { 
      text: 'Fee Management', 
      icon: <FeesIcon />, 
      path: '/admin/manage-fees',
      description: 'Process fee payments'
    },
    { 
      text: 'Mess Management', 
      icon: <MessIcon />, 
      path: '/admin/mess-management',
      description: 'Menu and billing management'
    },
    { 
      text: 'Settings', 
      icon: <SettingsIcon />, 
      path: '/admin/settings',
      description: 'System configuration'
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
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // ==========================================================================
  // Sidebar Drawer Content
  // ==========================================================================
  const drawerContent = (
    <Box sx={{ 
      overflow: 'auto', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper
    }}>
      {/* Admin Profile Section - NITJ Blue Theme */}
      <Box sx={{ 
        p: 3, 
        textAlign: 'center',
        background: `linear-gradient(135deg, #003366 0%, #001f3f 100%)`, // NITJ Official Blue Gradient
        color: 'white'
      }}>
        <Avatar
          src={user?.profileImage || '/default-avatar.jpg'}
          sx={{ 
            width: 80, 
            height: 80, 
            mx: 'auto',
            mb: 2,
            border: `3px solid rgba(255, 255, 255, 0.3)`,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {user?.name || 'Admin'}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Admin Panel
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Menu Items */}
      <List sx={{ flexGrow: 1, p: 2 }}>
        {adminMenuItems.map((item) => {
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
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive 
                    ? theme.palette.primary.main 
                    : theme.palette.text.secondary,
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Logout Button */}
      <List sx={{ p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: `${theme.palette.error.main}15`,
              }
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.error.main }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // ==========================================================================
  // Access Control - Redirect if not admin
  // ==========================================================================
  if (user?.role !== 'admin') {
    return null; // ProtectedRoute should handle redirect
  }

  // ==========================================================================
  // Render Layout
  // ==========================================================================
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Top App Bar - Mobile Only */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.primary.main
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Hostel Mess Management System
          </Typography>
          <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user?.name || 'Admin'}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation Drawer */}
      <Box
        component="nav"
        sx={{ 
          width: { sm: DRAWER_WIDTH }, 
          flexShrink: { sm: 0 } 
        }}
        aria-label="admin navigation"
      >
        {/* Mobile Drawer - Temporary */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH 
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer - Permanent */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH 
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Outlet /> {/* Child routes render here */}
      </Box>
    </Box>
  );
};

export default AdminLayout;