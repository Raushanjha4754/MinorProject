/**
 * ============================================================================
 * Student Layout Component
 * Hostel Mess Management System - NIT Jalandhar
 * ============================================================================
 * 
 * This component provides the main layout structure for authenticated students.
 * It includes:
 * - Sidebar navigation (StudentSidebar)
 * - Top bar header (StudentTopbar)
 * - Main content area where child routes render (Outlet)
 * 
 * The layout is responsive and adapts to mobile/tablet/desktop screens.
 */

import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';

// Layout Components
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

/**
 * StudentLayout Component
 * 
 * @returns {JSX.Element} The student layout wrapper component
 */
const StudentLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Sidebar Navigation - Contains menu items and user profile */}
      <StudentSidebar />
      
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          width: { xs: '100%', md: `calc(100% - 280px)` }, // Account for sidebar width
        }}
      >
        {/* Top Bar - Header with notifications and user menu */}
        <StudentTopbar />
        
        {/* Page Content - Child routes render here */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3 },
            width: '100%',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentLayout;